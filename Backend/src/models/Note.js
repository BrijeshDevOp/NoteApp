import mongoose from "mongoose";

//  SCHEMA

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    }
},{ timestamps: true } // Required by Mongoose to create createdAt/updatedAt fields properly
);

// MODEL

const Note = mongoose.model("Note",noteSchema);

export default Note;