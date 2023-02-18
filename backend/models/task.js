import mongoose from "mongoose";

const {Schema} = mongoose;


const taskSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:false,
        default:false,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

const Task = mongoose.model('Task',taskSchema);

export default Task;