import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { log } from './index';

const connectDB =  async () =>{
try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    log('Mongodb connected');
} catch (error) {
    log(err)
    process.exit(1);
}
}

export default connectDB;