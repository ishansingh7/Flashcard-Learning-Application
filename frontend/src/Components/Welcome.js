import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Welcome.css"; // Import CSS file

function Welcome() {
  const [flashcards, setFlashcards] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/flashcards");
        setFlashcards(response.data.reverse()); // Show latest flashcards first
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, []);

  const handleReadMore = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Filter flashcards based on search term
  const filteredFlashcards = flashcards.filter((flashcard) =>
    flashcard.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="main-title">Flashcard Information</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by author..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Latest Flashcards Section */}
      <h2 className="section-title">Latest Added Flashcards</h2>
      <div className="flashcards-grid">
        {filteredFlashcards.length === 0 ? (
          <p className="no-data">No flashcards available</p>
        ) : (
          filteredFlashcards.slice(0, 3).map((flashcard) => (
            <div key={flashcard._id} className="flashcard">
              <div className="flashcard-header">{flashcard.title}</div>
              <div className="flashcard-content">
                <p className="author-name">By {flashcard.author}</p>
                <p className="flashcard-description">
                  {expandedCard === flashcard._id
                    ? flashcard.description
                    : `${flashcard.description.substring(0, 100)}...`}
                </p>
                <button className="read-more" onClick={() => handleReadMore(flashcard._id)}>
                  {expandedCard === flashcard._id ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* All Flashcards Section */}
      <h2 className="section-title">All Flashcards</h2>
      <div className="flashcards-grid">
        {filteredFlashcards.length > 3 &&
          filteredFlashcards.slice(3).map((flashcard) => (
            <div key={flashcard._id} className="flashcard">
              <div className="flashcard-header">{flashcard.title}</div>
              <div className="flashcard-content">
                <p className="author-name">By {flashcard.author}</p>
                <p className="flashcard-description">
                  {expandedCard === flashcard._id
                    ? flashcard.description
                    : `${flashcard.description.substring(0, 100)}...`}
                </p>
                <button className="read-more" onClick={() => handleReadMore(flashcard._id)}>
                  {expandedCard === flashcard._id ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Welcome;
