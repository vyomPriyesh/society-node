import express from "express";
import UserController from "../controllers/UserController.js";
import AuthVerify from "../middleware/AuthVerify.js";
import uploadFileMiddleware from "../middleware/upload.js";
import { folderName } from "../Config.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendResponse } from "../utils/response.js";

const api = express.Router();

api.post('/images/upload', catchAsync(async (req, res) => {
    await uploadFileMiddleware(req, res);
    if (req?.files?.length === 0) {
        return sendResponse(res, 400, 'Please upload at least one file!', false);
    }
    const filenames = req.files.map(file => file.filename);
    const formattedImages = filenames.map(filename => `/${folderName}/${filename}`);
    return sendResponse(res, 200, 'Files uploaded successfully!', true, formattedImages);
}));

api.get('', UserController.get)
api.post('/register', AuthVerify, UserController.register)
api.post('/login', UserController.login)
api.get('/profile', AuthVerify, UserController.profile) 

export default api;
