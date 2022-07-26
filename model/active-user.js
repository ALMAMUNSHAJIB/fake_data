const { Schema, model, Types } = require('mongoose');

const activeUserSchema = Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'user'
    },
    data: {
        type: String,
        required: ['Kindly enter your Report']
    },
    created: {
        type: Date,
        default: Date.now
    }

},
    {
        timestemps: true
    });


const ActiveUser = model('ActiveUser', activeUserSchema)
module.exports = ActiveUser;