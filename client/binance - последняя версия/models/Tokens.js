const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  userId:{type: String, required: true, unique: false},
  addtoken:{type: String, required: true, unique: false},
  addcomment:{type: String, required: true, unique: false},
})

module.exports = model('Tokens', schema)