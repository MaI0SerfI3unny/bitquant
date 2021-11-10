const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  payer: {type: String, required: true},
  transactionId: {type: String, required: true},
  merch: {type: String, required: true},
  amount: {type: Number, required: true, default: 0},
  status:{type: String, required: true, default: "wait"},
  strategyId:{type: String, required: true},
})

module.exports = model('Payment', schema)
