const { Sponsorship, Orphanage } = require('../models/');
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
    var op = {some: '', OrphanageName: ''}
    let child = await Child.findOne({include: [
        {
            model: Orphanage, 
            attributes: ['OrphanageName']
        }
    ],
        where : {ID : id}})

        
   res.status(200).json(child)
  
}
const getSponsorshipID = async(req,res) => {
    try {
        
        const id = req.query.childID

    const spons = await Sponsorship.findOne({where : {childID : id}})
    res.status(200).json(spons.ID)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
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
    getChildbyOrphanage,
    getSponsorshipID
}