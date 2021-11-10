const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  secret: {type: String, required: true},
  email: {type: String, required: true},
})

module.exports = model('Recovery', schema)
