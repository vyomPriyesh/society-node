import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose

const BannersSchema = new Schema(
    {
        society_id: { type: Schema.Types.ObjectId, ref: "Society" },
        name: { type: String },
        image: { type: String },
        url: { type: String },
        status: { type: Boolean, default: true }
     },
    {
        timestamps: true
    }
)


BannersSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
const Banners = mongoose.model("Banners", BannersSchema);
export default Banners;