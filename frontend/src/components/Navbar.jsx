import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2 className="logo">QuizApp</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/quizzes">Quizzes</Link>
        <Link to="/create">Create Quiz</Link>

        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}

        {token && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

    </nav>
  );
}