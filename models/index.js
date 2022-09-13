const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');



const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(()=> {
    console.log('connected...')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}



db.Sequelize = Sequelize
db.sequelize = sequelize 


//this is what creates the model after you have defined it 
db.Orphanage = require('./orphanageModel.js')(sequelize, DataTypes)
db.Event = require('./eventModel.js')(sequelize, DataTypes)
db.Child = require('./childModel.js')(sequelize,DataTypes)
db.Partnership = require('./partnershipModel.js')(sequelize,DataTypes)
db.RegisteredUser = require('./registeredUserModel.js')(sequelize,DataTypes)
db.UserSubscription = require('./userSubscriptionModel.js')(sequelize,DataTypes)
db.Sponsor = require('./sponsorModel')(sequelize,DataTypes)
db.Sponsorship = require('./sponsorshipModel')(sequelize,DataTypes)
db.OrphanageManager = require('./orphanageManagerModel')(sequelize,DataTypes)
db.SponsorRequest = require('./sponsorRequestModel')(sequelize,DataTypes)
db.Chat = require('./chatModel')(sequelize,DataTypes)
db.Message = require('./messageModel')(sequelize,DataTypes)
db.Volunteer = require('./volunteerModel')(sequelize,DataTypes)
db.VolunteerSkill = require('./volunteerSkillModel')(sequelize,DataTypes)
db.Service = require('./serviceModel')(sequelize,DataTypes)
db.VolunteerInfo = require('./volunteerInfoModel')(sequelize,DataTypes)
db.ServiceVolunteer = require('./serviceVolunteerModel')(sequelize,DataTypes)
db.Store = require('./storeModel')(sequelize,DataTypes)
db.Product = require('./productModel')(sequelize,DataTypes)
db.SponsorFile = require('./sponsorFileModel')(sequelize,DataTypes)
db.ChildNeed = require('./childNeedModel')(sequelize,DataTypes)
db.ItemNeed = require('./itemNeedModel')(sequelize,DataTypes)
db.Donation = require('./donationModel')(sequelize,DataTypes)
db.Needfulfillment = require('./needFulfillmentModel')(sequelize,DataTypes)
db.Donationfulfillment = require('./donationFulfillmentModel')(sequelize,DataTypes)
db.Offer = require('./offerModel')(sequelize,DataTypes)
db.OfferItem = require('./offerItemModel')(sequelize,DataTypes)
db.ItemProposal = require('./itemProposalModel')(sequelize,DataTypes)
db.SponsorshipPost = require('./sponsorshipPostModel') (sequelize,DataTypes)
db.generalDonation = require('./generalDonationModel') (sequelize,DataTypes)

//sponsorship post
db.Sponsorship.hasMany(db.SponsorshipPost,{ foreignKey: {allowNull:false}})
db.SponsorshipPost.belongsTo(db.Sponsorship)

db.Orphanage.hasMany(db.ItemNeed,{ foreignKey: {allowNull:false}})
db.ItemNeed.belongsTo(db.Orphanage)

//item proposals
db.ItemNeed.hasMany(db.ItemProposal,{ foreignKey: {allowNull:false}})
db.ItemProposal.belongsTo(db.ItemNeed)
db.RegisteredUser.hasMany(db.ItemProposal,{ foreignKey: {allowNull:false}})
db.ItemProposal.belongsTo(db.RegisteredUser)

// sponsor
db.RegisteredUser.hasMany(db.Sponsor)
db.Sponsor.belongsTo(db.RegisteredUser)

// events
db.Orphanage.hasMany(db.Event)
db.Event.belongsTo(db.Orphanage)

//offer Items
db.Offer.hasMany(db.OfferItem,{ foreignKey: {allowNull:false}})
db.OfferItem.belongsTo(db.Offer)

//offers

db.Orphanage.hasMany(db.Offer)
db.Offer.belongsTo(db.Orphanage)

 //donation fulfillemnt
 db.Donation.hasMany(db.Donationfulfillment)
 db.Donationfulfillment.belongsTo(db.Donation)
 db.RegisteredUser.hasMany(db.Donationfulfillment)
 db.Donationfulfillment.belongsTo(db.RegisteredUser)


//donation
db.Orphanage.hasMany(db.Donation)
db.Donation.belongsTo(db.Orphanage)
db.ChildNeed.hasMany(db.Donation)
db.Donation.belongsTo(db.ChildNeed)
db.ItemNeed.hasMany(db.Donation)
db.Donation.belongsTo(db.ItemNeed)



//meeting
db.OrphanageManager.hasMany(db.SponsorRequest, {foreignKey: {allowNull:false}})
db.SponsorRequest.belongsTo(db.OrphanageManager)
db.RegisteredUser.hasMany(db.SponsorRequest, {foreignKey: {allowNull:false}})
db.SponsorRequest.belongsTo(db.RegisteredUser)
db.Child.hasMany(db.SponsorRequest, {foreignKey: {allowNull:false}})
db.SponsorRequest.belongsTo(db.Child)

//orphanage managering
db.Orphanage.hasMany(db.OrphanageManager, {foreignKey: {allowNull:false}})
db.OrphanageManager.belongsTo(db.Orphanage)
db.RegisteredUser.hasMany(db.OrphanageManager, {foreignKey: {allowNull:false}})
db.OrphanageManager.belongsTo(db.RegisteredUser)

//sponsorship handling 
db.Sponsor.hasMany(db.Sponsorship,{foreignKey: { allowNull:false}})
db.Sponsorship.belongsTo(db.Sponsor)
db.Child.hasOne(db.Sponsorship,{foreignKey: {unique:true, allowNull:false}})
db.Sponsorship.belongsTo(db.Child)


 
//user subscription and orph and reg user
db.Orphanage.hasMany(db.UserSubscription, {foreignKey:{allowNull: false, name: 'OrphID'}}),
db.RegisteredUser.hasMany(db.UserSubscription, {foreignKey:{allowNull: false, name: 'UserID'}}),
db.UserSubscription.belongsTo(db.RegisteredUser),
db.UserSubscription.belongsTo(db.Orphanage),
db.UserSubscription.removeAttribute('registeredUserID'),
db.UserSubscription.removeAttribute('orphanageID')


//orphanage and partnerships
db.Orphanage.hasMany(db.Partnership,{ foreignKey: { allowNull: false, name: 'SenderID' }})
db.Orphanage.hasMany(db.Partnership,{ foreignKey: { allowNull: false, name: 'ReceiverID'  }})
db.Partnership.belongsTo(db.Orphanage)
db.Partnership.removeAttribute('orphanageID')

//orphanage and child
db.Orphanage.hasMany(db.Child, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
db.Child.belongsTo(db.Orphanage)

//item need


//child need
db.Sponsorship.hasMany(db.ChildNeed)
db.ChildNeed.belongsTo(db.Sponsorship)

db.generalDonation.belongsTo(db.Orphanage)
db.Orphanage.hasMany(db.generalDonation)
db.generalDonation.belongsTo(db.Child)
db.Child.hasMany(db.generalDonation)
db.generalDonation.belongsTo(db.RegisteredUser)
db.RegisteredUser.hasMany(db.generalDonation)

//sponsor documents
db.Sponsor.hasMany(db.SponsorFile,{ foreignKey: {allowNull:false}})
db.SponsorFile.belongsTo(db.Sponsor)


//product
db.Store.hasMany(db.Product,{ foreignKey: {allowNull:false}})
db.Product.belongsTo(db.Store)

//store
db.Orphanage.hasOne(db.Store,{ foreignKey: {allowNull:false}})
db.Store.belongsTo(db.Orphanage)

//service volunteer
db.Volunteer.hasMany(db.ServiceVolunteer, {foreignKey: {allowNull: false}})
db.ServiceVolunteer.belongsTo(db.Volunteer)
db.Service.hasMany(db.ServiceVolunteer, {foreignKey: {allowNull: false}})
db.ServiceVolunteer.belongsTo(db.Service)

//volunteer info
db.Volunteer.hasMany(db.VolunteerInfo, {foreignKey: {allowNull: false}})
db.VolunteerInfo.belongsTo(db.Volunteer)
db.Service.hasMany(db.VolunteerInfo, {foreignKey: {allowNull: false}})
db.VolunteerInfo.belongsTo(db.Service)

//service 
db.Orphanage.hasMany(db.Service, {foreignKey: {allowNull: false}})
db.Service.belongsTo(db.Orphanage)

//volunteer Skill
db.Volunteer.hasMany(db.VolunteerSkill)
db.VolunteerSkill.belongsTo(db.Volunteer)

//volunteer
db.RegisteredUser.hasMany(db.Volunteer, {foreignKey: {allowNull: false}})
db.Volunteer.belongsTo(db.RegisteredUser)

//message
db.Chat.hasMany(db.Message)
db.Message.belongsTo(db.Chat)
db.RegisteredUser.hasMany(db.Message, {foreignKey: {name: 'SenderID'}})
db.RegisteredUser.hasMany(db.Message, {foreignKey: {name: 'ReceiverID'}})
db.Child.hasMany(db.Message)
db.Message.belongsTo(db.Child)
db.Message.belongsTo(db.RegisteredUser)
db.Message.removeAttribute('registeredUserID') //case sensetive




db.sequelize.sync({force: false})  // resync means to update the database with the chnages you've made. froce, true and alter. Force deletes and redoes, alter makes changes but doesn't scrap the whole table
.then(() => {
    console.log('yes resync done')
}).catch(err=> {
    console.log('Something went wrong while resync database and models: '+err)
});

module.exports = db