import { catchAsync } from "../utils/catchAsync.js";
import bcryptjs from "bcryptjs";
import { sendResponse } from "../utils/response.js";
import Users from "../models/Users.js";

class SosMemberController {

    static addSosMember = catchAsync(async (req, res) => {

        const data = req.body
        data.user_type = 'member'
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
}

export default SosMemberController;