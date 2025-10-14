import { catchAsync } from "../utils/catchAsync.js";
import bcryptjs from "bcryptjs";
import { sendResponse } from "../utils/response.js";
import Users from "../models/Users.js";


class SosUserController {

    static addSosUser = catchAsync(async (req, res) => {

        const data = req.body
        data.password = await bcryptjs.hash(data?.password, 10);
        data.role = 'admin'
        data.user_type = 'user'
        const added = await Users.create(data)

        return sendResponse(res, 200, 'added', true, added)
    })

    static updateUpdate = catchAsync(async (req, res) => {
        const { id } = req.params

        const data = req.body
        delete data.password
        const find = await Users.findById(id)
        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Users.findByIdAndUpdate(id, data, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)

    })

    static passwordUpdate = catchAsync(async (req, res) => {
        const { id } = req.params
        const data = req.body
        const find = await Users.findById(id)
        const newPass = await bcryptjs.hash(data?.password, 10);
        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Users.findByIdAndUpdate(id, { password: newPass }, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)
    })

    static updateStatus = catchAsync(async (req, res) => {

        const { id } = req.params

        const find = await Users.findById(id)

        if (!find) {
            return sendResponse(res, 422, 'Not Found', false)
        }

        const update = await Users.findByIdAndUpdate(id, { status: !find?.status }, { new: true })

        return sendResponse(res, 200, 'Status Update', true, update)

    })

    static userDelete = catchAsync(async (req, res) => {

        const { id } = req.params

        const update = await Users.delete({ _id: id })

        return sendResponse(res, 200, 'Deleted', true)

    })

}

export default SosUserController;