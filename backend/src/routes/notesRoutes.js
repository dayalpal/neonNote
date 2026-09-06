import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import { getAllNotes, createNotes, updateNotes, deleteNotes, getNoteById } from '../controllers/notesController.js';

router.use(auth);

router.get("/get", getAllNotes);
router.get("/get/:id", getNoteById);
router.post("/create", createNotes);
router.put("/update/:id", updateNotes);
router.delete("/delete/:id", deleteNotes);

export default router;