import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    // const notes = await Note.find();
    const notes = await Note.find().sort({createdAt: -1});//gives the last created note first
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error in get all notes", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const findNote = await Note.findById(req.params.id);
    if(!findNote){
        res.status(404).json({message:"Note not found"});
    }
    res.status(200).json(findNote);
  } catch (err) {
    console.error("Error in get note by id", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error("Error in create notes", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!note) {
      res.status(400).json({ message: "Note not Found" });
    }
    res.status(200).json(note);
  } catch (err) {
    console.error("Error in update notes", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNotes = async (req, res) => { //We added _ to indicate that we are not using the req parameter in this function. This is a common convention in JavaScript to indicate that a parameter is intentionally unused.
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(400).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted Successfully" });
  } catch (err) {
    console.error("Error in delete notes", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
