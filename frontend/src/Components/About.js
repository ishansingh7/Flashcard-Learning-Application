import React from "react";
import "./About.css";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Flashcard Learning App</h1>
      <p>
        Our Flashcard Learning App is designed to help students and professionals
        memorize and learn new concepts efficiently. With an easy-to-use interface
        and customizable flashcards, learning has never been easier!
      </p>
      
      <h2>Developer Information</h2>
      <div className="developer-info">
        <p><strong>Name:</strong> Ishan Singh</p>
        <p><strong>Role:</strong> Full Stack Developer</p>
        <p><strong>Email:</strong> helloishansingh@gmail.com</p>
      </div>
      
      <h2>Follow Us</h2>
      <div className="social-links">
        <a href="https://twitter.com/johndoe" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="social-icon" /> Twitter
        </a>
        <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">
          <FaGithub className="social-icon" /> GitHub
        </a>
        <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="social-icon" /> LinkedIn
        </a>
      </div>
    </div>
  );
};

export default About;
