// methods 
//checks for if accepted nd if fulfiled for proposal first

const db = require('../models/')



const OrphanageManager = db.OrphanageManager
const ItemProposal = db.ItemProposal //update 
const ItemNeed = db.ItemNeed
const ChildNeed = db.ChildNeed
const Sponsor = db.Sponsor
const Sponsorship = db.Sponsorship
const Reg = db.RegisteredUser
/**
 * They should be able to create, update and delete stuff 
 * get manager for orphanage 
 * accept/forgo
 * isfulfilled`1
 * fulfill child need 
 * approve sponsor 
 * create sponsorship
 */

 const createSponsorship  = async(req,res) =>{ 
    //check if they are not already a sponsor 
    const cid =  req.query.childID
    const sid =  req.query.sponsorID
    const seed = req.query.seed

    let sponsorship = {
        DateStarted : new Date(), // now ,
        MonthlySeed : seed,
        isActive : true,
        sponsorID : sid,
        childID : cid
    }

    const created = Sponsorship.create(sponsorship)
    if(!created) return res.status(400).send('error creating sponsorship')

    res.status(200).json('created')
 }

 //accepts a certain sponsor and sets them as a sponsor
 const acceptSponsor  = async(req,res) =>{ 
    const id =  req.query.id //reg ID 
console.log(id)
    let newSpons = {
        registeredUserID : id,
        Profession : "JOB" 
    }

    const created = await Sponsor.create(newSpons)
    const reg = await Reg.findOne({where : {ID : id}})
    reg.isSponsor = true
    await reg.save()
    if(!created) return res.status(400).send('event could not be created')

  res.status(200).json(created)
 }

const acceptProposal = async(req,res) =>{ //update to is accepted
const itempPropID = req.query.proposalID

const proposal = await ItemProposal.findOne({where : {ID : itempPropID}})
console.log(itempPropID)
console.log(proposal)
proposal.isAccepted = true
await proposal.save()
res.status(200).json(proposal)
}

const confirmFulfill = async(req,res) =>{ //update to is accepted
const itempPropID = req.query.proposalID
var tempnumItem = 0

console.log(itempPropID)
const proposal = await ItemProposal.findOne({where : {ID : itempPropID}})
const itemID = proposal.itemNeedID
const itemNeed = await ItemNeed.findOne({where : { ID : itemID}})

if(proposal.isAccepted){
    proposal.isFulfilled = true
} else {
   return res.status(400).send("proposal is not yet accepted, therefore it cannot be fulfilled")
}


if(proposal.ProposalType === "DONATION"){
//change spelling
    itemNeed.AmountReceived += proposal.AmountGiven
    if (proposal.AmountGiven >= itemNeed.UnitCost){
        const itemNumber = Math.floor(proposal.AmountGiven/itemNeed.UnitCost)
        itemNeed.NumberReceived += itemNumber
    }

} else if (proposal.ProposalType === "ITEM") {

    tempnumItem = itemNeed.NumberReceived +proposal.NumberToGive
    const itemValue = itemNeed.UnitCost * proposal.NumberToGive
    itemNeed.AmountReceived += itemValue

itemNeed.NumberReceived = tempnumItem
console.log(proposal)

} 
//change to needed after test 
if (itemNeed.NumberReceived >= itemNeed.NumberNeeded || itemNeed.AmountReceived >= itemNeed.AmountNeed)  {
    itemNeed.isFulfilled = true
    
    }


await itemNeed.save()
await proposal.save()
res.status(200).json(itemNeed)
}

const fulfillChildNeed = async(req,res) =>{ //update to is accepted
    const itemNeedID = req.query.proposalID
    
    console.log(itemNeedID)
    const need = await ChildNeed.findOne({where : {ID : itemNeedID}})
    need.isFulfilled = true
    await need.save()
    res.status(200).json(need)
}

module.exports = {
acceptProposal,
confirmFulfill,
fulfillChildNeed,
acceptSponsor,
createSponsorship
}