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
   try {
    
    const id = req.query.OrphID
    let kids = []

    let children = await Child.findAll({
        where : {orphanageID : id}});

        for (const child of children) {
            kids.push(child)
        }


        
   res.status(200).send(kids)

   } catch (error) {
    
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })

   }
  
}


module.exports = {
    getAllChildren,
    getChildbyID,
    getChildbyOrphanage
}