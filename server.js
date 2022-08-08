const express = require('express')
const cors = require('cors')
//const orphanageController = require('./controllers/orphanageController.js')

const app = express()

app.use(
    cors()
)
// {
//     origin: "*",
//     methods: ["PUT","GET","POST","DELETE"]
// }

// app.options('*',cors())
//middleware configurations
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const partnering = require('./routers/partneringRouter')
app.use('/simamisa/orphanages/partnering',partnering)


const meeting = require('./routers/meetingRouter')
app.use('/simamisa/orphanages/meetings',meeting)

const childneed = require('./routers/childneedRouter')
app.use('/simamisa/orphanages/childneed',childneed)

const om = require('./routers/orphanageManagerRouter')
app.use('/simamisa/orphanages/om',om)


const donation = require('./routers/donationRouter')
app.use('/simamisa/orphanages/donations',donation)
// proposal router
const proposal = require('./routers/itemProposalRouter')
app.use('/simamisa/orphanages/needs/proposals',proposal)
//needs
const needRouter = require('./routers/itemNeedRouter')
app.use('/simamisa/orphanages/needs',needRouter)
//children
const childRouter = require('./routers/childRouter')
app.use('/simamisa/orphanages/children',childRouter)

//event routers
const eventRouter = require('./routers/eventsRouter')
app.use('/simamisa/orphanages/events',eventRouter)

//routers users
const authenitcationRouter = require('./routers/authRouter')
app.use('/simamisa/orphanages/users',authenitcationRouter)

//orphhs
const orphanageRouter = require('./routers/orphanageRouter')

app.use('/simamisa/orphanages',orphanageRouter)


app.get('/',(req,res) => {
    res.json({message: 'hello world'})
})

//To get the ipm run ipconfig ina terminal. FIX bad english
/*const baseUrl = "192.adadasd.asd"
const apiEndpoint = `${baseUrl}/orphanahes/zuz`
apiEndpoint = baseURl + "/orphanhes"*/

const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log(`server is running @ port ${PORT}`)
})