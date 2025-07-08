import mongoose, { Schema } from "mongoose";

const testSchema=new Schema({
    name:{type:String,required:false},

})

const Test=mongoose.model("Test",testSchema);
export default Test;