import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Quiz.css";

export default function QuizList() {

  const [quizzes, setQuizzes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (token) {
      axios.get("http://localhost:5000/api/quiz")
        .then(res => setQuizzes(res.data))
        .catch(err => console.log(err));
    }

  }, [token]);

  // 🚨 If not logged in
  if (!token) {
    return (
      <div className="container">
        <div className="card auth-warning">

          <h2>Please Login First</h2>

          <p>
            You must login or register to take quizzes.
          </p>

          <br />

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <br /><br />

          <Link to="/register">
            <button className="register-btn">
              Register
            </button>
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="container">

      <h2>Available Quizzes</h2>

      {quizzes.map((quiz) => (
        <div key={quiz._id} className="card quiz-card">
          <h3>{quiz.title}</h3>

          <Link to={`/quiz/${quiz._id}`}>
            <button>Take Quiz</button>
          </Link>

        </div>
      ))}

    </div>
  );
}