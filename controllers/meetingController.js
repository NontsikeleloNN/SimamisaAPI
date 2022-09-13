const db = require('../models/')
const { Op } = require("sequelize");
const { Child } = require('../models/');
const Request = db.SponsorRequest
const Sponsor = db.Sponsor
const RegisteredUser = db.RegisteredUser
const Sponsorship = db.Sponsorship

const acceptRequest = async (req,res) =>{
    try {
        
        const rid = req.query.rid
       
      
    
        let request = await Request.findOne({where : {ID : rid}})
    
        request.isAccepted = true
        await request.save()

      
        console.log(id)
            let newSpons = {
                registeredUserID : request.registeredUserID,
                Profession : "JOB" 
            }
        
            const created = await Sponsor.create(newSpons)
            const reg = await RegisteredUser.findOne({where : {ID : id}})
            reg.isSponsor = true
            await reg.save()
           const sid = await created.ID
       

            
           
            
        
            let sponsorship = {
                DateStarted : new Date(), // now ,
                MonthlySeed : 0,
                isActive : true,
                sponsorID : sid,
                childID : request.childID
            }
        
            const spons = Sponsorship.create(sponsorship)

        res.status(200).json(spons)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}

const createRequest = async (req,res) => {

    try {
        
        let request = {
            RequestDate : new Date(),
            isAccepted : false,
            registeredUserID: req.body.registeredUserID,
            orphanageManagerID : req.body.orphanageManagerID,
            childID : req.body.childID,
            childName : ''
        }
        
        var child = await Child.findOne({where : { ID : request.childID}})
        request.childName = child.Nickname
        const created = await Request.create(request)
        if(!request) return res.status(400).json('could not create meeting')
    
        res.status(200).json(created)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}



module.exports = {
    createRequest,
    acceptRequest
}