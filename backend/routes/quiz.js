import express from "express";
import Quiz from "../models/Quiz.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// create quiz
router.post("/", auth, async (req, res) => {

  const quiz = await Quiz.create({
    title: req.body.title,
    questions: req.body.questions,
    createdBy: req.userId,
  });

  res.json(quiz);
});

// get all quizzes
router.get("/", async (req, res) => {

  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// get single quiz
router.get("/:id", async (req, res) => {

  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});

export default router;