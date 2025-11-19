import { useState } from "react";
import "./App.css";

import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of India?",
      answer: "New Delhi",
      subject: "Geography",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      answer: "4",
      subject: "Mathematics",
      difficulty: "easy",
    },
  ]);

  const handleLogin = (type, email) => {
    setUserType(type);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType("");
    setUserEmail("");
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : userType === "teacher" ? (
        <TeacherDashboard
          userEmail={userEmail}
          onLogout={handleLogout}
          questions={questions}
          setQuestions={setQuestions}
        />
      ) : (
        <StudentDashboard
          userEmail={userEmail}
          onLogout={handleLogout}
          questions={questions}
        />
      )}
    </>
  );
}
