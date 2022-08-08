const db = require('../models/')
const { Op } = require("sequelize");

const Event = db.Event
//would I be able to get the by the most recent to the oldest 
const getAllEvents = async(req,res) =>{
  
    let events = await Event.findAll({}) //array of objects?

    const sortedDesc = events.sort(
        (objA, objB) => Number(objB.EventDate) - Number(objA.EventDate),
      );
 
  res.status(200).json({sortedDesc})
  
}

const getEventbyOrphanage = async(req,res) =>{
    const orphID = req.params.id;
    let events = await Event.findAll({where: {orphanageID: orphID }})
    if(!events) res.status(404).send('No events for this orphanage');

    
    const sortedDesc = events.sort(
        (objA, objB) => Number(objB.EventDate) - Number(objA.EventDate),
      );
    res.json(sortedDesc);
}

const getEvent = async(req,res) => {
    const eventID = req.params.id;
    let event = await Event.findOne({where: {ID:eventID}})
    if(!event) res.status(404).send('No such event');
    res.json(event);
}

const updateEvent = async(req,res) => {
  let id = req.params.id;
  const event = await Event.update(req.body, {where: {ID: id}})
    if(!event) return res.status(400).send('could not update this event')

  res.status(200).send('event: ' + id + ' updated');

}

const deleteEvent = async (req,res) =>{
  let id = req.params.id;

  await Event.destroy({where : {ID : id}})

  res.status(200).send('event: '+ id+ ' deleted')
}

// finish this off
const getEventByName = async(req,res) => {
  const name = req.params.name;
  console.log('Name: '+name)
  let events = await Event.findAll({where : 
    {EventName :
     {[Op.like]: '%' +name+ '%'},

    }})
    if(!events) return res.status(400).send('no such event exists')

  res.json(events);
}

const createEvent = async(req,res) => {

  let newEvent = {
    EventName : req.body.EventName,
    EventDate : req.body.EventDate,
    EventPoster : req.body.EventPoster,
    EventDescription : req.body.EventDescription,
    orphanageID : req.body.orphanageID
  }
  console.log(req.body)
  const savedEvent = await Event.create(newEvent);
  if(!savedEvent) return res.status(400).send('event could not be created')

  res.status(200).json(savedEvent)
}


module.exports = {
getAllEvents,
getEventbyOrphanage,
getEvent,
createEvent,
updateEvent,
deleteEvent,
getEventByName
}