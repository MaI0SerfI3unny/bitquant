const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    user_id: {type: String, required: true, default: ""},
    strategy_id: {type: String, required: true, default: ""},
    date: {type: Date, required: true, default: Date.now},
})

module.exports = model('UserStrategy', schema)