import Users from "../models/Users.js";
import bcryptjs from "bcryptjs";
import { catchAsync } from "../utils/catchAsync.js";
import { sendResponse } from "../utils/response.js";
import { generateToken } from "../utils/jwt.js";

class UserController {

    static register = catchAsync(async (req, res) => {

        if (req.user.role !== 'superadmin') {
            return sendResponse(res, 422, 'Access denied', false)
        }
        const data = req.body;

        data.password = await bcryptjs.hash(data?.password, 10);
        const added = await Users.create(data)

        return sendResponse(res, 200, 'added', true, added)

    })

    static login = catchAsync(async (req, res) => {

        const { mobile, password } = req.body

        const user = await Users.findOne({ mobile: mobile }).select("-login_devices").lean()

        if (!user) {
            return sendResponse(res, 422, 'Credentials Not or Mobile No not valid', false)
        }

        const hash = await bcryptjs.compare(password, user?.password)
        if (!hash) {
            return sendResponse(res, 422, 'Password Invalid', false)
        }

        user.token = generateToken(user)
        delete user.password
        await Users.findOneAndUpdate({ mobile }, { $push: { login_devices: user?.token } })

        return sendResponse(res, 200, 'Login SuccessFull', true, user)
    })

    static profile = catchAsync(async (req, res) => {

        const user = await Users.findById({ _id: req.user.id }).select("-password -login_devices")
        return sendResponse(res, 200, 'Profile Found', true, user)
    })

    static get = catchAsync(async (req, res) => {

        return sendResponse(res, 200, 'get', true)
    })
}

export default UserController;