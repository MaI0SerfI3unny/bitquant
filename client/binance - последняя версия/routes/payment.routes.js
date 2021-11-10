const {Router} = require('express')
//const Payment = require('../models/Payment')
const rp = require('request-promise');
const router = Router()
const request = require('request')
const crypto = require('crypto')

router.get('/paymentStatus',async (req, res) => {
    try {
        console.log(req.body)
        res.status(201).json({ result: "success" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/paymentStatus',async (req, res) => {
    try {
        //console.log(req.body)
        res.status(201).json({ result: "success" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


router.post('/testPayment',async (req, res) => {
    try {
        const apiKey = 'zMMYbssMsTj8IsxwQeCi1BSUU0yKpZi4AImcBJ69';
        const apiSecret = 'xbNoxSIuixDNi5iZ0NNAVPRXNPB7k7NlJpzWL3z0';

        const apiPath = "/v3/auth/payment_requests/address"//"/v3/fees"//"/v3/auth/payment_requests/address"//v3/auth/merchant/deposit"//'/v3/auth/kuna_codes/issued-by-me'"v3/auth/payment_requests/address"
        const nonce = Date.now().toString()
        // const body = {
        //     "currency": "uah",
        //     "amount": 1,
        //     "payment_service": "default",
        //     "return_url": "https://your.site.url",
        //     "callback_url": "https://callback.url"
        // }
        const body = {
            currency: "usdt",//"usdt",
            blockchain: "trx",//"trx",TRC20 ERC20
            callback_url: "https://bitquant.online/api/payments/paymentStatus"
        }
        //const body = {}
        let signature = `${apiPath}${nonce}${JSON.stringify(body)}`

        const sig = crypto.createHmac('sha384', apiSecret).update(signature)
        const shex = sig.digest('hex')
        const options = {
            method: 'POST',
            url: `https://api.kuna.io${apiPath}`,
            headers: {
                'kun-nonce': nonce,
                'kun-apikey': apiKey,
                'kun-signature': shex
            },
            body: body,
            json: true
        }

        // request.post(options, (error, response, body) => {
        //     console.log(body);
        //     res.json({ result: "success", data:  body})
        // })

        rp(options)
            .then(async function (parsedBody) {
                res.json({ result: "success", data:  parsedBody})
            })
            .catch(function (err) {
                console.log(err.message)
                res.status(401).json({ result: "error" })
            });

        //res.json({ result: "success" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/addPayment',async (req, res) => {
    try {
      const {paymentId, strategyId, userId, merch, rate} = req.body
      const p_status = await Payment.find().lean().exec()
      for(let item of p_status){
        if(item.status ==="wait"){
            const status = await Payment.deleteOne({"_id": item._id}).lean().exec()
        }
      }
      const payment = await Payment.findOne({"transactionId": paymentId}).lean().exec()          
      if(!payment){
        const strategy = await Strategy.findOne({"_id": strategyId}).lean().exec()
        const amount = (strategy.price*rate).toFixed(2)
        const u_payment = new Payment({"payer": userId, "strategyId": strategyId, "merch": merch, "transactionId": paymentId, "amount": amount})
        await u_payment.save() 
        return res.json({ payment: u_payment })
      } 
      res.json({ payment })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/checkPayment',async (req, res) => {
    
    try {
        const options = {
            method: 'GET',
            uri: "https://edge.qiwi.com/payment-history/v2/persons/380732220020/payments?rows=50",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer fdd8dd2616a0c75a06d22a96979a83b2'
            },
            //body: {},//request.data,
            json: true // Automatically stringifies the body to JSON
        };
         
        rp(options)
            .then(async function (parsedBody) {
                const {paymentId, userId, strategyId} = req.body
                const payment = await Payment.findOne({"transactionId": paymentId}).lean().exec()
                if(parsedBody.data.length>0){
                    for(let i in parsedBody.data){
                        if(paymentId===parsedBody.data[i].comment){
                            if(parsedBody.data[i].status==="SUCCESS" 
                                    && parsedBody.data[i].type==="IN"
                                    && parsedBody.data[i].total.amount>=payment.amount
                                    ){
                                        const update = await Payment.updateOne({"transactionId": paymentId},{ $set: {"status": "success"}}).lean().exec()
                                        const u_payment = await Payment.findOne({"transactionId": paymentId}).lean().exec()
                                        const u_strategys = await UserStrategy.findOne({"user_id": userId, "strategy_id": strategyId}).lean().exec()  
                                        if(!u_strategys){
                                            const u_strategy = new UserStrategy({"user_id": userId, "strategy_id": strategyId})
                                            await u_strategy.save()
                                        }
                                        return res.json({ payment: u_payment })          
                            }
                        }
                    }
                    return res.json({ payment })
                } 
                res.json({ payment })               
            })
            .catch(function (err) {
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
            });      
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router