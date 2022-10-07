// methods 
//checks for if accepted nd if fulfiled for proposal first

const db = require('../models/')
const bcrypt = require('bcryptjs');
const { Op, where } = require('sequelize')
const { OfferItem, Offer, RegisteredUser, Orphanage, Child } = require('../models/');
const { NUMERIC } = require('sequelize');


const OrphanageManager = db.OrphanageManager
const ItemProposal = db.ItemProposal //update 
const ItemNeed = db.ItemNeed
const ChildNeed = db.ChildNeed
const Sponsor = db.Sponsor
const Sponsorship = db.Sponsorship
const Notification = db.Notification
const Reg = db.RegisteredUser


const Sib = require('sib-api-v3-sdk')

require('dotenv').config()

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

/**
 1. Inventory (all the items they have donated items+offer items)
2. Get number of all Children in the orphanage, get all number of sponsored children, number of sponsors
3. I need exactly what you did for the admin on needs report per month.
   - but this time with orphanage needs.
4. . Orphanage Needs Report (For Pie Chart)
   return  {
            NeedsMet,
	    NeedsUnMet,
	    NeedsPending
           } but this will be for item proposals instead of needs
 */

     const getInventory = async (req, res) => {
      
        try {
            const id = req.query.id
            var items = [];
            var info = {ItemName : '', Quantity: ''}
            var my = await ItemNeed.findAll({
                where : {
                    orphanageID : id,
                isFulfilled : 1}}) // mine and are fulfilled
    
         for (const i of my) {
            var info = {ItemName : i.Title, Quantity: i.NumberReceived}
            items.push(info)
         }
    
            var offs = await OfferItem.findAll({
                where : {
                    receivingPartner : id,
                AmountTaken: {
                [Op.gte] : 1 }
            }
            }) // all of the offers that I accepted
    
            for (const o of offs) {
                var p = await Offer.findOne({where : {ID : o.offerID}})
                var info = {ItemName : p.Title, Quantity: o.AmountTaken}
                items.push(info)
            }

            res.status(200).json(items)
        } catch (error) {
            res.status(500).json({
                errorMessage: error.message
            })
        }
    }

    const getOrphanageProposalsReport = async (req, res) => {
        try {
            const id = req.query.id
            var items = await ItemNeed.findAll({where : {orphanageID : id}}) //get all of the ,
            //proposals fulfilled,  proposals  UnMet, proposals  Pending
            var propInfo = {fulfilled: 0, unmet: 0, pending: 0}
            for (const p of items) {
                var fulfilled = await ItemProposal.count({where : { isFulfilled:true, isAccepted:true , itemNeedID :p.ID, ProposalType : "ITEM"}}) //all fulfilled proposals 
                var pending = await ItemProposal.count({where :{ 
                     isFulfilled:false,
                    isAccepted: false, 
                    itemNeedID :p.ID,
                    ProposalType : "ITEM" }})
                    var unmet = await ItemProposal.count({where :{ 
                        isFulfilled:false,
                       isAccepted: true , 
                       itemNeedID :p.ID, 
                       ProposalType : "ITEM"}})
    
                       propInfo.fulfilled+= Number(fulfilled)
                       propInfo.unmet += Number(unmet)
                       propInfo.pending += Number(pending)
            }
            res.status(200).json(propInfo)
        } catch (error) {
            res.status(500).json({
                errorMessage: error.message
            })
        }

    }

    const getDemographics = async (req, res) => {
try {
    const id = req.query.id // orphanage ID 
    var props = []
    var needs = await ItemNeed.findAll({where : {orphanageID : id}}) // get all items for orphanage 
    var stats = {female: 0, male:0,  }
    for (const n of needs) {
        var prop = await ItemProposal.findAll({
            where : {
                itemNeedID : n.ID,
                isAccepted: true,
                isFulfilled : true 
                }})

                props.push(...prop)
    }   


    for (const p of props) {
        var F = await RegisteredUser.count({
            where : { 
                ID : p.registeredUserID,
                Gender :'F'
            }})

        var M = await RegisteredUser.count({
            where : { 
                ID : p.registeredUserID,
                Gender :'M'
            }})

            stats.female += Number(F)
            stats.male += Number(M)
            }

            res.status(200).json(stats)
} catch (error) {
    res.status(500).json({
        errorMessage: error.message
    })

}
    }

    //flag user
    const AllNotifications = async (req,res) =>{
        //sort by date
        try {
            const id = req.query.id //orphanage ID 
        var unread = await Notification.findAll({where : {
            orphanageID : id,
            Read : false
        }}) 
//objects.sort((a, b) => a.createdAt - b.createdAt);
        var allRead = await Notification.findAll({where : {orphanageID : id,
        Read: true}})

        for (const n of unread) {
            n.Read = true
           await n.save()
        }

        var obj = {new: '',old: ''}
        obj.new = unread.sort((a,b)=> b.NotificationTime - a.NotificationTime)
        obj.old =allRead.sort((a,b)=> b.NotificationTime - a.NotificationTime)
       
        res.status(200).json(obj)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorMessage: error.message
            })
        }
    }

