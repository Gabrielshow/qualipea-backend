const { Schema, models, model} = require("mongoose");

const UserSchema =  new Schema(
    {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 10,
        max: 80
    }
},
    { timestamps: true}
)
const User = models.User || model('User', UserSchema);
module.exports User;