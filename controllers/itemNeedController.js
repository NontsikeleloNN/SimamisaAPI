/**
 * CRUD an item need from manager side similar to event
 * create an item proposal, update and delete it, get all of them, get by user, get by item need, 
 * counter for getting the accepted ones
 */
 const db = require('../models/')
const ItemNeed = db.ItemNeed
const { Op } = require('sequelize')

const { calcItemsReceived } = require('./itemProposalController')





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
    let items = await ItemNeed.findAll({where : {isFulfilled : false}});
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
    Title :
    {[Op.like]: '%' +name+ '%'}, }});
        if(!items) return res.status(404).send('there are no events')

        const sortedDesc = items.sort(
            (objA, objB) => Number(objB.PriorityRating) - Number(objA.PriorityRating),
          );
    res.status(200).json(sortedDesc)

}
const createItem = async(req,res) =>{
let newItem = {
    DueDate : req.body.DueDate,
    DateEstablished : req.body.DateEstablished,
    Title : req.body.Title,
    Description : req.body.Description,
    isFulfilled : false,
    PriorityRating : req.body.PriorityRating,
    orphanageID : req.body.orphanageID,
    ItemImage : req.body.ItemImage,
    NumberReceived : req.body.NumberReceived,
    UnitCost : req.body.UnitCost,
    NumberNeeded : req.body.NumberNeeded,
    AmountNeeded : UnitCost * NumberNeeded,
    AmountReceived : 0
}

const savedItem = await ItemNeed.create(newItem)
    if(!savedItem) return res.status(400).send('could not create item')
    res.status(200).json(savedItem)
}

const updateItem = async(req,res) =>{
    let id = req.body.ID;
    // I think I should just receive the changes that I want to and update them accordingly

    const item = await ItemNeed.update(req.body,{where: {ID : id}})
        if(!item) return res.status(400).send('could not update item: '+ id);

    if(item.NumberReceived >= item.NumberNeeded){
        item.isFulfilled = true;
    }
    await item.save()
    res.status(200).json(item)
}

module.exports = {
getAllNeeds,
getAllActiveNeeds,
getAllActiveNeedsByName,
getOrphanageNeeds,
createItem,
updateItem,
}