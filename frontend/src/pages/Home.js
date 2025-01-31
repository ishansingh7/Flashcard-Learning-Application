import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Home.css"; 

const Home = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const userId = localStorage.getItem("userId"); // Retrieve logged-in user's ID

  useEffect(() => {
    fetchUserFlashcards();
  }, []);

  const fetchUserFlashcards = async () => {
    if (!userId) return; // Ensure user is logged in
    try {
      const response = await axios.get(`http://localhost:8081/api/flashcards/${userId}`);
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching user flashcards:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !description) {
      alert("All fields are required!");
      return;
    }

    try {
      const newFlashcard = { title, author, description, userId };
      const response = await axios.post("http://localhost:8081/api/flashcards", newFlashcard);

      if (response.status === 201) {
        setFlashcards([...flashcards, response.data.flashcard]);
        setTitle("");
        setAuthor("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding flashcard:", error);
      alert("Failed to add flashcard.");
    }
  };

  return (
    <div >
      <h2>Create a Flashcard</h2>
      <form onSubmit={handleSubmit} className="flashcard-form">
        <input
          type="text"
          placeholder="Flashcard Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"  // Increased the default size
          required
        />
        <button type="submit">Add Flashcard</button>
      </form>

      <h2>Your Flashcards</h2>
      {flashcards.length === 0 ? (
        <p>No flashcards found</p>
      ) : (
        <div className="flashcards-grid">
          {flashcards.map((flashcard) => (
            <div key={flashcard._id} className="flashcard">
              <h3>{flashcard.title}</h3>
              <p>{flashcard.description}</p>
              <small>By: {flashcard.author}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
