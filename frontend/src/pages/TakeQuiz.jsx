import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Quiz.css";

export default function TakeQuiz() {

  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {

    const savedAttempt = localStorage.getItem(`quiz_${id}`);

    if (savedAttempt) {
      const data = JSON.parse(savedAttempt);
      setSelectedAnswers(data.answers);
      setScore(data.score);
      setSubmitted(true);
    }

    axios.get(`http://localhost:5000/api/quiz/${id}`)
      .then(res => setQuiz(res.data))
      .catch(err => console.log(err));

  }, [id]);

  const handleOptionClick = (qIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [qIndex]: optionIndex
    });
  };

  const handleSubmit = () => {

  if (submitted) return;

  let total = 0;

  quiz.questions.forEach((q, index) => {
    if (selectedAnswers[index] === q.correctAnswer) {
      total++;
    }
  });

  setScore(total);
  setSubmitted(true);

  // Save attempt locally
  localStorage.setItem(`quiz_${id}`, JSON.stringify({
    answers: selectedAnswers,
    score: total
  }));
};

  if (!quiz) return <h2 className="center">Loading...</h2>;
  return (
    <div className="container">
      <div className="card quiz-container">

        <h2 className="quiz-title">{quiz.title}</h2>

        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} className="question-block">

            <h4 className="question-text">
              {qIndex + 1}. {q.question}
            </h4>

            <div className="options">
              {q.options.map((opt, optIndex) => (
                <button
                  key={optIndex}
                  disabled={submitted}
                  className={`option-btn ${selectedAnswers[qIndex] === optIndex ? "selected" : ""
                    }`}
                  onClick={() => handleOptionClick(qIndex, optIndex)}
                >
                  {opt}
                </button>
              ))}
            </div>

          </div>
        ))}

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={submitted}
        >
          {submitted ? "Already Submitted" : "Submit Quiz"}
        </button>

        {score !== null && (
          <h3 className="score">
            Your Score: {score} / {quiz.questions.length}
          </h3>
        )}

      </div>
    </div>
  );
}