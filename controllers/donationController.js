const db = require('../models/')

const Donation = db.Donation


/**const getAllItemDonations = async(req,res) => {
    const id = req.params.id
    let donations = await Donation.findAll({where : {itemNeedID : id}});
        if(!donations) return res.status(404).send('there are no events')

        const sortedDesc = donations.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}
*/
const getAllDonations = async(req,res) => {
    
    let donations = await Donation.findAll({});
        if(!donations) return res.status(404).send('there are no events')

        const sortedDesc = donations.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          ); 
    res.status(200).json(sortedDesc)

}

const getAllActiveDonation = async(req,res) => {
    let donations = await Donation.findAll({where : {isFulfilled : false}});
        if(!donations) return res.status(400).send('there are no donation')

        const sortedDesc = donations.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}

const getOrphanageDonations = async(req,res) => {
    const id = req.params.id; 

    let donations = await Donation.findAll({where : {orphanageID : id,
        isFulfilled : false}});
        if(!donations) return res.status(404).send('there are no donationss')

        const sortedDesc = donations.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}

const getAllActiveDonationsByName = async(req,res) => {
    const name = req.params.name

    let donations = await Donation.findAll({where : {isFulfilled : false,
    Title :
    {[Op.like]: '%' +name+ '%'}, }});
        if(!donations) return res.status(404).send('there are no doantions')

        const sortedDesc = donations.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}


const createDonation = async(req,res) =>{
    let newdonation = {
        DueDate : req.body.DueDate,
        DateEstablished : req.body.DateEstablished,
        Title : req.body.Title,
        Description : req.body.Description,
        isFulfilled : false,
        PriorityRating : req.body.PriorityRating,
        orphanageID : req.body.orphanageID,
        ItemImage : req.body.ItemImage,
        AmountReceived : req.body.AmountReceived,
        AmountNeeded : req.body.AmountNeeded,
        DonationType : req.body.DonationType
    }
    
    const saveddonation = await Donation.create(newdonation)
        if(!saveddonation) return res.status(400).send('could not create item')
        res.status(200).json(saveddonation)
    }

    module.exports ={
        createDonation,
        getAllActiveDonation,
        getAllActiveDonationsByName,
        getOrphanageDonations,
        getAllDonations
    }