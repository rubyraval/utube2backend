const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
name: {type :String},
email:{type: String},
password :{type: String},
email_verify_at : {
    type: Date,
    default: null
},
otp: {
    type:Number,
    default: null
},
status : {type : Number,
default: 0
}

},

{
    timestamps: true
})

const UserModel = mongoose.model('users',UserSchema)
module.exports = UserModel;