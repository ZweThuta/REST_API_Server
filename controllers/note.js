const { validationResult } = require("express-validator");
const Note = require("../models/node");

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
