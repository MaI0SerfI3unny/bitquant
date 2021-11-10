const { Router } = require('express')
const User = require('../models/User')
const TradesModel = require('../models/trades.model')
const router = Router()

router.post('/getHistory', async (req, res) => {
    try {
        const {id, from, to, trade_type} = req.body
        console.log(req.body)
        const trades = await TradesModel.find({"id": id, "trade_type": trade_type, "transaction_time":{$gte: from, $lt: to}}).lean().exec()
        if(trades){
            return res.json({history: trades })
        }
        else res.status(200).json({history: [] })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})





router.post('/addToken', async (req, res) => {
    try {
        const {userId, addtoken, addcomment} = req.body
        const candidate = await Tokens.findOne({ "addtoken": addtoken }).lean().exec()

        if (candidate) {
            return res.status(400).json({ message: 'Такой токен уже добавлен' })
        }

        const token = new Tokens({ userId, addtoken, addcomment})

        await token.save()
        const tokens = await Tokens.find({userId}).lean().exec()
        if(tokens){
            return res.json({ tokens })
        }
        else res.status(200).json({ tokens: [] })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/getTokens', async (req, res) => {
    try {
        const {userId} = req.body
        const tokens = await Tokens.find({userId}).lean().exec()
        if(tokens){
            return res.json({ tokens })
        }
        else res.status(200).json({ tokens: [] })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/delToken', async (req, res) => {
    try {
        const {userId, id} = req.body
        const del = await Tokens.deleteOne({"_id": id}).lean().exec()
        const tokens = await Tokens.find({userId}).lean().exec()
        if(tokens){
            return res.json({ tokens })
        }
        res.status(200).json({ tokens: [] })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
module.exports = router