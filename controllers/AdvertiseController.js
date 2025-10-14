import Advertise from "../models/Advertise.js";
import { catchAsync } from "../utils/catchAsync.js";
import paginate from "../utils/pagination.js";
import { sendResponse } from "../utils/response.js";

class AdvertiseController {

    static allData = catchAsync(async (req, res) => {

        const { page, limit } = req.body || {}

        const data = await paginate(Advertise, null, page, limit)
        return sendResponse(res, 200, 'All', true, data)
    })

    static allDataHome = catchAsync(async (req, res) => {

        const { type } = req.params

        const data = await Advertise.find({ type: type ? type : null })

        return sendResponse(res, 200, 'All', true, data)

    })

    static add = catchAsync(async (req, res) => {

        const data = req.body

        const added = await Advertise.create(data)

        return sendResponse(res, 200, 'Added', true, added)
    })

    static updateStatus = catchAsync(async (req, res) => {

        const { id } = req.params

        const find = await Advertise.findById(id)

        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Advertise.findByIdAndUpdate(id, { status: !find?.status }, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)

    })

    static delete = catchAsync(async (req, res) => {
        const { id } = req.params

        const deleted = await Advertise.delete({ _id: id })

        return sendResponse(res, 200, 'Deleted', true)

    })

    static update = catchAsync(async (req, res) => {
        const { id } = req.params
        const data = req.body

        const find = await Advertise.findById(id)

        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Advertise.findByIdAndUpdate(id, data, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)
    })
}

export default AdvertiseController;