import express from "express";
import taskRoutes from "./task";
import authRoutes from "./auth";
import usersRoutes from "./auth";
import checkAuth from "../utils/checkAuth";

const router = express.Router();

router.use('/auth',authRoutes);
router.use('/tasks',checkAuth,taskRoutes);
router.use('/users',checkAuth,usersRoutes);


export default router;



