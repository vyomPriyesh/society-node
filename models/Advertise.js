import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const AdvertiseSchema = new Schema(

    {
        name: { type: String },
        url: { type: String },
        type: { type: String },
        image: { type: String },
        status: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

AdvertiseSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
const Advertise = mongoose.model("Advertise", AdvertiseSchema);
export default Advertise;