const getNumNotifications = async (req,res) =>{
    const id = req.query.id //orphanage ID 
 
    try {
        var num = await Notification.count({where : {
            orphanageID : id,
            Read : false
        }}) 

       
        res.status(200).json(num)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })
    }
}
 const getMyItemsMonths = async (req, res) => {

    try {
        var id = req.query.id
        var rate = req.query.rating
        let priority1 = [
            {key : 'Jan',needs: '',metNeeds: '',},
            {key : 'Feb',needs: '',metNeeds: '',   },
            {key : 'March',needs: '',metNeeds: '',   },
            {key : 'April',needs: '',metNeeds: '',   },
            {key : 'May',needs: '',metNeeds: '',   },
            {key : 'Jun',needs: '',metNeeds: '',   },
            {key : 'Jul',needs: '',metNeeds: '',   },
            {key : 'Aug',needs: '',metNeeds: '',   },
            {key : 'Sept',needs: '',metNeeds: '',   },
            {key : 'Oct',needs: '',metNeeds: '',   },
            {key : 'Nov',needs: '',metNeeds: '',   },
            {key : 'Dec',needs: '',metNeeds: '',   },
         ]
         var count = 0;
        var date = new Date('2022-01-01') //first date 
        date.setDate(1)
        while (count <= 11) {
           
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
           firstDay.setHours(0, 0, 0, 0);
           lastDay.setHours(23, 59, 59, 999);
        
            var met = await ItemNeed.count({
                where :{
                    orphanageID: id,
                    isFulfilled : 1, // is  fulfilled 
                    DateEstablished : {
                        [Op.between]: [firstDay, lastDay],
                       },
                       PriorityRating: rate
                }
            })

            var total = await ItemNeed.count({
                where :{
                    orphanageID: id,
                    DateEstablished : {
                        [Op.between]: [firstDay, lastDay],
                       },
                       PriorityRating: rate
                }
            })

            priority1[count].metNeeds = Number(met)
            priority1[count].needs = Number(total)
            date.setMonth(firstDay.getMonth() + 1)
          
            //console.log(lastDay.getUTCDate())
            console.log( priority1[count].metNeeds)
            console.log( priority1[count].needs)
            count++

        }

     

  
     res.status(200).json(priority1)
    } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
     console.log(error)
     res.status(500).json({
         errorMessage: error.message
     })
 
 
    }
 }


 /*const createSponsorship  = async(req,res) =>{ 
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
 }**/

 //accepts a certain sponsor and sets them as a sponsor
 /*const acceptSponsor  = async(req,res) =>{ 
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
 }*/

 const calcPetrol = async(req,res) =>{ 
// count between today and the next seven days 
//find all proposalsfor this orphanage that are between today and the next seven days 
const today = new Date()
const nextWeek = new Date()
nextWeek.setDate(new Date().getDate() + 7)
var prop = await ItemProposal.findAll({where : {
    PickUpTime:{
        [Op.between]: [today, nextWeek]
    }
}})

var dist =0
for (const p of props) {
    dist+= Number(p.Distance)
}
// 0.12 per km (km*0.12*)
var ans = (( 0.12*dist )* 23.055)* 2

res.status(200).json(ans)
 }

const acceptProposal = async(req,res) =>{ //update to is accepted

    try {
        const itempPropID = req.query.proposalID

const proposal = await ItemProposal.findOne({where : {ID : itempPropID}})
const user = await RegisteredUser.findOne({where : {ID : proposal.registeredUserID}})
const itemID = proposal.itemNeedID
const itemNeed = await ItemNeed.findOne({where : { ID : itemID}})
const orph = await Orphanage.findOne({where:{ID : itemNeed.orphanageID}})

const sender = {
    email: 'ndumonnn@gmail.com',
    name: 'Simamisa',
}

const recivers = [
    {
        email: user.Email,
    },
]

const transactionalEmailApi = new Sib.TransactionalEmailsApi()

transactionalEmailApi
    .sendTransacEmail({
        subject: 'Donation at {{params.orphName}}',
        sender,
        to: recivers,
     textContent: `Dear {{params.username}}, we thank you so much for your support. {{params.orphName}} has accepted your donation proposal and are looking forward to seeing you soon! You can view and edit the details of your proposal on our mobile app`,
     params: {
        orphName: orph.OrphanageName,
        username: user.FirstName
    },
})
.then(console.log)
.catch(console.log)

console.log(itempPropID)
console.log(proposal)
proposal.isAccepted = true
await proposal.save()
res.status(200).json(proposal)
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })
    

    }
}

