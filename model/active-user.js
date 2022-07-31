const { Schema, model, Types } = require('mongoose');

const activeUserSchema = Schema({
    users: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    created: {
        type: String,
        required: [true, 'Please Enter date']
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