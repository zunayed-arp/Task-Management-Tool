import express from "express";
import taskRoutes from "./task";
import authRoutes from "./auth";
import usersRoutes from "./auth";

const router = express.Router();

router.use('/auth',authRoutes);
router.use('/tasks',taskRoutes);
router.use('/users',usersRoutes);


export default router;



