import { Schema, models, model} from "mongoose";

const UserSchema =  new Schema(
    {
    name: {
        type: String,
        required: true
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
export default User;