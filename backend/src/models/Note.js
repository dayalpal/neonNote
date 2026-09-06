import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
   {
    title :{
        type : String ,
        required : true 
    },
    content :{
        type : String ,
        required : true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   },
   { timestamps : true} // Created at and updated at fields will be automatically added to the schema
);

const Note = mongoose.model("Note", noteSchema);

export default Note;