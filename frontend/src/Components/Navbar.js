import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span>FlashCard APP</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout">Log Out</button>
        ) : (
          <>
            <Link to="/login" className="login" onClick={handleLogin}>Log In</Link>
            <Link to="/signup" className="get-started">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
