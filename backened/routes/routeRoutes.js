import express from "express";
const router = express.Router()
import { getNotes } from "../controller/notescontroller.js";
import { getNoteById } from "../controller/notescontroller.js";
import { updateNote } from "../controller/notescontroller.js";
import { deleteNote } from "../controller/notescontroller.js";
import { createNote } from "../controller/notescontroller.js";
import { patchNote } from "../controller/notescontroller.js";

router.get("/", getNotes);
router.post ("/", createNote);
router.get ("/:id", getNoteById);
router.put ("/:id", updateNote);
router.patch ("/:id", patchNote);
router.delete ("/:id", deleteNote);


export default router;
