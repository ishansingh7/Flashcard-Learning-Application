
import { Link } from "react-router-dom"; // Import Link
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (


    <nav className="navbar">
      <div className="logo">
        {/* <img src="your-logo.png" alt="Brainscape Logo" /> */}
        <span>FlashCard APP</span>
      </div>
      <ul className="nav-links"> {/* Changed to ul for proper CSS targeting */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="auth-buttons">
        <Link to="/login" className="login">Log In</Link>
        <Link to="/signup" className="get-started">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;

