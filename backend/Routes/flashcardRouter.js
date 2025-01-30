const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const flashcardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// Middleware for parsing JSON
router.use(express.json());

// Create a flashcard
router.post("/flashcards", async (req, res) => {
  try {
    const { title, author, description } = req.body;

    if (!title || !author || !description) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const flashcard = new Flashcard({ title, author, description });
    await flashcard.save();

    res.status(201).json({ message: "Flashcard added successfully!", flashcard });
  } catch (error) {
    console.error("Error adding flashcard:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Fetch all flashcards
router.get("/flashcards", async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
