//  get all of the orphanages, get all their items, all their donations. THis is for sharing and distribution
// all the children who are sponsored
// all needs and donations not met
// childneeds that are not met 

const db = require('../models')
const Orphanage = db.Orphanage
const ItemNeed = db.ItemNeed
const ChildNeed = db.ChildNeed
const Children = db.Child
const Sponsor = db.Sponsor
const RegisterUser = db.RegisteredUser
const Distribution = db.Distribution
const gDon = db.generalDonation
const Notification = db.Notification
const { Op } = require("sequelize");
const { generalDonation } = require('../models')

//all the itemNeeds who are still needed and are highest priority 
//I can send this with the numbers for each orphanage and send as x and y values 

const getChildren  = async (req, res) => {

    var num = await Children.count({})

    res.status(200).json(Number(num))
}

const getAllUnmetOrphaganes  = async (req, res) => {

   try {
    
    let itemsArr = []
   
    let allOrph = await Orphanage.findAll({})

       for (const i of allOrph) {
        var total =  await ItemNeed.count({  where: 
            { orphanageID: i.ID}})
           var num = await ItemNeed.count({ 
            where: 
            { orphanageID: i.ID,
            isFulfilled: 0 }
          
        })  // get all for this current orph
           console.log(i.orphanageID)
           var obj = { ID : i.ID,Name: i.OrphanageName, Unmet: Number(num) , Total: Number(total)}
           itemsArr.push(obj)
       }
    
    

    res.status(200).json(itemsArr)
   } catch (error) {
    
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })


   }
}

const getNumberofOrphanages = async (req,res) => {
  try {
    
    var numOrphs = await Orphanage.count({
    })
    res.status(200).json(numOrphs)

  } catch (error) {
    
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })


  }
}

const getNumberofRegisteredUsers = async (req,res) => {
    try {
      
      var numOrphs = await RegisterUser.count({
      })
    
      res.status(200).json(numOrphs)
  
    } catch (error) {
      
      console.log(error)
      res.status(500).json({
          errorMessage: error.message
      })
  
  
    }
  }

const getNumberofSponsors = async (req,res) => {
    try {
      
      var numOrphs = await Sponsor.count({
      })
      res.status(200).json(numOrphs)
  
    } catch (error) {
      
      console.log(error)
      res.status(500).json({
          errorMessage: error.message
      })
  
  
    }
  }

const getNumberofChildren = async (req,res) => {
    try {
      
      var numOrphs = await Children.count({
      })
      res.status(200).json(numOrphs)
  
    } catch (error) {
      
      console.log(error)
      res.status(500).json({
          errorMessage: error.message
      })
  
  
    }
  }

const getAllOrphanageItemsMonths = async (req, res) => {

    try {

        var rate = req.query.rating
        let priority1 = [
            {key : 'Jan',needs: '',metNeeds: ''},
            {key : 'Feb',needs: '',metNeeds: ''},
            {key : 'March',needs: '',metNeeds: ''},
            {key : 'April',needs: '',metNeeds: ''},
            {key : 'May',needs: '',metNeeds: ''},
            {key : 'Jun',needs: '',metNeeds: ''},
            {key : 'Jul',needs: '',metNeeds: ''},
            {key : 'Aug',needs: '',metNeeds: ''},
            {key : 'Sept',needs: '',metNeeds: ''},
            {key : 'Oct',needs: '',metNeeds: ''},
            {key : 'Nov',needs: '',metNeeds: ''},
            {key : 'Dec',needs: '',metNeeds: ''},
         ]
         var count = 0;
        var date = new Date('2022-01-01') //first date 
        date.setDate(1)
        while (count <= 11) {
           
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
           firstDay.setHours(0, 0, 0, 0);
           lastDay.setHours(23, 59, 59, 999);
        
            var met = await ItemNeed.count({
                where :{
                    isFulfilled : 1, // is  fulfilled 
                    DateEstablished : {
                        [Op.between]: [firstDay, lastDay],
                       },
                       PriorityRating: rate
                }
            })

            var total = await ItemNeed.count({
                where :{
                    DateEstablished : {
                        [Op.between]: [firstDay, lastDay],
                       },
                       PriorityRating: rate
                }
            })

            priority1[count].metNeeds = Number(met)
            priority1[count].needs = Number(total)
            date.setMonth(firstDay.getMonth() + 1)
          
            //console.log(lastDay.getUTCDate())
            console.log( priority1[count].metNeeds)
            console.log( priority1[count].needs)
            count++

        }

     

  
     res.status(200).json(priority1)
    } catch (error) {
     
     console.log(error)
     res.status(500).json({
         errorMessage: error.message
     })
 
 
    }
 }

 const getAmount = async (req,res) => {
//await sequelize.query("UPDATE users SET y = 42 WHERE x = 12");
  try {
    var dist =  await generalDonation.sum('Amount')

  res.status(200).json(dist)
  } catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })
  }
 }

  const orphanageHighestPriority = async (req,res) => {
    try {
      var arr = []
    var orphs = await Orphanage.findAll({}) // get all the orphanages

    for (const o of orphs) {
      var obj = {Name : '', Number : ''}

      const num = await ItemNeed.count({where : {
        orphanageID : o.ID, //current orphanage
        PriorityRating : '3'
      }})

      obj.Name = o.OrphanageName
      obj.Number = num
      arr.push(obj)
    }

    res.status(200).json(arr)
    } catch (error) {
      
      console.log(error)
      res.status(500).json({
          errorMessage: error.message
      })

    }

  }

 const distributeFunds = async (req,res) => {

  try {
    
  const amount = req.query.amt
  const orph =req.query.id

  let obj = {
    Amount : amount,
    orphanageID: orph
  }

  var don = await gDon.sum('Amount').then(sum =>{

  })

  
  var dist = await Distribution.sum('Amount').then(sum =>{

  })

  const value = dist + obj.Amount
  if(value <= don){
    await Distribution.create(obj)

    let notify = {
      orphanageID : obj.orphanageID,
      Title : "Donation made",
      Body :  "Simamisa distributed an amount of R" + obj.Amount + " to the orphanage",
      NotificationTime : new Date()
  }

   await Notification.create(notify)
res.status(200).json('success')

  } else {
    res.status(200).json('insufficient funds to distribute')
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })

  }
  
  
  // if the amount I want to distribute is not greater than the money I have, permit 
  /**Project.sum('age').then(sum => {
  // this will return 55
}) */

 }

// all needs that are not not fulfilled and do not have sponsors 
const childrenNeeds = async (req,res) =>{
   try {
    
    let needs = await ChildNeed.count({
        where : {
            sponsorshipID : null,
            isFulfilled : 0
        }
    })

    res.status(200).json(needs)
   } catch (error) {
    
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })

   }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports={
    getAllOrphanageItemsMonths,
    getAllUnmetOrphaganes,
    getNumberofChildren,
    getNumberofOrphanages,
    getNumberofRegisteredUsers,
    getNumberofSponsors,
    childrenNeeds,
    getChildren,
    distributeFunds,
    getAmount,
    orphanageHighestPriority
}