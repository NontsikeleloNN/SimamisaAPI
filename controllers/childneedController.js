const db = require('../models/'); // not having this in the events was causing an error

const ChildNeed = db.ChildNeed
const Sponsorship = db.Sponsorship
const createChildNeed = async(req,res) =>{
    let newItem = {
        DueDate : req.body.DueDate,
        Title : req.body.Title,
        Description : req.body.Description,
        isFullfilled : false,
        orphanageID : req.body.orphanageID,
        spons : req.body.sponsorshipID,
        AmountReceived : req.body.AmountReceived,
        AmountNeeded : req.body.AmountNeeded
    }
    
    const savedItem = await ChildNeed.create(newItem)
        if(!savedItem) return res.status(400).send('could not create item')
        res.status(200).json(savedItem)
    }
    
    const getSponsorChildNeeds = async(req,res) => {
        /**I can get the spononsorID, */
        let needs = [];
        const id = req.query.sponsorID
        try {
            
      console.log(id+ ' is sponsorID')
        let need;
        let sponsorships = await Sponsorship.findAll({where : {sponsorID : id}}) // all of the sponsorships belonging to this guy

      /**  sponsorships.forEach(element => {
            needs.push(ChildNeed.findAll({where : {sponsorshipID : element.ID, isFulfilled : false}}))
        });*/

        for(let cv of sponsorships){
            need = await ChildNeed.findAll({where : {sponsorshipID : cv.ID, isFullfilled : false}})
            needs.push(need)
            console.log(need)
        }



        } catch (error) {
            console.log(error)
          res.status(500).json({
                errorMessage: error.message
            })
        }
    
        res.status(200).json(needs)
    }

    const getChildNeeds = async (req,res) => {

        try{
        const id = req.query.childID

        let needs = [];
        let sponsorships = await Sponsorship.findAll({where : {childID : id}}) // all of the sponsorships belonging to this guy

        sponsorships.forEach(element => {
            needs.push(ChildNeed.findAll({where : {sponsorshipID : element.ID, isFullfilled : false}}))
        });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                errorMessage: error.message
            })
        }
    
        res.status(200).json(needs)

    }

    module.exports = {
    createChildNeed,
    getSponsorChildNeeds,
    getChildNeeds
    }