const db = require('../models/'); // not having this in the events was causing an error

const ChildNeed = db.ChildNeed
const Sponsorship = db.Sponsorship


const fulfillChildNeed = async (req, res) => {

    try {

        const childneedID = req.query.id

        const amt = Number(req.query.amt)

        var need = await ChildNeed.findOne({ where: { ID: childneedID } })

        const prev = need.AmountNeeded
        need.AmountNeeded -= amt
        need.AmountReceived += amt
        const total = amt + Number(need.AmountReceived)

        if (total >= prev) {
            need.isFullfilled = '1'
        }

        await need.save()

        res.status(200).json(need)
    } catch (error) {
        res.status(400).json({
            errorMessage: error.message
        })
    }
}

const editChildNeed = async (req, res) => {
    try {

        let id = req.body.id;
        // I think I should just receive the changes that I want to and update them accordingly

        const item = await ChildNeed.update(req.body, { where: { ID: id } })
        if (!item) return res.status(400).json('could not update item: ' + id);



        res.status(200).json('updated')

    } catch (error) {
        res.status(400).json({
            errorMessage: error.message
        })
    }

}

const getChildNeed = async (req, res) => {
    try {

        let id = req.query.id
        let orph = await ChildNeed.findOne({ where: { ID: id } })
        res.status(200).json(orph)

    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
}

const deleteChildNeed = async (req, res) => {

    try {

        const id = req.query.id
        await ChildNeed.destroy({ where: { ID: id } })
        res.status(200).json('deleted')
    } catch (error) {

        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }

}
const createChildNeed = async (req, res) => {
    try {

        let newItem = {
            DueDate: req.body.DueDate,
            Title: req.body.Title,
            Description: req.body.Description,
            isFulfilled: false,
            orphanageID: req.body.orphanageID,
            sponsorshipID: req.body.sponsorshipID,
            AmountReceived: req.body.AmountReceived,
            AmountNeeded: req.body.AmountNeeded
        }

        const savedItem = await ChildNeed.create(newItem)
        if (!savedItem) return res.status(400).json('could not create item')
        res.status(200).json(savedItem)

    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
}

const getSponsorChildNeeds = async (req, res) => {
    /**I can get the spononsorID, */
    let needs = [];
    const id = req.query.sponsorID
    try {

        console.log(id + ' is sponsorID')
        let need;
        let sponsorships = await Sponsorship.findAll({ where: { sponsorID: id } }) // all of the sponsorships belonging to this guy


        for (let cv of sponsorships) {
            need = await ChildNeed.findAll({ where: { sponsorshipID: cv.ID, isFulfilled: false } })
            needs.push(need)
            console.log(need)

        }


        res.status(200).json(needs)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })
    }


}

const getChildNeeds = async (req, res) => {

    let needs = [];
    try {
        const id = req.query.childID

        console.log(id + 'id')
        let sponsorships = await Sponsorship.findOne({ where: { childID: id } }) // all of the sponsorships belonging to this guy

        let spons = await ChildNeed.findAll({ where: { sponsorshipID: sponsorships.ID, isFulfilled: false } })

        for (const sponsers of spons) {
            needs.push(sponsers)
        }

        res.status(200).json(needs)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })
    }





}

module.exports = {
    createChildNeed,
    getSponsorChildNeeds,
    getChildNeeds,
    getChildNeed,
    editChildNeed,
    deleteChildNeed,
    fulfillChildNeed
}