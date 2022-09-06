const express = require('express')
const cors = require('cors')
const paypal = require('paypal-rest-sdk');
//const orphanageController = require('./controllers/orphanageController.js')
/////////////////////////////////

const app = express()
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AcCf708AwPbCEEGrD6yd7R4CZbDu1EB3wKkKPmpUuTS7u328x_-TmRdTb22xSEMQywd2KKFMW7ERHFkU',
    'client_secret': 'ENcxxYTBd-XBJ8_Q-TAxjVC_vheVBvYlnZW8F6WXf4UEly8eOGpL2lASauKq6GcZekuzePnOoUscBX6m'
  });

//Paypal





app.get('/simamisa/pay/:amt', (req, res) => {
   
    let q = req.params.amt
    q = q.substring(1)
   let  amt = q//'"'+q+'"'
  // amt = amt.substring(1)
console.log(amt)
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "https://simamisa.herokuapp.com/simamisa/success",
          "cancel_url": "https://simamisa.herokuapp.com/simamisa/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Hat",
                  "sku": "001",
                  "price": amt,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": amt
          },
          "description": "Hat for the best team ever"
      }]
  };
  
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  });

  app.get('/simamisa/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    console.log("payerId",payerId,"paymentId",paymentId) 
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": amt
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log("error",error.response);
          throw error;
      } else {
          res.sendFile(__dirname + "/success.html")
      }
  });
});

app.get('/simamisa/cancel', (req, res) => res.json('Cancelled'));

////////////////////////////////////////

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



//To get the ipm run ipconfig ina terminal. FIX bad english
/*const baseUrl = "192.adadasd.asd"
const apiEndpoint = `${baseUrl}/orphanahes/zuz`
apiEndpoint = baseURl + "/orphanhes"*/

const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log(`server is running @ port ${PORT}`)
})