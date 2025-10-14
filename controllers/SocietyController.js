import Society from "../models/Society.js";
import Users from "../models/Users.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { sendResponse } from "../utils/response.js";

class SocietyController {

    static add = catchAsync(async (req, res) => {

        const data = req.body

        const added = await Society.create(data)

        return sendResponse(res, 200, 'Added', true, added)
    })

    static allData = catchAsync(async (req, res) => {

        const { page, limit } = req.body || {}

        const data = await paginate(Society, null, page, limit)
        return sendResponse(res, 200, 'All', true, data)
    })

    static all = catchAsync(async (req, res) => {

        const data = await Society.find()

        return sendResponse(res, 200, 'All', true, data)

    })

    static getData = catchAsync(async (req, res) => {

        const { id } = req.params

        const data = await Society.findById(id).lean()
        data.users = await Users.find({ society_id: id, user_type: 'user' }).populate("designation", "name")
        data.members = await Users.find({ society_id: id, user_type: 'member' }).populate("maintance_collector", "name").populate("designation", "name")
        return sendResponse(res, 200, 'All', true, data)

    })
    static slugData = catchAsync(async (req, res) => {

        const { slug } = req.params

        const data = await Society.findOne({ slug: slug }).lean()
        console.log(data)
        data.users = await Users.find({ society_id: data?._id, user_type: 'user' }).populate("designation", "name")
        data.members = await Users.find({ society_id: data?._id, user_type: 'member' }).populate("maintance_collector", "name").populate("designation", "name")
        return sendResponse(res, 200, 'All', true, data)

    })

    static update = catchAsync(async (req, res) => {

        const { id } = req.params
        const data = req.body

        const updated = await Society.findByIdAndUpdate(id, data, { new: true })

        return sendResponse(res, 200, 'Updated', true, updated)

    })

    static updateStatus = catchAsync(async (req, res) => {

        const { id } = req.params

        const find = await Society.findById(id)

        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Society.findByIdAndUpdate(id, { status: !find?.status }, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)

    })

    static delete = catchAsync(async (req, res) => {
        const { id } = req.params

        const deleted = await Society.delete({ _id: id })

        return sendResponse(res, 200, 'Deleted', true)

    })



}

export default SocietyController;