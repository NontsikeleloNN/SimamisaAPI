const db = require('../models/')
const { Op } = require("sequelize");
const { Child } = require('../models/');
const e = require('express');
const Request = db.SponsorRequest
const Sponsor = db.Sponsor
const RegisteredUser = db.RegisteredUser
const Sponsorship = db.Sponsorship

const acceptRequest = async (req,res) =>{
    try {
        
        const rid = req.query.rid
       
      
    
        let request = await Request.findOne({where : {ID : rid}})
    
    

      
        console.log(id)
            
        
            const created = await Sponsor.create(newSpons)
           
       

            
           
            
        
           
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
            isAccepted : true,
            registeredUserID: req.body.registeredUserID,
            orphanageManagerID : 10,
            childID : req.body.childID,
        }
        
        const reg = await RegisteredUser.findOne({where : {ID : request.registeredUserID}})
        if (reg.isSponsor){
            var tem = await Sponsor.findOne({where: {registeredUserID : reg.ID}})
        }
        const created = await Request.create(request)
        if(!request) return res.status(400).json('could not create meeting')
    
        let newSpons = {
            registeredUserID : request.registeredUserID,
            Profession : "JOB" 
        }

        var  spons = null
        
       if (!reg.isSponsor){
        spons = await Sponsor.create(newSpons)
       }else {
        spons = await Sponsor.findOne({where : {registeredUserID: request.registeredUserID}})
       }

        
        reg.isSponsor = true
        await reg.save()
       const sid = await spons.ID


       let sponsorship = {
        DateStarted : new Date(), // now ,
        MonthlySeed : 0,
        isActive : true,
        sponsorID : sid,
        childID : request.childID
    }

    const sponsoring = await Sponsorship.create(sponsorship)

        res.status(200).json(sponsoring)

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