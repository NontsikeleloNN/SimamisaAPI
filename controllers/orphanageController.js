const db = require('../models/')

const Orphanage = db.Orphanage



console.log("just before entering ")

//Orphanage.sync() //what does this do?

//search orphanage by name
const getAllOrphanages = async(req,res) =>{
    let orphs;
    try{
        orphs = await Orphanage.findAll({})
        
        console.log(orphs)
    } catch(error) {
    res.status(500).json({
        errorMessage: error.message
    })
  }

  res.status(200).send(orphs)

}


const getOrphanage = async (req,res) => {
    let id = req.params.id
    let orph = await Orphanage.findOne({where: {id: id}})
    res.status(200).send(orph)
}

module.exports = {
    getAllOrphanages,
    getOrphanage
}