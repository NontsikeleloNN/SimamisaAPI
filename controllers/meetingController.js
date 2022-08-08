const db = require('../models/')
const { Op } = require("sequelize");
const Meeting = db.Meeting

const createMeeting = async (req,res) => {

    let newMeeting = {
        MeetingDate : req.body.date,
        MeetingVenue : req.body.venue,
        MeetingComments : req.body.comments 
    }

    const created = await Meeting.create(newMeeting)
    if(!newMeeting) return res.status(400).json('could not create meeting')

    res.status(200).json(created)
}

const getAllActiveMeetings = async (req,res) => {
 
    const namuhla = new Date()
    const future = new Date(2050, 11, 24, 10, 33);
    const active = Meeting.findAll({where:{
        date: 
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
    Test
}