import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose

const PostionsSchema = new Schema(
    {
        name: { type: String },
        status: { type: Boolean, default: true }
     },
    {
        timestamps: true
    }
)


PostionsSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
const Postions = mongoose.model("Postions", PostionsSchema);
export default Postions;