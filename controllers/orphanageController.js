const { OrphanageManager } = require('../models/');
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

const regOrphanage = async (req,res) => {
    let newOrphanage = {
       
        DateReg : req.body.Date,
        OrphanageName : req.body.OrphanageName,
        OrphanageDescription : req.body.OrphanageDescription,
        OrphanageImage : req.body.OrphanageImage,
        DefaultChildPassword: req.body.OrphanagePassword,
        Children : req.body.Children
    }
    
    const savedOrphanage = await Orphanage.create(newOrphanage)
        if(!savedOrphanage) return res.status(400).send('could not create orphanage')
        res.status(200).json(savedOrphanage)
    
}

const regManager = async (req,res) => {

   try {
    
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(req.body.UserPassword,salt)
    let newUser = ({
        FirstName: req.body.FirstName,
        Surname: req.body.Surname,
        Email: req.body.Email,
        Phonenumber: req.body.Phonenumber,
        Status: req.body.Status,
        UserRole : req.body.UserRole,
        isFlagged: req.body.isFlagged,
        UserPassword: hashed,
        UserAddress: req.body.UserAddress,
        orphanageID : req.body.orphanageID
    })
  
        const savedUser = await regUser.create(newUser);
        
        let newOrphanageManager = ({
            registeredUserID : savedUser.ID,
            orphanageID : savedUser.orphanageID
        })

        const savedMan = await OrphanageManager.create(newOrphanageManager)

        res.status(200).json(savedMan)  

   } catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
   }
}


module.exports = {
    getAllOrphanages,
    getOrphanage,
    regOrphanage,
    regManager
}