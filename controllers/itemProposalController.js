const db = require('../models/')
const ItemProposal = db.ItemProposal
const ItemNeed = db.ItemNeed
const {doASideEffect} = require('./utilities.js')
const { Op } = require("sequelize");

async function wrapperCalc(itemList){
for (const item of itemList) {
    
}
}
//how do I use
async function calcItemsReceived(id){
    let numItems = await ItemProposal.count({where :{ [Op.and]: [
        { itemNeedID: id },
        { ProposalType: 'ITEM' },
        {isFulfilled : true}
      ] }});

      return numItems
}

async function calcAmountReceived(id){
    let props = await ItemProposal.findAll({where :{ [Op.and]: [
        { itemNeedID: id },
        { ProposalType: 'DONATION' },
        {isFulfilled : true}
      ] }});


     // for each loop to add 
      return numItems
}



const getAllProposals = async(req, res) =>{
    let proposals = await ItemProposal.findAll({});
    if(!proposals) {
        return res.status(404).send('there are no proposals')
    }
    res.status(200).json(proposals)
}


const getUnfulfilled = async(req,res) =>{
    let proposals = await ItemProposal.findAll({where:{isFulfilled : false}});
     if(!proposals) return res.status(404).send('there are no proposals')

     res.status(200).json(proposals)
}

const getItemProposals = async(req,res) =>{
    let id = req.params.id
    let proposals = await ItemProposal.findAll({where: {itemNeedID:id}})
    console.log(id)
        if(!proposals) return res.status(404).send('there are no proposals for this item')

    res.status(200).json(proposals)
}


const getUserProposals = async(req,res) =>{
    user = req.params.id
    let proposals = await ItemProposal.findAll({where : {registeredUserID: user}});
     if(!proposals) return res.status(404).send('there are no proposals')

     res.status(200).json(proposals)
}

const getProposal = async(req,res) =>{
    let id = req.params.proposalID
    let proposals = await ItemProposal.findAll({where: {ID:id}})
    console.log(id)
        if(!proposals) return res.status(404).send('there are no proposals for this item')

    res.status(200).json(proposals)
}

const createProposal = async(req,res) =>{
    let newProposal = {
        PickUpPlace : req.body.PickUpPlace,
        PickUpTime : req.body.PickUpTime,
        DropOffTime : req.body.DropOffTime,
        ProposalComment : req.body.ProposalComment,
        NumberToGive : req.body.NumberToGive,
        registeredUserID : req.body.registeredUserID,
        itemNeedID : req.body.itemNeedID,
        AmountGiven : req.body.AmountGiven

    }

    const savedProposal = await ItemProposal.create(newProposal);
        if(!savedProposal) return res.status(400).json('could not create proposal')

        await doASideEffect(req.params.id, "NumberSomething", "ItemNeed", async (id) => {
            let numItems = await ItemProposal.count({where :{ [Op.and]: [
                { itemNeedID: id },
                { ProposalType: 'ITEM' },
                {isFulfilled : true}
              ] }});
        
              return numItems
        })
        
    res.status(200).json(savedProposal)

}

const updateProposal = async(req,res) => {
    let id = req.body.ID;
    // I think I should just receive the changes that I want to and update them accordingly

    const proposal = await ItemProposal.update(req.body,{where: {ID : id}})
        if(!proposal) return res.status(400).send('could not update item: '+ id);

        res.status(200).json(proposal)
}



module.exports = {
    updateProposal,
    createProposal,
    getAllProposals,
    getItemProposals,
    getProposal,
    getUnfulfilled,
    getUserProposals,
    calcItemsReceived
}