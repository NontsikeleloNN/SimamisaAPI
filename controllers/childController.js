const db = require('../models/'); // not having this in the events was causing an error

const Child = db.Child

const getAllChildren = async(req,res) =>{
  
    let orphs = await Child.findAll({})
   res.status(200).send(orphs)
   console.log(orphs)
  //res.json({orphs})
  
}

const getChildbyID = async(req,res) =>{
  
    const id = req.query.id
    let child = await Child.findOne({
        where : {ID : id}})
   res.status(200).send(child)
  
}

const getChildbyOrphanage = async(req,res) =>{
   const id = req.query.OrphID

    let children = await Child.findAll({
        where : {orphanageID : id}})


        
   res.status(200).send(children)
  
}


module.exports = {
    getAllChildren,
    getChildbyID,
    getChildbyOrphanage
}