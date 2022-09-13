const db = require('../models/')
const { Op } = require("sequelize");
const Request = db.SponsorRequest

const acceptRequest = async (req,res) =>{
    try {
        
        const rid = req.query.rid
        const cid =  req.query.childID
        const seed = req.query.seed
        const id =  req.query.userID
    
        let request = await Request.findOne({where : {ID : rid}})
    
        request.isAccepted = true
        await request.save()

      
        console.log(id)
            let newSpons = {
                registeredUserID : id,
                Profession : "JOB" 
            }
        
            const created = await Sponsor.create(newSpons)
            const reg = await Reg.findOne({where : {ID : id}})
            reg.isSponsor = true
            await reg.save()
           const sid = await created.ID
       

            
           
            
        
            let sponsorship = {
                DateStarted : new Date(), // now ,
                MonthlySeed : seed,
                isActive : true,
                sponsorID : sid,
                childID : cid
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
            orphanageManagerID : req.body.orphanageManagerID
    
        }
    
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