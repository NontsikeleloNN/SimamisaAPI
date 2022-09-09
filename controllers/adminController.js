//  get all of the orphanages, get all their items, all their donations. THis is for sharing and distribution
// all the children who are sponsored
// all needs and donations not met
// childneeds that are not met 

const db = require('../models')
const Orphanage = db.Orphanage
const ItemNeed = db.ItemNeed
const ChildNeed = db.ChildNeed
const dataForge = require('data-forge');require('data-forge-fs')
const { Op } = require("sequelize");

//all the itemNeeds who are still needed and are highest priority 
//I can send this with the numbers for each orphanage and send as x and y values 
const getAllOrphanageItemsDate  = async (req, res) => {

   try {
    
    let itemsArr = []
    let x = []
    let y = []
    let temp;

    
    

    res.status(200).json(itemsArr)
   } catch (error) {
    
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })


   }
}


const getAllOrphanageItemsMonths = async (req, res) => {
/**
 * number of needs 
 * number of met needs
 * month 
 */



/**var resultList = [];
var date = new Date("October 13, 2014");
var endDate = new Date("January 13, 2015");
var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//while (date <= endDate)

    var stringDate = monthNameList[date.getMonth()] + " " + date.getFullYear();
    resultList.push(stringDate);
    date.setMonth(date.getMonth() + 1);
 */
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
// all needs that are not not fulfilled and do not have sponsors 
const childrenUnsponsored = async (req,res) =>{
   try {
    
    let needs = await ChildNeed.findAll({
        where : {
            sponsorshipID : null,
            isFullfilled : 0
        }
    })

   } catch (error) {
    
    console.log(error)
    res.status(500).json({
        errorMessage: error.message
    })

   }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports={
    getAllOrphanageItemsMonths
}