"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradesSchema = new Schema({
    id: String,
    action: {
        type: String, default: ""
    },
    type: {
        type: String, default: ""
    },
    amount: {
        type: Number, default: 0
    },
    transaction_time: {
        type: Number, default: 0
    },
    symbol: {
        type: String, default: ""
    },
    contract_id: {
        type: Number, default: 0
    },
    trade_type: {
        type: String, default: ""
    },
}, {
    versionKey: false,
    collection: "TradesCollection"
});

/*UsersSchema.pre('save', function(next) {
    if(this.isModified('password') || this.isNew()) this.password = bcrtypt.hashSync(this.password, 12);
    next();
});*/

module.exports = mongoose.model('TradesModel', TradesSchema);