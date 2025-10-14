import Postions from "../models/Postions.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { sendResponse } from "../utils/response.js";

class PostionsController {

    static allData = catchAsync(async (req, res) => {

        const { page, limit } = req.body || {}

        const data = await paginate(Postions, null, page, limit)
        return sendResponse(res, 200, 'All', true, data)
    })

    static allDataHome = catchAsync(async (req, res) => {

        const data = await Postions.find({ status: true })

        return sendResponse(res, 200, 'All', true, data)

    })

    static add = catchAsync(async (req, res) => {

        const data = req.body

        const added = await Postions.create(data)

        return sendResponse(res, 200, 'Added', true, added)
    })

    static updateStatus = catchAsync(async (req, res) => {

        const { id } = req.params

        const find = await Postions.findById(id)

        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Postions.findByIdAndUpdate(id, { status: !find?.status }, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)

    })

    static delete = catchAsync(async (req, res) => {
        const { id } = req.params

        const deleted = await Postions.delete({ _id: id })

        return sendResponse(res, 200, 'Deleted', true)

    })

    static update = catchAsync(async (req, res) => {
        const { id } = req.params
        const data = req.body

        const find = await Postions.findById(id)

        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Postions.findByIdAndUpdate(id, data, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)
    })

}

export default PostionsController;