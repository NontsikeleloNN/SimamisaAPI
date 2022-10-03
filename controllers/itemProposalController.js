const db = require('../models/')
const ItemProposal = db.ItemProposal
const ItemNeed = db.ItemNeed
const Notification = db.Notification
const User = db.RegisteredUser
const Donation = db.Donation
const {doASideEffect} = require('./utilities.js')
const { Op } = require("sequelize");
const { Orphanage } = require('../models/')
const { DATE } = require('sequelize')

async function wrapperCalc(itemList){
for (const item of itemList) {
    
}
}
//how do I use
async function calcItemsReceived(id){
    let numItems = await ItemProposal.count({where :{ [Op.and]: [
        { itemNeedID: id },
        { ProposalType: 'ITEM' },
        {isFulfilled : true}
      ] }});

      return numItems
}

async function calcAmountReceived(id){
    let props = await ItemProposal.findAll({where :{ [Op.and]: [
        { itemNeedID: id },
        { ProposalType: 'DONATION' },
        {isFulfilled : true}
      ] }});


     // for each loop to add 
      return props
}



const getAllProposals = async(req, res) =>{
    let proposals = await ItemProposal.findAll({});
    if(!proposals) {
        return res.status(404).json('there are no proposals')
    }
    res.status(200).json(proposals)
}

const getOrphanageProposals = async(req, res) =>{
    try {
    const id = req.query.id // orphID
    var props  = []
    var items = await ItemNeed.findAll({where : {orphanageID : id}})

    for (const i of items) {
        var temp = await ItemProposal.findAll({include: [
            {
                model: ItemNeed, 
                attributes: ['Title']
            }
        ],where: {itemNeedID : i.ID}})
        props.push(...temp)
    }

    res.status(200).json(props)
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
       })
    }
}

const getUnfulfilled = async(req,res) =>{
    let proposals = await ItemProposal.findAll({where:{isFulfilled : false}});
     if(!proposals) return res.status(404).send('there are no proposals')

     res.status(200).json(proposals)
}

const getItemProposals = async(req,res) =>{
    let id = req.params.id
    let proposals = await ItemProposal.findAll({where: {itemNeedID:id}})
    console.log(id)
        if(!proposals) return res.status(404).send('there are no proposals for this item')

    res.status(200).json(proposals)
}


const getUserProposals = async(req,res) =>{
    user = req.params.id
    let objArray = [];
  
    let proposals = await ItemProposal.findAll({where : {registeredUserID: user,
    ProposalType:'ITEM'}});

    for (const i of proposals) {
        var object = {ID: '', PickUpPlace: '', PickUpTime: '',DropOffTime: '',NumberToGive: '', ProposalComment: '',ProposalType: '',AmountGiven: '',isFulfilled: '',isAccepted: '', Title: '', OrphanageName: ''}
    
        var need = await ItemNeed.findOne({where : {ID: i.itemNeedID}})

        object.ID = i.ID
        object.PickUpPlace = i.PickUpPlace
        object.PickUpTime = i.PickUpTime
        object.DropOffTime = i.DropOffTime
        object.NumberToGive = i.NumberToGive
        object.ProposalComment = i.ProposalComment
        object.ProposalType = i.ProposalType
        object.AmountGiven = i.AmountGiven
        object.isFulfilled = i.isFulfilled
        object.isAccepted = i.isAccepted
        object.Title = need.Title
        object.OrphanageName = (await Orphanage.findOne({where :{ID : need.orphanageID}})).OrphanageName
    
        objArray.push(object)
    }
     if(!proposals) return res.status(404).send('there are no proposals')

     res.status(200).json(objArray)
}

const getProposal = async(req,res) =>{
   try {
    let id = req.query.id
    let proposals = await ItemProposal.findOne({where: {ID:id}})
    console.log(id)
        if(!proposals) return res.status(404).send('there are no proposals for this item')

    res.status(200).json(proposals)
   } catch (error) {
    res.status(500).json({
        errorMessage: error.message
   })
   }
}

const createProposal = async(req,res) =>{
try {
    let newProposal = {
        PickUpPlace : req.body.PickUpPlace,
        PickUpTime : req.body.PickUpTime,
        DropOffTime : req.body.DropOffTime,
        ProposalComment : req.body.ProposalComment,
        NumberToGive : req.body.NumberToGive,
        registeredUserID : req.body.registeredUserID,
        itemNeedID : req.body.itemNeedID,
        Distance : req.body.Distance,
        AmountGiven : req.body.AmountGiven,
        ProposalType: "ITEM"

    }

    const savedProposal = await ItemProposal.create(newProposal);
        if(!savedProposal) return res.status(400).json('could not create proposal')

        //need to find corresponding orphanaage ID
        var item = await ItemNeed.findOne({where : {ID : newProposal.itemNeedID}}) //find the itemNeed we're creating a proposal for, find it's orphanage
        
        var user = await User.findOne({where : {ID : newProposal.registeredUserID}}) //find maker of the proposal
        let notify = {
        orphanageID : item.orphanageID,
        Title : "Proposal made for the need " + item.Title,
        Body : user.FirstName + " made a proposal for the need " + item.Title + "and needs acceptance",
        NotificationTime : new Date()
    }

    var note = await Notification.create(notify)
       
        
    res.status(200).json(savedProposal)
} catch (error) {
    res.status(500).json({
        errorMessage: error.message
   })
}

}

const updateProposal = async(req,res) => {
   try {
    let id = req.body.id;
    // I think I should just receive the changes that I want to and update them accordingly

    const proposal = await ItemProposal.update(req.body,{where: {ID : id}})
        if(!proposal) return res.status(400).json('could not update item: '+ id);

        res.status(200).json(proposal)
   } catch (error) {
    res.status(500).json({
        errorMessage: error.message
   })
   }
}

const donate = async (req,res) => {
    const id = req.body.id // itemID
    const amount = req.body.amount 
    
    const userid = req.body.registeredUserID
    try {
            
        let item = await ItemNeed.findOne({where : {ID : id}})

        const money = Number(item.UnitCost)
        
        //most recent donation 
      
        item.AmountReceived += Number(amount) // add by the amount donated
      //  item.AmountNeeded -= Number(amount) // subtract amount donated

        //update changes first
        await item.save()


        let latestAmount = Number(item.AmountReceived)
        //calculated by the latest value
        console.log(latestAmount)
        const numitems = Math.floor( latestAmount/money) // need to round down

        //with the lastest amounts, update the costs and number received 
        item.NumberReceived = Number(numitems) 
      //  item.NumberNeeded -= Number(item.NumberReceived)
        await item.save()
        //amounts currently in the database 
       
        if (item.NumberReceived >= item.NumberNeeded || item.AmountReceived >= item.AmountNeeded){
            item.isFulfilled = true
        
            //pause this, need to create a proposal 
        }



        let newproposal = {
            ProposalComment: 'Donation fulfilled',
            isFulfilled: true,
            ProposalType: "DONATION",
            AmountGiven : amount,
            isAccepted : true,
            itemNeedID : id,
            registeredUserID: userid
        }

        await ItemProposal.create(newproposal);

        res.status(200).json('donation successful')
         // need to save modifications to the item
    

    } catch (error) {
        res.status(500).json({
            errorMessage : error.message
        })
    }
}

module.exports = {
    updateProposal,
    createProposal,
    getAllProposals,
    getItemProposals,
    getProposal,
    getUnfulfilled,
    getUserProposals,
    calcItemsReceived,
    donate, // add to router and test 
    getOrphanageProposals
}