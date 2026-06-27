import mongoose from "mongoose";

//Schema of the response of the note
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // Mongoose will automatically add createdAt and updatedAt fields to the schema
);

const Note = mongoose.model("Note", noteSchema)
export default Note;