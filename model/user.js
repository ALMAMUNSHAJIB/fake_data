const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,


    },
    country: {
        type: String,
        required: true,
        trim: true

    },
    password: {
        type: String,
        trim: true,

    },

    devices: {
        type: String,
        default: 'android'
    },


    role: {
        type: String,
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

},

    {
        timestemps: true
    }
)



const UserD = model('UserD', userSchema);
module.exports = UserD;
