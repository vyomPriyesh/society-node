import express from "express";
import UserController from "../controllers/UserController.js";
import AuthVerify from "../middleware/AuthVerify.js";

const api = express.Router();

api.get('', UserController.get)
api.post('/register', AuthVerify, UserController.register)
api.post('/login', UserController.login)
api.get('/profile', AuthVerify, UserController.profile)

export default api;