const confirmFulfill = async(req,res) =>{ //update to is accepted


try {
    const itempPropID = req.query.proposalID
var tempnumItem = 0

console.log(itempPropID)
const proposal = await ItemProposal.findOne({where : {ID : itempPropID}})


const itemID = proposal.itemNeedID
const itemNeed = await ItemNeed.findOne({where : { ID : itemID}})
const orph = await Orphanage.findOne({where:{ID : itemNeed.orphanageID}})
if(proposal.isAccepted){
    proposal.isFulfilled = true
} else {
   return res.status(400).send("proposal is not yet accepted, therefore it cannot be fulfilled")
}

 if (proposal.ProposalType == "ITEM") {

    tempnumItem = Number(itemNeed.NumberReceived) +Number(proposal.NumberToGive)
    const itemValue = Number(itemNeed.UnitCost * proposal.NumberToGive)
    itemNeed.AmountReceived += Number(itemValue)

 

itemNeed.NumberReceived = 0
await itemNeed.save()
itemNeed.NumberReceived += tempnumItem

await itemNeed.save()
console.log(proposal)

} 
//change to needed after test 
if (itemNeed.NumberReceived >= itemNeed.NumberNeeded || itemNeed.AmountReceived >= itemNeed.AmountNeeded)  {
    itemNeed.isFulfilled = true
    
    }


await itemNeed.save()
await proposal.save()

//email 
// I need orph and user 

res.status(200).json(itemNeed)
} catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
}
}

const fulfillChildNeed = async(req,res) =>{ //update to is accepted
    const itemNeedID = req.query.proposalID
    
    console.log(itemNeedID)
    const need = await ChildNeed.findOne({where : {ID : itemNeedID}})
    need.isFulfilled = true
    await need.save()
    res.status(200).json(need)
}

const accountability = async(req,res) =>{ 
try {
    
    const id = req.query.id //orphanage id
    var kids = []
    var children = await Child.findAll({where : {orphanageID : id }})
    for (const c of children) {
       if(c.isSponsored == true){
        var obj = {Childname : "", Number : ""}
        var spons = await Sponsorship.findOne({where : {childID: c.ID}})
        var needs = await ChildNeed.count({where : {sponsorshipID : spons.ID , isFulfilled: false , DueDate :{[Op.lt]: new Date() }}})
    obj.Childname = c.Nickname
    obj.Number = needs
    kids.push(obj)
       }
    }

    res.status(200).json(kids)
} catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
}

}
const unreliableUsers = async (req,res) => {
try {
    
    const id = req.query.id //for this orphanage
    const day = new Date()
    var items = await ItemNeed.findAll({where : {orphanageID : id}})

console.log(items)
    var ans = []
    var prop = []
    for (const i of items) {
        var p = await ItemProposal.findAll({where : {itemNeedID : i.ID}})
        prop.push(...p)
    }
    console.log(prop)
    var users = await RegisteredUser.findAll({})
console.log(users)
    for (const u of users) {
        var counter = 0
        var propC = await ItemProposal.count({where : {registeredUserID : u.ID, isFulfilled : false}})
        for (const p of prop) {
            
            if(p.registeredUserID == u.ID && p.isAccepted == true && p.isFulfilled == false && (p.DropOffTime < day || p.PickUpTime < day) ){
                counter++
            }
        }
        var obj = {
            Id:u.ID,
            isFlagged:u.isFlagged,
            Name: u.FirstName,
            Offences : counter,
            Total : propC
        }

        if (obj.Offences >= 5 && obj.Offences >= obj.Total){ //
            ans.push(obj)
        }


    }


   
    res.status(200).json(ans)
} catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
}

}



const flagUser = async (req,res) => {
   try {
    const id = req.body.id
    var user = await RegisteredUser.findOne({where : {ID : id}})

    user.isFlagged = true 
    await user.save() 
   } catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
   }
}

const updateChildNeed = async (req,res) => {

       
    try {
     
     let id = req.body.id; // needID
     const need = await ChildNeed.update(req.body, {where: {ID: id}})
     
       if(!need) return res.status(400).send('could not update this event')
   
     res.status(200).json(need);

    } catch (error) {
     
     console.log(error)
     res.status(500).json({
         errorMessage: error.message
     })
     
    }
   

}

/**
 * Posts with the most interaction (difficult to do with no category to control)
 * or see category of more interactive group, we need age and gender
 * items unmet
 * children sponsored vs unsponsored
 * most valuable user
 * all items (inventory) function?
 * sponsor, how many needs to fulfill, how many they have
 * Most unreliable users (have isAcccepted but is unfulfilled)
 * Children with the most needs
 */


module.exports = {
acceptProposal,
confirmFulfill,
fulfillChildNeed,
getNumNotifications,
AllNotifications,
//createSponsorship,
updateChildNeed,
getMyItemsMonths,
getInventory,
getOrphanageProposalsReport,
getDemographics,
unreliableUsers, //add
calcPetrol,
flagUser,
accountability
}