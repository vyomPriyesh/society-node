import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const userSchema = new Schema(

    {
        name: { type: String },
        mobile: { type: String, unique: true },
        email: { type: String },
        role: { type: String },
        password: { type: String },
        login_devices: [{ type: String }],
    },
    {
        timestamps: true
    }
)

userSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
const Users = mongoose.model("Users", userSchema);
export default Users;