const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true, unique: false},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  binanceId: {type: String, required: true},
  date: {type: Date, required: true, default: Date.now},
})

module.exports = model('User', schema)
