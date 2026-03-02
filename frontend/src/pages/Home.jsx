import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">

      <div className="home-card">

        <h1 className="home-title">
          🧠 Online Quiz Maker
        </h1>

        <p className="home-desc">
          Create, share and take quizzes easily.  
          This platform allows users to build their own quizzes by adding
          questions, multiple-choice answers and correct options.
          Other users can attempt quizzes and get instant feedback on
          their performance.
        </p>

        <div className="home-features">

          <div className="feature">
            ✔ Create custom quizzes
          </div>

          <div className="feature">
            ✔ Attempt quizzes anytime
          </div>

          <div className="feature">
            ✔ Instant score feedback
          </div>

          <div className="feature">
            ✔ Multiple question support
          </div>

        </div>

        <div className="home-buttons">

          <Link to="/quizzes">
            <button className="take-btn">
              Take a Quiz
            </button>
          </Link>

          <Link to="/create">
            <button className="create-btn">
              Create a Quiz
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}