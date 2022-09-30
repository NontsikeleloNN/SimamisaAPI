const db = require('../models/')
const { Op } = require("sequelize");
const { Child, SponsorRequest, Orphanage } = require('../models/');
const Request = db.SponsorRequest
const Sponsor = db.Sponsor
const Document = db.Document
const Notification = db.Notification
const RegisteredUser = db.RegisteredUser
const Sponsorship = db.Sponsorship

const Sib = require('sib-api-v3-sdk')

require('dotenv').config()

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY


const acceptRequest = async (req,res) =>{
    try {
        
        const rid = req.query.rid
       
        var request = await SponsorRequest.findOne({where : {ID : rid}})

        request.isAccepted = true  // accepted, now create sponsorship
        request.isRejected = false
        await request.save()
        var user = await RegisteredUser.findOne({where : {ID:request.registeredUserID}}) //get the applicant

        let sponsorship = ""

        if(user.isSponsor){
// if they already are a sponsor, create a sponsorship between them and the child 
            sponsorship = {
                DateStarted : new Date(), // now ,
                MonthlySeed : 0,
                isActive : true,
                sponsorID : sid,
                childID : request.childID
            }
        }else{
            //make them a sponsor 
            let newSpons = {
                registeredUserID : request.registeredUserID,
                Profession : "JOB" 
            }

            var sponsor = await Sponsor.create(newSpons) 
            
            user.isSponsor = true // turn them into a sponsor now 

          await  user.save()
            sponsorship = {
                DateStarted : new Date(), // now ,
                MonthlySeed : 0,
                isActive : true,
                sponsorID : sponsor.ID,
                childID : request.childID
            }
        
           
        }
            
        var spo = await Sponsorship.create(sponsorship)
        var child = await Child.findOne({where : { ID : sponsorship.childID}})
        var orph = await Orphanage.findOne({where : {ID : child.orphanageID}})
            
        child.isSponsored = true
        await child.save()
        //send notification to sponsor via email that their sponsorship has been accepted 
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
                subject: 'Sponsorship at {{params.orphName}}',
                sender,
                to: recivers,
             textContent: `Dear {{params.username}}, we are pleased to inform you that your request to sponsor {{params.childName}} has been approved. You will now see their updates to you and their needs on the mobile app`,
             params: {
                orphName: orph.OrphanageName,
                childName: child.Nickname,
                username: user.FirstName
            },
        })
        .then(console.log)
        .catch(console.log)
        res.status(200).json('success')

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}

const getAllRequests = async (req,res) => {

    try {
        const id = req.query.id //orphanage ids
   var orphs = await Orphanage.findOne({where : {ID : id}})
  var children = await Child.findAll({where : {orphanageID : orphs.ID}})
  var array = []
  for (const c of children) {
    
    var reqs = await Request.findAll({include: [
        {
            model: RegisteredUser, 
            attributes: ['FirstName','Email']
        },
        {
            model: Child, 
            attributes: ['Nickname']
        },
        {
            model:Document,
            attributes: ['DocUrl']
        }
    ]  ,where : {childID: c.ID}})
    for (const r of reqs) {
       
         array.push(r)
    }

  }
    
    res.status(200).json(array)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
    }

const rejectRequest = async (req,res) => {

    try {
        
        const id = req.query.id
        var request = await Request.findOne({where : {ID : id}})
        await Request.destroy({where : {ID : id}})
        res.status(200).json('deleted')

       
        const child = await Child.findOne({where : {ID : request.childID}})
        const user = await RegisteredUser.findOne({where : {ID : request.registeredUserID}})
        const orph = await Orphanage.findOne({where : { ID: child.orphanageID}})

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
                subject: 'Sponsorship at {{params.orphName}}',
                sender,
                to: recivers,
             textContent: `Dear {{params.username}}, we regret to inform you that your sponsorship for {{params.childName}} at {{params.orphName}} has been rejected. You may reapply if you are still interested or consider sponsoring a different child `,
             params: {
                orphName: orph.OrphanageName,
                childName: child.Nickname,
                username: user.FirstName
            },
        })
        .then(console.log)
        .catch(console.log)
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}

const setUpMeeting = async (req,res) => {
 try {
    const id = req.body.id
 const mlink = req.body.link
 var request = await Request.findOne({where : {ID : id}})


 const child = await Child.findOne({where : {ID : request.childID}})
 const user = await RegisteredUser.findOne({where : {ID : request.registeredUserID}})
 const orph = await Orphanage.findOne({where : { ID: child.orphanageID}})

 request.isAccepted = true
 request.isRejected = true

 await request.save()
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
         subject: 'Sponsorship at {{params.orphName}}',
         sender,
         to: recivers,
      textContent: `Dear {{params.username}}, we wish to inform you that your sponsorship for {{params.childName}} at {{params.orphName}} is being reviewed. The orphanage manager is interested in meeting with you, details in the following link {{params.link}}`,
      params: {
         orphName: orph.OrphanageName,
         childName: child.Nickname,
         username: user.FirstName,
         link: mlink
     },
 })
 .then(console.log)
 .catch(console.log)

 } catch (error) {
    
 
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })

 }
}

const createRequest = async (req,res) => {

    try {

        // create a false requests that will later be accepted
        let request = {
            RequestDate : new Date(),
            isAccepted : false,
            isRejected: false,
            registeredUserID: req.body.registeredUserID,
            childID : req.body.childID,
        }

        /**
         * create a document folder, that points to a request id
         * reqID, docUrl
         * that's it. 
         * Will probably need to make a get documents 
         * Make an automatic "set up meeting button for the orphanage manager "
         */

       
        const savedReq = await Request.create(request)
        const child = await Child.findOne({where : {ID : request.childID}})
        const user = await RegisteredUser.findOne({where : {ID : request.registeredUserID}})

        
        let docs = {
            DocUrl: req.body.url,
            sponsorRequestID: savedReq.ID
        }

        await Document.create(docs)

        let notify = {
            orphanageID : child.orphanageID,
            Title : "Sponsorship request for " + child.Username ,
            Body : user.FirstName + " made a sponsorship request for " + child.Username + ", and needs reviewing",
            NotificationTime : new Date()
        }
           
       
      await  Notification.create(notify)

       


   

        res.status(200).json(request)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}



module.exports = {
    createRequest,
    acceptRequest,
    rejectRequest,
    getAllRequests,
    setUpMeeting
}