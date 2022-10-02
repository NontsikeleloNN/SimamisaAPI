/**
 * CRUD an item need from manager side similar to event
 * create an item proposal, update and delete it, get all of them, get by user, get by item need, 
 * counter for getting the accepted ones
 */
 const db = require('../models/')
const ItemNeed = db.ItemNeed
const { Op } = require('sequelize')

const { calcItemsReceived } = require('./itemProposalController')
const { Orphanage } = require('../models/')





const getAllNeeds = async(req,res) => {
    let items = await ItemNeed.findAll({});
    calcItemsReceived(items)
        if(!items) return res.status(404).send('there are no events')

        /**
         * for (item : items){
         * item.NumberReceived = }
         */

        const sortedDesc = items.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}

const getAllActiveNeeds = async(req,res) => {
    let items = await ItemNeed.findAll({include: [
        {
            model: Orphanage, 
            attributes: ['OrphanageName']
        }
    ],where : {isFulfilled : false}});
        if(!items) return res.status(400).send('there are no events')


        const sortedDesc = items.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}

const getOrphanageNeeds = async(req,res) => {
    const id = req.params.id; 

    let items = await ItemNeed.findAll({where : {orphanageID : id,
        isFulfilled : false}});
        if(!items) return res.status(404).send('there are no events')

        const sortedDesc = items.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}

const getAllActiveNeedsByName = async(req,res) => {
    const name = req.params.name

    let items = await ItemNeed.findAll({where : {isFulfilled : false,
    Description :
    {[Op.like]: '%' +name+ '%'}, }});
        if(!items) return res.status(404).send('there are no events')

        const sortedDesc = items.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}

const deleteItem = async(req,res) =>{

    try {
        
        const id = req.query.id
        await ItemNeed.destroy({where : {ID : id}})
        res.status(200).json('deleted')
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}
const createItem = async(req,res) =>{

    try {
        let newItem = {
            DueDate : req.body.DueDate,
            DateEstablished : new Date(),
            Title : req.body.Title,
            Description : req.body.Description,
            isFulfilled : false,
            PriorityRating : req.body.PriorityRating,
            orphanageID : req.body.orphanageID,
            ItemImage : req.body.ItemImage,
            NumberReceived : 0,
            UnitCost : req.body.UnitCost,
            NumberNeeded : req.body.NumberNeeded,
            AmountNeeded : req.body.UnitCost * req.body.NumberNeeded,
            AmountReceived : 0
        }
        
        const savedItem = await ItemNeed.create(newItem)
            if(!savedItem) return res.status(400).json('could not create item')
            res.status(200).json(savedItem)
        
    } catch (error) {
        req.status(500).json({
            errorMessage : error.message
        })
    }
}

const getNeed = async (req,res) => {
    try {
      
        let id = req.query.id
        let orph = await ItemNeed.findOne({include: [
            {
                model: Orphanage, 
                attributes: ['OrphanageName','NavigationAddress']
            }
        ],where: {ID: id},})
       
        res.status(200).json(orph)

    } catch (error) {
        res.status(500).json({
            errorMessage : error.message
        })
    }
}

const updateItem = async(req,res) =>{
    try {
        
        let id = req.body.id;
        // I think I should just receive the changes that I want to and update them accordingly
    
        let item = await ItemNeed.update(req.body,{where: {ID : id}})
            if(!item) return res.status(400).json('could not update item: '+ id);
    
        if(item.NumberReceived >= item.NumberNeeded){
            item.isFulfilled = true;
            await item.save()
        }
     
       
        res.status(200).json('updated')

    } catch (error) {
        res.status(500).json({
            errorMessage : error.message
        })
    }
}

module.exports = {
getAllNeeds,
getAllActiveNeeds,
getAllActiveNeedsByName,
getOrphanageNeeds,
createItem,
updateItem,
deleteItem,
getNeed
}