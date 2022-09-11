const db = require('../models/');
const bcrypt = require('bcryptjs');
const { OrphanageManager, RegisteredUser } = require('../models/');
const regUser = db.RegisteredUser;


//case sensetive. This is  why we don't do camel case :)
// I
const registerUser = async (req,res) => {

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
        UserAddress: req.body.UserAddress
    })
  
        const savedUser = await regUser.create(newUser);
        res.send(savedUser);
  
       // res.status(400).send(err + "Didn't go through mainnnn");
   
}

const login = async (req,res )=>{





    try {
        
        const user = await regUser.findOne({where: {Email: req.body.Email}});


        if(!user) return res.status(400).send('user not found');
        
        const pValid = await bcrypt.compare(req.body.UserPassword,user.UserPassword)
        if(!pValid) return res.status(400).send('Incorrect password or email entered')
        
        if(user.UserRole == 'M') {
            console.log('hey look at me')
          let man =  await OrphanageManager.findOne({where : {registeredUserID : user.ID}})
          console.log(man)
         return res.status(200).json({FirstName: user.FirstName,UserRole: user.UserRole,orphanageID:man.orphanageID,ID : user.ID, managerID : man.ID})
        }
        
        res.status(200).json({ID: user.ID, FirstName: user.FirstName,UserRole: user.UserRole, isFlagged: user.isFlagged, 
            isVolunteer: user.isVolunteer, isSponsor: user.isSponsor, isDonor: user.isDonor});

    } catch (error) {
        console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
    }
}

const getPhonenumber  = async (req,res) => {

    try {
        const id = req.query.id 

    const user = await RegisteredUser.findOne({where : {ID : id}})

    res.status(200).json(user.Phonenumber)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })
    }
}

const getUsers = async (req,res) => {
    try {
        
        let users = await regUser.findAll({where : {isFlagged : false}})
        let arrUsers = [];
        for(let user of users){
            arrUsers.push(user)
        }
    
      /**   res.json({ID: user.ID, FirstName : user.FirstName, UserRole: user.UserRole, isFlagged: user.isFlagged, 
            isVolunteer: user.isVolunteer, isSponsor: user.isSponsor, isDonor: user.isDonor});
    */
        res.status(200).json(arrUsers)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })
    }

      
}

module.exports = {
registerUser,
login,
getUsers,
getPhonenumber
}