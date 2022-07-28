const { date } = require('faker/lib/locales/az');
const { Schema, model, Types } = require('mongoose');

const activeUserSchema = Schema({
    users: {
        type: Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String
    }

},
    {
        timestemps: true
    });


const ActiveUser = model('ActiveUser', activeUserSchema)
module.exports = ActiveUser;