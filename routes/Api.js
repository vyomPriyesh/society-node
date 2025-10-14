import express from "express";
import UserController from "../controllers/UserController.js";
import AdvertiseController from "../controllers/AdvertiseController.js";
import AuthVerify from "../middleware/AuthVerify.js";
import uploadFileMiddleware from "../middleware/upload.js";
import { folderName } from "../Config.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendResponse } from "../utils/response.js";
import PostionsController from "../controllers/PostionsController.js";
import SocietyController from "../controllers/SocietyController.js";
import BannersController from "../controllers/BannersController.js";
import SosUserController from "../controllers/SosUserController.js";
import SosMemberController from "../controllers/SosMemberController.js";

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

api.post('/register', AuthVerify, UserController.register)
api.post('/login', UserController.login)
api.get('/profile', AuthVerify, UserController.profile)  
api.post('/profile', AuthVerify, UserController.updateProfile)  
api.get('/logout', AuthVerify, UserController.logout)  

api.post('/advertisement', AdvertiseController.allData)  
api.get('/advertisement/:type', AdvertiseController.allDataHome)  
api.post('/advertisement/add', AdvertiseController.add)  
api.post('/advertisement/update/:id', AdvertiseController.update)  
api.get('/advertisement/status/:id', AdvertiseController.updateStatus)  
api.delete('/advertisement/delete/:id', AdvertiseController.delete)  

api.post('/postions', PostionsController.allData)  
api.get('/postions/allpositions', PostionsController.allDataHome)  
api.post('/postions/add', PostionsController.add)  
api.post('/postions/update/:id', PostionsController.update)  
api.get('/postions/status/:id', PostionsController.updateStatus)  
api.delete('/postions/delete/:id', PostionsController.delete)  

api.post('/society', SocietyController.allData)  
api.get('/get-soceity/:slug', SocietyController.slugData)  
api.get('/society/allData', SocietyController.all)  
api.post('/society/add', SocietyController.add)  
api.get('/society/view/:id', SocietyController.getData)  
api.post('/society/update/:id', SocietyController.update)  
api.get('/society/status/:id', SocietyController.updateStatus)  
api.delete('/society/delete/:id', SocietyController.delete)  

api.post('/society/user-add', SosUserController.addSosUser)  
api.post('/society/user-update/:id', SosUserController.updateUpdate)  
api.get('/society/user-status/:id', SosUserController.updateStatus)  
api.post('/society/user-password/:id', SosUserController.passwordUpdate)  
api.delete('/society/user-delete/:id', SosUserController.userDelete)  

api.post('/society/member-add', SosMemberController.addSosMember)  
api.post('/society/member-update/:id', SosMemberController.updateUpdate)  

api.post('/banner', BannersController.allData)  
api.get('/banners', BannersController.all)  
api.post('/banner/add', BannersController.add)  
api.post('/banner/update/:id', BannersController.update)  
api.get('/banner/status/:id', BannersController.updateStatus)  
api.delete('/banner/delete/:id', BannersController.delete)  

export default api;
