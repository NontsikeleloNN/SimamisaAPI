const db = require('../models/');
const bcrypt = require('bcryptjs')
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
const user = await regUser.findOne({where: {Email: req.body.Email}});


if(!user) return res.status(400).send('email not found');

const pValid = await bcrypt.compare(req.body.UserPassword,user.UserPassword)
if(!pValid) return res.status(400).send('Incorrect Password entered')

// function to define roles 
//return name
res.json({ID: user.ID, UserRole: user.UserRole, isFlagged: user.isFlagged, 
    isVolunteer: user.isVolunteer, isSponsor: user.isSponsor, isDonor: user.isDonor});
}

const getUsers = async (req,res) => {
    let user = regUser.findAll({})
    res.json({ID: user.ID, FirstName : user.FirstName, UserRole: user.UserRole, isFlagged: user.isFlagged, 
        isVolunteer: user.isVolunteer, isSponsor: user.isSponsor, isDonor: user.isDonor});
}

module.exports = {
registerUser,
login,
getUsers
}