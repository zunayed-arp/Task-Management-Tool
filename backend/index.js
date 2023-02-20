import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./mongo";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index";
import handleError from './utils/errors';

const PORT = process.env.PORT || 8000;

const app = express();

//middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api", allRoutes);

//error
app.use((err,req,res)=>{
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).send({'message':message,'stack':err.stack});
})

// export const log = (msg) => console.log(msg);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});
