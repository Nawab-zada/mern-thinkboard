import { Note } from "../model/note.js";    


export  const  getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }











}
export const createNote = async(req, res) => {
    try{
        const { title, content } = req.body;
        const note = await Note.create({ title, content });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findById(req.params.id);

        if (note) {
            note.title = title || note.title;
            note.content = content || note.content;

            const updatedNote = await note.save();
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (note) {
            res.status(200).json({ message: "Note removed" });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const patchNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findById(req.params.id);

        if (note) {
            if (title !== undefined) note.title = title;
            if (content !== undefined) note.content = content;

            const updatedNote = await note.save();
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};   