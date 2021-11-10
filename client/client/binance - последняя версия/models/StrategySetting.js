const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    user_id: {type: String, required: true, default: ""},
    strategy_id: {type: String, required: true, default: ""},
    parametrs: {type: Object, required: true},
})

module.exports = model('StrategySetting', schema)