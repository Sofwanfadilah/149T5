import express from "express";
import { createNote } from '../controllers/NoteController.js';
import verifyToken from "../middleware/AuthMiddleware.js";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/NoteController.js";

const router = express.Router();

router.get("/notes", verifyToken, getNotes);
router.post("/add-note", verifyToken, createNote);
router.put("/edit-note/:id", verifyToken, updateNote);
router.delete("/delete-note/:id", verifyToken, deleteNote);

export default router;
