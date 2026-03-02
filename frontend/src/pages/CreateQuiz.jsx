import { useState } from "react";
import axios from "axios";

export default function CreateQuiz() {

  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    }
  ]);

  const [loading, setLoading] = useState(false);

  // handle question change
  const handleQuestionChange = (index, value) => {
    const newQ = [...questions];
    newQ[index].question = value;
    setQuestions(newQ);
  };

  // handle option change
  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQ = [...questions];
    newQ[qIndex].options[optIndex] = value;
    setQuestions(newQ);
  };

  // handle correct answer
  const handleCorrectAnswer = (index, value) => {
    const newQ = [...questions];
    newQ[index].correctAnswer = Number(value);
    setQuestions(newQ);
  };

  // add new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double click

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/quiz",
        { title, questions },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Quiz Created Successfully");

      setTitle("");
      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0
        }
      ]);

    } catch (err) {
      alert("Error Creating Quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Create Quiz</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="question-block">

              <input
                placeholder={`Question ${qIndex + 1}`}
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(qIndex, e.target.value)
                }
              />

              {q.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, optIndex, e.target.value)
                  }
                />
              ))}

              <input
                type="number"
                placeholder="Correct Option Index (0-3)"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswer(qIndex, e.target.value)
                }
              />

              <hr />

            </div>
          ))}

          <button type="button" onClick={addQuestion}>
            + Add Another Question
          </button>

          <br /><br />

          <button type="submit" disabled={loading}>
            {loading ? "Saving Quiz..." : "Create Quiz"}
          </button>

        </form>

      </div>
    </div>
  );
}