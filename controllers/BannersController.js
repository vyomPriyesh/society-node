import Banners from "../models/Banners.js"
import { catchAsync } from "../utils/catchAsync.js"
import paginate from "../utils/pagination.js"
import { sendResponse } from "../utils/response.js"

class BannersController {

    static add = catchAsync(async (req, res) => {

        const data = req.body

        const added = await Banners.create(data)

        return sendResponse(res, 200, 'Added', true, added)
    })


    static allData = catchAsync(async (req, res) => {

        const { page, limit } = req.body || {}

        const data = await paginate(Banners, null, page, limit)
        return sendResponse(res, 200, 'All', true, data)
    })

    static all = catchAsync(async (req, res) => {

        const data = await Banners.find({ status: true })
        return sendResponse(res, 200, 'All', true, data)
    })

    static update = catchAsync(async (req, res) => {

        const { id } = req.params
        const data = req.body

        const updated = await Banners.findByIdAndUpdate(id, data, { new: true })

        return sendResponse(res, 200, 'Updated', true, updated)

    })

    static updateStatus = catchAsync(async (req, res) => {

        const { id } = req.params

        const find = await Banners.findById(id)

        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Banners.findByIdAndUpdate(id, { status: !find?.status }, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)

    })

    static delete = catchAsync(async (req, res) => {
        const { id } = req.params

        const deleted = await Banners.delete({ _id: id })

        return sendResponse(res, 200, 'Deleted', true)

    })

}

export default BannersController;