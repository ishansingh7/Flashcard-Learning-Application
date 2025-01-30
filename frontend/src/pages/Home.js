import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Home.css"; 

function Home() {
  const [flashcards, setFlashcards] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

  // Fetch flashcards from the backend
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get("http://localhost:8081/flashcards");
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !description) {
      alert("All fields are required!");
      return;
    }

    try {
      const newFlashcard = { title, author, description };
      const response = await axios.post("http://localhost:8081/flashcards", newFlashcard, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setFlashcards([...flashcards, response.data.flashcard]); // Update UI with new flashcard
        setTitle("");
        setAuthor("");
        setDescription("");
      } else {
        console.error("Failed to add flashcard");
      }
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  return (
    <div className="container">
      {/* User Profile Section */}
      <div className="profile-section">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h1>Create a Flashcard</h1>
      <form onSubmit={handleSubmit} className="flashcard-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Flashcard Title"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Flashcard</button>
      </form>

      <h2>Flashcards</h2>
      <div className="flashcards-container">
        {flashcards.length === 0 ? (
          <p>No flashcards available</p>
        ) : (
          flashcards.map((flashcard) => (
            <div key={flashcard._id} className="flashcard">
              <h3>{flashcard.title}</h3>
              <p>{flashcard.description}</p>
              <small>By: {flashcard.author}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
