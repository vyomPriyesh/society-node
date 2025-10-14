import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose

const SocietySchema = new Schema(
    {
        name: { type: String },
        slug: { type: String },
        pincode: { type: String },
        soc_type: { type: String },
        amount: { type: String },
        person_name: { type: String },
        person_mobile: { type: String },
        address: { type: String },
        wings: { type: String },
        status: { type: Boolean, default: true }
     },
    {
        timestamps: true
    }
)


SocietySchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
const Society = mongoose.model("Society", SocietySchema);
export default Society;