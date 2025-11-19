import React, { useState } from "react";
import { LogOut, Plus, Edit2, Trash2, Download, BookOpen } from "lucide-react";
import image from "../assets/img.jpg";
import teach from "../assets/teach.jpg";
import bckgrnd from "../assets/ques.avif"

export default function TeacherDashboard({
  userEmail,
  onLogout,
  questions,
  setQuestions,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

const getRandomBrightColor = () => {
  const colors = [
    "rose-500", "pink-500", "purple-500", "violet-500",
    "indigo-500", "blue-500", "cyan-500", "emerald-500",
    "teal-500", "lime-500", "amber-500", "orange-500"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};


  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    subject: "",
    difficulty: "medium",
  });

  const handleAddQuestion = () => {
    if (!formData.question || !formData.answer || !formData.subject) return;

    if (editingId) {
      setQuestions(
        questions.map((q) =>
          q.id === editingId ? { ...formData, id: editingId } : q
        )
      );
      setEditingId(null);
    } else {
      setQuestions([...questions, { ...formData, id: Date.now() }]);
    }

    setFormData({
      question: "",
      answer: "",
      subject: "",
      difficulty: "medium",
    });

    setShowAddForm(false);
  };

  const handleEdit = (q) => {
    setFormData(q);
    setEditingId(q.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const generateExamPaper = () => {
    if (questions.length < 5) {
      alert("Add at least 5 questions to generate exam paper");
      return;
    }

    const shuffled = [...questions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    const content = shuffled
      .map((q, i) => `${i + 1}. ${q.question}`)
      .join("\n\n");

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    element.setAttribute("download", "exam_paper.txt");
    element.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white backdrop-blur-md shadow-md border border-purple-500">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* LEFT: LOGO + TITLE */}
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt=""
        className="h-14 w-14 rounded-full shadow-md border-2 border-purple-300"
      />

      <div>
        <h1 className="text-2xl font-bold text-purple-700 leading-tight">
          MDDM Inter College
        </h1>
        <p className="text-sm text-gray-500">Teacher Dashboard</p>
      </div>
    </div>

    {/* MIDDLE: WELCOME TEXT
    <div className="hidden md:block text-center">
      <p className="text-sm text-gray-500">Welcome</p>
      <p className="text-lg font-semibold text-purple-700">{userEmail}</p>
    </div> */}

    {/* RIGHT: LOGOUT BUTTON */}
    <button
      onClick={onLogout}
      className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-purple-700 transition"
    >
      <LogOut size={18} /> Logout
    </button>

  </div>
</header>

      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div
        className="w-full h-72 md:h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${teach})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-purple-600/40 to-blue-600/40"></div>

        {/* STATS FLOATING */}
        <div className="absolute bottom-[-60px] left-0 right-0 flex justify-center">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

            {/* CLOUD STYLE STATS */}
            <div className="bg-white border-4 border-blue-400 rounded-[40px] p-6 shadow-xl text-center">
              <p className="text-gray-600">Total Questions</p>
              <p className="text-4xl font-bold text-blue-500 mt-2">
                {questions.length}
              </p>
            </div>

            <div className="bg-white border-4 border-pink-400 rounded-[40px] p-6 shadow-xl text-center">
              <p className="text-gray-600">Subjects</p>
              <p className="text-4xl font-bold text-pink-500 mt-2">
                {new Set(questions.map((q) => q.subject)).size}
              </p>
            </div>

            <button
              onClick={generateExamPaper}
              className="bg-white border-4 border-green-400 rounded-[40px] p-6 shadow-xl text-center text-lg font-bold hover:bg-green-100 focus:outline-green-400"
            >
              <Download className="inline mr-2" /> Generate Exam
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="mt-28 px-6 max-w-7xl mx-auto">

        {/* Add Question Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mb-8 bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow hover:bg-purple-700 focus:outline-purple-700"
        >
          <Plus size={20} /> Add New Question
        </button>

        {/* ADD / EDIT FORM */}
        {showAddForm && (
          <div className="bg-white p-8 rounded-3xl shadow-xl mb-10 border border-gray-200">

            <h3 className="text-2xl font-bold text-pink-500 mb-6">
              {editingId ? "Edit Question" : "Add New Question"}
            </h3>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Enter question..."
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                className="w-full p-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-purple-500"
              />

              <textarea
                placeholder="Enter answer..."
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                className="w-full p-3 border-2 border-purple-200 rounded-xl h-32 focus:border-purple-500 focus:outline-purple-500"
              />

              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full p-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-purple-500"
              />

              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="w-full p-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-purple-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <div className="flex gap-3">
                <button
                  onClick={handleAddQuestion}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl shadow hover:bg-green-600"
                >
                  {editingId ? "Update" : "Add"} Question
                </button>

                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    setFormData({
                      question: "",
                      answer: "",
                      subject: "",
                      difficulty: "medium",
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl shadow hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

        {/* QUESTION LIST */}
<div
  className="mb-16 bg-cover bg-center bg-no-repeat rounded-3xl p-8 relative"
  style={{
    backgroundImage: `url(${bckgrnd})`,
  }}
>
  {/* Optional dim/blur layer for readability */}
  <div className="absolute inset-0 bg-white/40 backdrop-blur-xs rounded-3xl"></div>

  {/* Content ABOVE background */}
  <div className="relative z-10 rounded-3xl p-6">
    <h3 className="text-3xl font-bold text-pink-600 mb-8">All Questions</h3>

    {questions.length === 0 ? (
      <div className="bg-white rounded-3xl p-16 text-center shadow-lg border border-gray-200">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen size={40} className="text-purple-600" />
        </div>
        <p className="text-gray-600 text-lg font-medium">
          No questions added yet. Start creating! 🎓
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((q, index) => {
          if (!q.randomColor) {
            q.randomColor = getRandomBrightColor();
          }

          const colorMap = {
            "rose-500": { border: "border-rose-200", text: "text-rose-600", bg: "bg-rose-50" },
            "pink-500": { border: "border-pink-200", text: "text-pink-600", bg: "bg-pink-50" },
            "purple-500": { border: "border-purple-200", text: "text-purple-600", bg: "bg-purple-50" },
            "violet-500": { border: "border-violet-200", text: "text-violet-600", bg: "bg-violet-50" },
            "indigo-500": { border: "border-indigo-200", text: "text-indigo-600", bg: "bg-indigo-50" },
            "blue-500": { border: "border-blue-200", text: "text-blue-600", bg: "bg-blue-50" },
            "cyan-500": { border: "border-cyan-200", text: "text-cyan-600", bg: "bg-cyan-50" },
            "emerald-500": { border: "border-emerald-200", text: "text-emerald-600", bg: "bg-emerald-50" },
            "teal-500": { border: "border-teal-200", text: "text-teal-600", bg: "bg-teal-50" },
            "lime-500": { border: "border-lime-200", text: "text-lime-600", bg: "bg-lime-50" },
            "amber-500": { border: "border-amber-200", text: "text-amber-600", bg: "bg-amber-50" },
            "orange-500": { border: "border-orange-200", text: "text-orange-600", bg: "bg-orange-50" },
          };

          const color = colorMap[q.randomColor] || colorMap["blue-500"];

          return (
            <div
              key={q.id}
              onClick={() => {
                q._open = !q._open;
                setQuestions([...questions]);
              }}
              className={`bg-white rounded-2xl p-6 relative cursor-pointer
                border-2 ${color.border} shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2
              `}
            >
              <p className={`font-bold text-base leading-relaxed ${color.text}`}>
                {q.question}
              </p>

              <span
                className={`inline-block mt-4 px-3 py-1 text-xs rounded-full border-2 font-semibold
                  ${
                    q.subject.toLowerCase() === "math"
                      ? "border-blue-400 text-blue-700 bg-blue-50"
                      : q.subject.toLowerCase() === "science"
                      ? "border-green-400 text-green-700 bg-green-50"
                      : q.subject.toLowerCase() === "english"
                      ? "border-purple-400 text-purple-700 bg-purple-50"
                      : "border-gray-400 text-gray-600 bg-gray-100"
                  }
                `}
              >
                {q.subject}
              </span>

              <span
                className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full border-2 font-semibold
                  ${
                    q.difficulty === "easy"
                      ? "text-green-600 border-green-400 bg-green-50"
                      : q.difficulty === "medium"
                      ? "text-yellow-600 border-yellow-400 bg-yellow-50"
                      : "text-red-600 border-red-400 bg-red-50"
                  }
                `}
              >
                {q.difficulty.toUpperCase()}
              </span>

              <div
                className={`
                  mt-4 overflow-hidden transition-all duration-500
                  ${q._open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <p className={`text-sm text-gray-700 ${color.bg} ${color.border} border p-4 rounded-xl mt-2 font-medium`}>
                  <span className="font-bold">Answer:</span> {q.answer}
                </p>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(q);
                  }}
                  className="text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-all shadow-sm hover:shadow-md"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(q.id);
                  }}
                  className="text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition-all shadow-sm hover:shadow-md"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>

      </main>
    </div>
  );
}
