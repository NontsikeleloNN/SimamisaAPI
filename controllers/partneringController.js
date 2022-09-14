/** jl
 *send a request. has date, active, recieving and sending. 1
*/
const db = require('../models/')
const Partnership = db.Partnership
const Offer = db.Offer
const OfferItem = db.OfferItem
const { Op } = require("sequelize");
const {doASideEffect, getSingleItem} = require('./utilities.js');
const { Orphanage } = require('../models/');

//sending a request 
const acceptOffer = async (req,res) => {

    try {
        const offerq = req.body.offerItemID
    const id = req.body.id // id of the orphanage accepting the offer
    const amount = req.body.amount
    //find the offer eq
    let offer = await OfferItem.findOne( {where: {
        [Op.and]: [
          {ReceivingPartner : id},
            {ID : offerq}]
    }
    })

 

   const tempOff = await Offer.findOne({where : {ID : offer.offerID}}) //fetching offer to check availability

   if(tempOff.isAvailable && amount <= tempOff.Quantity){
    offer.AmountTaken = Number(amount)
    tempOff.Quantity -= amount // decreasing quantity available
    await tempOff.save() //save changes 

    if(tempOff.Quantity <= 0){
        tempOff.isAvailable = false
        await tempOff.save() 
    }
    await offer.save()

    res.status(200).json('accepted')
   }
    } catch (error) {
        res.status(500).json({                                                                                                                                                  
            errorMessage : error.message
        })
    }
}

const sendReq = async (req, res) => {

    const sendor = req.query.from
    const rec = req.query.to
console.log(sendor+'jj')
console.log(rec+'jjmm') 
    try {
        

    let newRequest = {
        PartnershipDate: new Date(),
        isActive: false,
        SenderID: sendor,
        ReceiverID: rec
    }

  
   
    const created = await Partnership.create(newRequest)
    res.status(200).json(created)
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}
//how can I make this better?

const getPartners = async (req, res) => {
    try {
        const id = req.query.id

        let orphies = []
    let orphs = await Partnership.findAll({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [

                        { SenderID: id },
                        { ReceiverID: id }]
                },
                { isActive: true }
            ]
        }
    });


  for (const o of orphs) {
    
    if(o.ReceiverID == id){
      const p = await Orphanage.findOne({where : {ID : o.SenderID}})

      orphies.push(p)
    } else if (o.SenderID == id) {
        const p = await Orphanage.findOne({where : {ID : o.ReceiverID}})

        orphies.push(p)
    } else {
        
    }
  }

    res.status(200).json(orphies)



    } catch (error) {
        

        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })


    }
}
//get requests made to me 
const getRequests = async (req, res) => {
   try {
    
    const id = req.query.id
    let orphies = []

    let orphs = await Partnership.findAll({
        where: {
            [Op.and]: [
                { ReceiverID: id },
                { isActive: false }
            ]
        }
    });

    for (const o of orphs) {
        const p = await Orphanage.findOne({where : {ID : o.SenderID}})
       orphies.push(p)
        
    }
    console.log(orphs)

    if (orphs == []) return res.status(400).send('No requests')

    res.status(200).json(orphies)


   } catch (error) {
    
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })

   }
}

const acceptRequest = async (req, res) => {

   try {
    
    const to = req.query.to // the id of the person wanting to accept a request
    const from = req.query.from // the one i want to accept
    const request = await Partnership.findOne({
        where:
        {
            SenderID: from,
            ReceiverID: to
        }
    });

    request.isActive = true;
    await request.save()

    if (!request) return res.status(400).json(request)

    res.status(200).json('accepted')


   } catch (error) {
    
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })

   }

}

//sendinf offer one 
const sendOfferToOne = async (req, res) => {
    const from = req.body.from
    const to = req.body.to

   try {
    let newOffer = {
        Title: req.body.Title,
        Description: req.body.Description,
        DateMade: new Date(),
        isAvailable: true,
        Quantity: Number(req.body.Quantity),
        orphanageID: from
    }

    // will need to be accepted
    const offer = await Offer.create(newOffer)

    let newOitem = {
        ReceivingPartner: to,
        AmountTaken: 0,
        offerID: offer.ID
    }

     await OfferItem.create(newOitem)
   } catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
   }

   res.status(200).json('successfully sent offer ')
}

const sendOfferToAll = async (req, res) => {
    const from = req.body.from
    let val = from 
    let orphs;

try {
    let newOffer = {
        Title: req.body.Title,
        Description: req.body.Description,
        DateMade: new Date(),
        isAvailable: true,
        Quantity: Number(req.body.Quantity),
        orphanageID: from
    }

    let storeOffer = await Offer.create(newOffer)
    //all my partners
    orphs = await Partnership.findAll({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [

                        { SenderID: from },
                        { ReceiverID: from }]
                },
                { isActive: true }
            ]
        }
    })

    if (!orphs) return res.status(400).json('no partners')


    for(let element of orphs){
      
        if (val == element.ReceiverID) {
            val = element.SenderID
        }else {
            val = element.ReceiverID
        }

        let off = {
            ReceivingPartner: val,
            AmountTaken: Number(0),
            offerID: storeOffer.ID
        }
        OfferItem.create(off)

        val = from
    }

} catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
}

res.status(200).json(orphs)
}

const getMyOffers = async (req, res) => {
    let offerItemArray = [];
    let offer = [];
    const id = req.query.id
    var temp = {ID: '', ReceivingPartner: '', AmountTaken: '', Title: '', Description: '', Quantity: '' }
    try {
        // get all offerItems where I am the receiving partner and get the corresponding offers
        //find all where offeritem.rec = id
        //loop through all the offeritems, if the offerID is unique, add it to my offer array
        //return in json
        
        //these are all the items that were meant for you. 
        const offers = await Offer.findAll({
            where: {
                isAvailable: true
            }
        })


        // await doASideEffect(req.params.id, "NumberSomething", "ItemNeed", async (id) => {

        // for each element in the array, get all the related offer items where the id is that
        for(let element of offers){

            let temp =  await OfferItem.findAll({
                where: {
                    ReceivingPartner: id,
                    offerID: element.ID
                }
            })
            if(temp != null){
              // let temp2 = getSingleItem(Offer,temp.offerID)
               console.log(temp.offerID )
                offerItemArray.push(...temp)
            }
   
        }

      for (let a of offerItemArray ) {
            if(a != null ) {
             var temp = {ID: '', ReceivingPartner: '', AmountTaken: '', Title: '', Description: '', Quantity: '' }
            let temp2 = await Offer.findOne({where:{ID:a.offerID}})
            temp.ID = a.ID
            temp.ReceivingPartner = a.ReceivingPartner
            temp.AmountTaken = a.AmountTaken
            temp.Title = temp2.Title
            temp.Description = temp2.Description
            temp.Quantity = temp2.Quantity
            offer.push(temp)
            }
        }

     
    res.status(200).json(
        offer 
    )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })
    }


}

module.exports = {
    acceptRequest,
    sendReq,
    sendOfferToOne, //not tested 
    sendOfferToAll,
    getMyOffers, // working
    getPartners, 
    getRequests,
    acceptOffer
}