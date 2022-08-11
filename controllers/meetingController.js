const db = require('../models/')
const { Op } = require("sequelize");
const Meeting = db.Meeting

const acceptMeeting = async (req,res) =>{
    try {
        
        const id = req.query.id
        let meeting = await Meeting.findOne({where : {ID : id}})
    
        meeting.MeetingAccepted = true
        await meeting.save()
    
        res.status(200).json(meeting)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}

const createMeeting = async (req,res) => {

    try {
        
        let newMeeting = {
            MeetingDate : req.body.MeetingDate,
            MeetingVenue : req.body.MeetingVenue,
            MeetingComments : 'for orphanage manager',
            MeetingAccepted : false,
            registeredUserID: req.body.registeredUserID,
            orphanageManagerID : req.body.orphanageManagerID
    
        }
    
        const created = await Meeting.create(newMeeting)
        if(!newMeeting) return res.status(400).json('could not create meeting')
    
        res.status(200).json(created)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}

const getAllActiveMeetings = async (req,res) => {
 
    const namuhla = new Date()
    const future = new Date(2050, 11, 24, 10, 33);
    const active = await Meeting.findAll({where:{
        MeetingDate: 
            {[Op.between]: [namuhla,future ]}
           }, 
           order : ['MeetingDate']
        })

        if(!active) return res.status(404).send('meetings not found')

        res.json(active)
}

const Test = async (req,res) => {
    res.json('nothing really matters')
}
module.exports = {
    createMeeting,
    getAllActiveMeetings,
    Test,
    acceptMeeting
}