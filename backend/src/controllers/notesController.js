import Note from "../models/Note.js";

// GET API REQUEST TO FETCH ALL NOTES
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({createdAt:-1}); // -1 for newest first
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching notes");
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).send("Note not found");
        res.status(200).json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error in fetching note by id", message: err.message });
    }
}

// POST API REQUEST TO CREATE A NEW NOTE
export async function createNotes(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content,
            user: req.user._id,
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating note");
    }
}
// PUT API REQUEST TO UPDATE A NOTE
export async function updateNotes(req,res){
    try{
        const {title,content} =req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content },
            { new: true }
        );
        if(!updatedNote){
            return res.status(404).send("Note is not found");
        };
        res.status(200).json(updatedNote);
    }catch(err){
        console.error(err);
        res.status(500).send("Error updating note");
    }
}

// DELETE API REQUEST TO DELETE A NOTE
export async function deleteNotes(req,res){
    try{
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if(!deletedNote) return res.status(404).send("Note id is not found");
        res.status(200).send("Note deleted successfully");
        console.log("Note deleted successfully:", deletedNote);
    }catch(err){
        console.error(err);
        res.status(500).send("Error deleting note");
    }
}
