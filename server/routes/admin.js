import express from "express";
import { login, getUsers } from "../controllers/admin.js";

const router = express.Router();

router.post("/login", login);

router.get("/getUsers", getUsers); 

export default router;