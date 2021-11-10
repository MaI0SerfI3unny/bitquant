const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    creatorId: {type: String, required: true, unique: false},
    binanceApiKey: {type: String, required: true, unique: false},
    binanceSecret: {type: String, required: true, unique: false},
})

module.exports = model('BinanceKeys', schema)