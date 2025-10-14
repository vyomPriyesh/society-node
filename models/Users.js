import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const userSchema = new Schema(

    {
        designation: { type: Schema.Types.ObjectId, ref: "Postions" },
        society_id: { type: Schema.Types.ObjectId, ref: "Society" },
        maintance_collector: { type: Schema.Types.ObjectId, ref: "Users" },
        name: { type: String },
        mobile: { type: String, unique: true },
        email: { type: String },
        role: { type: String },
        floor: { type: String },
        ghar_no: { type: String },
        user_type: { type: String },
        image: { type: String },
        wings: { type: String },
        password: { type: String },
        login_devices: [{ type: String }],
        status: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

userSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
const Users = mongoose.model("Users", userSchema);
export default Users;