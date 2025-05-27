import Note from "../models/Model.js";

// GET
async function getNotes(req, res) {
    try {
        const notes = await Note.findAll();  // Mengambil semua data catatan
        res.status(200).json(notes);  // Mengirimkan data catatan ke frontend
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Gagal mengambil data catatan', error: error.message });
    }
}

// CREATE
async function createNote(req, res) {
  try {
    const inputResult = req.body;
    await Note.create(inputResult);
    res.status(201).json({ msg: "Noted kak" });
  } catch (error) {
    console.log(error.message);
  }
}

async function updateNote(req, res) {
  try {
    const inputResult = req.body;
    await Note.update(inputResult, {
      where: { id: req.params.id },
    });
    res.status(201).json({ msg: "Note Updated" });
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteNote(req, res) {
  try {
    await Note.destroy({ where: { id: req.params.id } });
    res.status(201).json({ msg: "Note Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

export { getNotes, createNote, updateNote, deleteNote };
