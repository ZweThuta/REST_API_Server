const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const noteController = require("../controllers/note");

router.get("/notes", noteController.getNotes);

router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title is too short.")
      .isLength({ max: 30 })
      .withMessage("Title is too long."),

    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Content is too short."),
  ],
  noteController.createNote
);
router.get("/notes/:id", noteController.getNote);

router.delete("/delete/:id", noteController.deleteNote);

router.get("/edit/:id", noteController.getOldNote);

router.post("/edit", noteController.updateNote);

module.exports = router;
