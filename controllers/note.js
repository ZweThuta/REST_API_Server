const { validationResult } = require("express-validator");
const Note = require("../models/node");
const {unlink} = require("../utils/unlink");

exports.getNotes = (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      return res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Can't found!",
      });
      console.log(err);
    });
};

exports.createNote = (req, res, next) => {
  const { title, content } = req.body;
  const cover_image = req.file;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation fail.",
      errorMessage: errors.array(),
    });
  }

  Note.create({
    title,
    content,
    cover_image:cover_image?cover_image.path : "",
  })
    .then((_) => {
      return res.status(201).json({
        message: "Note created.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something wrong!",
      });
    });
};

exports.getNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something wrong!",
      });
    });
};

exports.deleteNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id).then(note =>{
    unlink(note.cover_image)
    return Note.findByIdAndDelete(id)
    .then((_) => {
      return res.status(204).json({
        message: "Note deleted",
      });
    })
  })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something wrong!",
      });
    });
};

exports.getOldNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something wrong!",
      });
    });
};

exports.updateNote = (req, res, next) => {
  const { noteId, title, content } = req.body;
  const cover_image = req.file;
  Note.findById(noteId)
    .then((note) => {
      note.title = title;
      note.content = content;
      if(cover_image){
        unlink(note.cover_image)
        note.cover_image = cover_image.path;
      }
      return note.save();
    })
    .then((_) => {
      res.status(200).json({
        message: "Save successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something wrong!",
      });
    });
};
