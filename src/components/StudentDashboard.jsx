import React, { useState } from "react";
import { LogOut, BookOpen } from "lucide-react";
import hero from "../assets/student.jpg";
import bgrnd from "../assets/stu.jpg";

export default function StudentDashboard({ userEmail, onLogout, questions }) {
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [activeColor, setActiveColor] = useState("purple"); // default exam color

  const subjects = [...new Set(questions.map((q) => q.subject))];

  const subjectQuestions = selectedExam
    ? questions
        .filter((q) => q.subject === selectedExam)
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
    : [];

  // STATIC COLOR MAP (Tailwind-SAFE)
  const colorMap = {
    rose: {
      border: "border-rose-300",
      text: "text-rose-600",
      textDark: "text-rose-700",
      bg: "bg-rose-500",
      bgDark: "bg-rose-600",
      tagBg: "bg-rose-100",
    },
    pink: {
      border: "border-pink-300",
      text: "text-pink-600",
      textDark: "text-pink-700",
      bg: "bg-pink-500",
      bgDark: "bg-pink-600",
      tagBg: "bg-pink-100",
    },
    purple: {
      border: "border-purple-300",
      text: "text-purple-600",
      textDark: "text-purple-700",
      bg: "bg-purple-500",
      bgDark: "bg-purple-600",
      tagBg: "bg-purple-100",
    },
    blue: {
      border: "border-blue-300",
      text: "text-blue-600",
      textDark: "text-blue-700",
      bg: "bg-blue-500",
      bgDark: "bg-blue-600",
      tagBg: "bg-blue-100",
    },
    green: {
      border: "border-green-300",
      text: "text-green-600",
      textDark: "text-green-700",
      bg: "bg-green-500",
      bgDark: "bg-green-600",
      tagBg: "bg-green-100",
    },
    teal: {
      border: "border-teal-300",
      text: "text-teal-600",
      textDark: "text-teal-700",
      bg: "bg-teal-500",
      bgDark: "bg-teal-600",
      tagBg: "bg-teal-100",
    },
    orange: {
      border: "border-orange-300",
      text: "text-orange-600",
      textDark: "text-orange-700",
      bg: "bg-orange-500",
      bgDark: "bg-orange-600",
      tagBg: "bg-orange-100",
    },
    amber: {
      border: "border-amber-300",
      text: "text-amber-600",
      textDark: "text-amber-700",
      bg: "bg-amber-500",
      bgDark: "bg-amber-600",
      tagBg: "bg-amber-100",
    },
  };

  const colorKeys = Object.keys(colorMap);

  const getRandomColor = () =>
    colorKeys[Math.floor(Math.random() * colorKeys.length)];

  const handleSubmitExam = () => {
    let correct = 0;
    subjectQuestions.forEach((q) => {
      if (answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
        correct++;
      }
    });

    alert(
      `Exam Submitted!\nCorrect: ${correct}/${subjectQuestions.length}\nScore: ${(
        (correct / subjectQuestions.length) *
        100
      ).toFixed(2)}%`
    );

    setSelectedExam(null);
    setAnswers({});
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white border-b-2 border-purple-400 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎓</div>
            <div>
              <h1 className="text-2xl font-bold text-purple-700">
                MDDM Inter College
              </h1>
              <p className="text-gray-500 text-sm">Student Dashboard</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-purple-700 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* HERO */}
      <div
        className="w-full h-72 md:h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-purple-600/40 to-blue-600/40"></div>

        {/* Stats */}
        <div className="absolute bottom-[-60px] left-0 right-0 flex justify-center">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

            <div className="bg-white border-4 border-blue-400 rounded-[40px] p-6 shadow-xl text-center">
              <p className="text-gray-600">Subjects</p>
              <p className="text-4xl font-bold text-blue-500 mt-2">{subjects.length}</p>
            </div>

            <div className="bg-white border-4 border-pink-400 rounded-[40px] p-6 shadow-xl text-center">
              <p className="text-gray-600">Total Questions</p>
              <p className="text-4xl font-bold text-pink-500 mt-2">{questions.length}</p>
            </div>

            <div className="bg-white border-4 border-green-400 rounded-[40px] p-6 shadow-xl text-center">
              <p className="text-gray-600">Welcome</p>
              <p className="text-lg font-bold text-green-600 mt-1">{userEmail}</p>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="px-6 max-w-7xl mx-auto mt-28">

        <div
          className="w-full bg-cover bg-center rounded-3xl relative p-10"
          style={{ backgroundImage: `url(${bgrnd})` }}
        >
          <div className="absolute inset-0 bg-white/50 backdrop-blur-xs rounded-3xl"></div>

          <div className="relative z-10">

            {/* SUBJECT LIST */}
            {!selectedExam ? (
              <div>
                <h3 className="text-3xl font-bold text-purple-700 mb-8 text-center">
                  Available Subjects
                </h3>

                {subjects.length === 0 ? (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 text-center shadow-lg border border-purple-200">
                    <BookOpen size={50} className="mx-auto text-purple-500 mb-4" />
                    <p className="text-lg text-gray-600">
                      No subjects available yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subjects.map((sub) => {
                      const color = getRandomColor();
                      const c = colorMap[color];

                      return (
                        <div
                          key={sub}
                          onClick={() => {
                            setSelectedExam(sub);
                            setActiveColor(color); // Set exam color
                          }}
                          className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 ${c.border} shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
                        >
                          <h4 className={`text-xl font-bold ${c.text}`}>{sub}</h4>

                          <p className="text-gray-600 mt-2">
                            {questions.filter((q) => q.subject === sub).length} questions
                          </p>

                          <span className={`inline-block mt-4 text-sm px-3 py-1 rounded-full ${c.tagBg} ${c.textDark} border ${c.border}`}>
                            {sub}
                          </span>

                          <button className={`mt-6 w-full py-2 rounded-lg text-white font-semibold ${c.bg} hover:${c.bgDark} transition`}>
                            Start Exam
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* EXAM PANEL */
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-purple-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-3xl font-bold ${colorMap[activeColor].text}`}>
                    {selectedExam} – Exam
                  </h3>

                  <button
                    onClick={() => {
                      setSelectedExam(null);
                      setAnswers({});
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                  >
                    Back
                  </button>
                </div>

                <div className="space-y-6">
                  {subjectQuestions.map((q, index) => (
                    <div key={q.id} className="bg-white p-6 rounded-xl shadow-md">
                      <p className={`font-semibold text-lg ${colorMap[activeColor].text}`}>
                        {index + 1}. {q.question}
                      </p>

                      <textarea
                        value={answers[q.id] || ""}
                        onChange={(e) =>
                          setAnswers({ ...answers, [q.id]: e.target.value })
                        }
                        className="w-full p-3 mt-4 border-2 border-purple-400 rounded-xl focus:border-purple-500 focus:outline-none h-28"
                        placeholder="Write your answer here..."
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSubmitExam}
                  className="w-full mt-6 py-3 bg-green-600 text-white text-lg rounded-xl hover:bg-green-700"
                >
                  Submit Exam
                </button>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}
