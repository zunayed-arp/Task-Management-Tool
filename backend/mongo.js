import express from "express";
import mongoose from "mongoose";
import "dotenv/config";


const connectDB =  async () =>{
try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Mongodb connected');
} catch (error) {
    console.log(error)
    process.exit(1);
}
}

export default connectDB;