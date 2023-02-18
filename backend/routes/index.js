import express from "express";
import taskRoutes from "./task";

const router = express.Router();

router.use('/auth',authRoutes);
router.use('/tasks',taskRoutes);
router.use('/users',userRoutes);


export default router;



