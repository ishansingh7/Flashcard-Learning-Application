import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import RefreshHandler from './welcome Pages/RefreshHandler';
import Navbar from './Components/Navbar';
import Welcome from './Components/Welcome';
import Home from './pages/Home';
import About from './Components/About';
import Login from './pages/Login';
import Contact from './Components/Contact';
import Signup from './pages/Signup';
import Footer from './Components/Footer';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute component to protect routes that require authentication
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
       
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
