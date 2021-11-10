const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  refL: {type: String, required: true, unique: true},
  refOn: {type: String, required: true},
})

module.exports = model('Referal', schema)
