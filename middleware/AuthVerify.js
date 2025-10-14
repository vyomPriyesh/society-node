import Users from "../models/Users.js";
import { sendResponse } from "../utils/response.js";
import jwt from 'jsonwebtoken';

const AuthVerify = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {

        const token = authHeader.split(" ")[1];

        if (!token) {
            return sendResponse(res, 422, 'Access denied', false)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await Users.findOne({ _id: decoded.id, login_devices: { $in: token } }).select("-password -login_devices")
         if (!user) {
            return sendResponse(res, 422, 'User Not Found', false)
        }
        user.current_token = token
        req.user = user; // Contains payload like user ID, roles, etc.
        next();

    } else {
        return sendResponse(res, 422, 'Invalid token', false)
    }
}

export default AuthVerify
