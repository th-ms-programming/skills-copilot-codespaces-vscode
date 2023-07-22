// Create web server

// Import modules
const express = require("express");
const router = express.Router();
const db = require("../models");
const Comment = db.Comment;

// Create comment
router.post("/", async (req, res) => {
  try {
    const { author, text, article } = req.body;
    const comment = await Comment.create({
      author,
      text,
      article,
    });
    res.status(201).json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json({
      status: "success",
      data: comments,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Get single comment
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Update comment
router.patch("/:id", async (req, res) => {
  try {
    const comment = await Comment.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Delete comment
router.delete("/:id", async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;