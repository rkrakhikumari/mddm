import React, { useState } from "react";
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Download,
  BookOpen,
  Book,
  Hash,
  Calculator,
  Globe,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import Footer from "./SchoolFooter";
import image from "../assets/img.jpg";
import ban1 from "../assets/ban1.jpg";
import ban2 from "../assets/ban2.jpg";
import ban3 from "../assets/ban3.jpg";
import bckgrnd from "../assets/ques.avif";
import CollegeBannerCarousel from "./CollegeBannerCarousel";

/**
 * TeacherDashboard
 * - Base64 image upload (only for primary classes LKG..Class V)
 * - Gradient buttons, improved subject UI and difficulty UI
 */

export default function TeacherDashboard({
  userEmail,
  onLogout,
  questions,
  setQuestions,
}) {
  /* -----------------------
     State & constants
     ----------------------- */
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const bannerSlides = [
    { image: ban1, title: "Welcome to MDDM", subtitle: "Empowering Students for a Brighter Future" },
    { image: ban2, title: "Admissions Open 2025", subtitle: "Enroll now in top programs with world-class faculty" },
    { image: ban3, title: "Scholarships Available", subtitle: "Merit-based scholarships for deserving students" },
  ];

  const classes = [
    "LKG", "UKG",
    "Class I", "Class II", "Class III", "Class IV", "Class V",
    "Class VI", "Class VII", "Class VIII", "Class IX", "Class X", "Class XI", "Class XII",
  ];

  const primaryClasses = new Set(["LKG", "UKG", "Class I", "Class II", "Class III", "Class IV", "Class V"]);

  const subjects = [
    { key: "Math", icon: Calculator, color: "blue" },
    { key: "English", icon: Book, color: "purple" },
    { key: "Science", icon: Globe, color: "emerald" },
    { key: "Social", icon: Hash, color: "amber" },
    { key: "Hindi", icon: Star, color: "rose" },
  ];

  // colors for gradient/borders
  const subjectColorMap = {
    Math: { border: "border-blue-400", text: "text-blue-700", bg: "bg-blue-50" },
    English: { border: "border-purple-400", text: "text-purple-700", bg: "bg-purple-50" },
    Science: { border: "border-emerald-400", text: "text-emerald-700", bg: "bg-emerald-50" },
    Social: { border: "border-amber-400", text: "text-amber-700", bg: "bg-amber-50" },
    Hindi: { border: "border-rose-400", text: "text-rose-700", bg: "bg-rose-50" },
  };

  const getRandomBrightColor = () => {
    const colors = [
      "rose-500","pink-500","purple-500","violet-500","indigo-500",
      "blue-500","cyan-500","emerald-500","teal-500","lime-500","amber-500","orange-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // const colorMap = {
  //   "rose-500": { border: "border-rose-400", text: "text-rose-600", bg: "bg-rose-50" },
  //   "pink-500": { border: "border-pink-400", text: "text-pink-600", bg: "bg-pink-50" },
  //   "purple-500": { border: "border-purple-400", text: "text-purple-600", bg: "bg-purple-50" },
  //   "violet-500": { border: "border-violet-400", text: "text-violet-600", bg: "bg-violet-50" },
  //   "indigo-500": { border: "border-indigo-400", text: "text-indigo-600", bg: "bg-indigo-50" },
  //   "blue-500": { border: "border-blue-400", text: "text-blue-600", bg: "bg-blue-50" },
  //   "cyan-500": { border: "border-cyan-400", text: "text-cyan-600", bg: "bg-cyan-50" },
  //   "emerald-500": { border: "border-emerald-400", text: "text-emerald-600", bg: "bg-emerald-50" },
  //   "teal-500": { border: "border-teal-400", text: "text-teal-600", bg: "bg-teal-50" },
  //   "lime-500": { border: "border-lime-400", text: "text-lime-600", bg: "bg-lime-50" },
  //   "amber-500": { border: "border-amber-400", text: "text-amber-600", bg: "bg-amber-50" },
  //   "orange-500": { border: "border-orange-400", text: "text-orange-600", bg: "bg-orange-50" },
  // };


  const classColorMap = {
  "LKG": "border-rose-400 text-rose-600",
  "UKG": "border-pink-400 text-pink-600",
  "Class I": "border-purple-400 text-purple-600",
  "Class II": "border-indigo-500 text-indigo-700",
  "Class III": "border-blue-400 text-blue-600",
  "Class IV": "border-cyan-400 text-cyan-600",
  "Class V": "border-emerald-400 text-emerald-600",
  "Class VI": "border-lime-400 text-lime-600",
  "Class VII": "border-fuchsia-400 text-fuchsia-600",
  "Class VIII": "border-orange-400 text-orange-600",
  "Class IX": "border-red-400 text-red-600",
  "Class X": "border-teal-400 text-teal-600",
  "Class XI": "border-green-400 text-green-600",
  "Class XII": "border-violet-400 text-violet-600",
};

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    subject: "",
    className: "",
    difficulty: "medium",
    imageBase64: null,
    imageName: "",
  });

  /* -----------------------
     Helpers & CRUD
     ----------------------- */

  // Convert file to base64 (used for primary classes)
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const resetForm = (keepSubjectClass = false) => {
    setFormData({
      question: "",
      answer: "",
      subject: keepSubjectClass ? formData.subject : "",
      className: keepSubjectClass ? formData.className : "",
      difficulty: "medium",
      imageBase64: null,
      imageName: "",
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleAddQuestion = async () => {
    if (!formData.question || !formData.answer || !formData.subject || !formData.className) {
      alert("Please fill question, answer, subject and class.");
      return;
    }

    if (editingId) {
      setQuestions(
        questions.map((q) =>
          q.id === editingId ? { ...q, ...formData } : q
        )
      );
      resetForm(true);
    } else {
      const newQ = {
        ...formData,
        id: Date.now(),
        randomColor: getRandomBrightColor(),
        createdAt: Date.now(),
      };
      setQuestions([newQ, ...questions]);
      resetForm(true);
    }
  };

  const handleEdit = (q) => {
    setFormData({
      question: q.question || "",
      answer: q.answer || "",
      subject: q.subject || selectedSubject || "",
      className: q.className || selectedClass || "",
      difficulty: q.difficulty || "medium",
      imageBase64: q.imageBase64 || null,
      imageName: q.imageName || "",
    });
    setEditingId(q.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this question?")) return;
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const generateExamPaper = ({ forAll = false } = {}) => {
    let pool = [];
    if (!selectedClass) {
      alert("Select a class first.");
      return;
    }
    if (forAll) {
      pool = questions.filter((q) => q.className === selectedClass);
    } else {
      if (!selectedSubject) {
        alert("Select a subject first.");
        return;
      }
      pool = questions.filter((q) => q.className === selectedClass && q.subject === selectedSubject);
    }

    if (pool.length < 5) {
      alert("Add at least 5 questions to generate exam paper for this selection.");
      return;
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    const content = shuffled.map((q, i) => `${i + 1}. ${q.question}`).join("\n\n");

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    const filename = forAll ? `${selectedClass}_exam.txt` : `${selectedClass}_${selectedSubject}_exam.txt`;
    element.setAttribute("download", filename);
    element.click();
  };

  /* -----------------------
     RENDER
     ----------------------- */

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <header className="bg-white backdrop-blur-md shadow-md border border-purple-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={image} alt="" className="h-14 w-14 rounded-full shadow-md border-2 border-purple-300" />
              <div>
                <h1 className="text-2xl font-bold text-purple-700">MDDM Inter College</h1>
                <p className="text-sm text-gray-500">Teacher Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right mr-4">
                <p className="text-sm text-gray-500">Welcome</p>
                <p className="text-sm font-semibold text-purple-700">{userEmail}</p>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-linear-to-r from-pink-500 to-purple-600 text-white px-4 py-2.5 rounded-xl shadow-lg hover:opacity-95 transition transform hover:-translate-y-0.5"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </header>

        <CollegeBannerCarousel slides={bannerSlides} />

        {/* MAIN */}
        <main className="mt-10 px-6 max-w-7xl mx-auto mb-30">
          {/* CLASSES GRID */}
          {!selectedClass && (
            <>
              <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Select Class</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {classes.map((cls) => {
                  const clsStyle = primaryClasses.has(cls)
                    ? "border-4 border-pink-200 bg-gradient-to-b from-white to-pink-50"
                    : "border-4 border-gray-100 bg-white";
                  return (
                    <div
  key={cls}
  onClick={() => setSelectedClass(cls)}
  className={`p-6 rounded-3xl shadow-xl cursor-pointer transform transition duration-400 hover:-translate-y-2 hover:shadow-2xl 
    ${clsStyle} ${classColorMap[cls]}`}
>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Class</p>
<p className={`text-xl font-semibold ${classColorMap[cls].split(" ")[1]}`}>
  {cls}
</p>
                        </div>
                        <div className="rounded-full w-12 h-12 bg-white/60 flex items-center justify-center shadow-sm">
                          <BookOpen className="text-pink-500" />
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-gray-600">Click to open subjects & add questions</p>

                      {primaryClasses.has(cls) && (
                        <p className="mt-3 text-xs text-pink-600 font-medium"></p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* SUBJECTS VIEW */}
          {selectedClass && !selectedSubject && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-purple-700">{selectedClass}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setSelectedClass(null); setSelectedSubject(null); }}
className="flex items-center gap-2 bg-linear-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg hover:opacity-95 transform hover:-translate-y-1 transition-transform duration-300 ease-out focus:outline-none"
                  >
                    ← Back to classes
                  </button>
                  
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {subjects.map((s) => {
                  const Icon = s.icon;
                  const sc = subjectColorMap[s.key];
                  return (
                    <div
                      key={s.key}
                      onClick={() => {
                        setSelectedSubject(s.key);
                        setFormData({ ...formData, subject: s.key, className: selectedClass });
                      }}
                      className={`p-6 bg-white rounded-2xl border-4 ${sc.border} shadow-md cursor-pointer transform transition hover:-translate-y-2 hover:shadow-xl`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${sc.bg} flex items-center justify-center`}>
                          <Icon className={`${sc.text}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{s.key}</p>
                          <p className="text-sm text-gray-500">
                            Questions: {questions.filter(q => q.className === selectedClass && q.subject === s.key).length}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-gray-600">Click to open {s.key} questions & add more.</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUBJECT + CLASS SELECTED: QUESTIONS & FORM */}
          {selectedClass && selectedSubject && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-pink-600">{selectedClass} — {selectedSubject}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setSelectedSubject(null); setShowAddForm(false); }}
className="flex items-center gap-2 bg-linear-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg hover:opacity-95 transform hover:-translate-y-1 transition-transform duration-300 ease-out focus:outline-none"
                  >
                    ← Back to subjects
                  </button>

                  <button
                    onClick={() => {
                      if (questions.filter(q => q.className === selectedClass && q.subject === selectedSubject).length < 5) {
                        alert("Add at least 5 questions to generate exam for this subject.");
                        return;
                      }
                      if (window.confirm(`Generate exam for ${selectedClass} - ${selectedSubject}?`)) {
                        generateExamPaper({ forAll: false });
                      }
                    }}
className="flex items-center gap-2 bg-linear-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:opacity-95 transform hover:-translate-y-1 transition-transform duration-300 ease-out focus:outline-none"
                  >
                    <Download size={16} /> Generate Exam
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowAddForm(true);
                  setFormData({
                    ...formData,
                    subject: selectedSubject,
                    className: selectedClass,
                    difficulty: "medium",
                  });
                }}
className="mb-6 flex items-center gap-2 bg-linear-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-95 transform hover:-translate-y-1 transition-transform duration-300 ease-out outline-none"
              >
                <Plus size={18} /> Add New Question
              </button>

              {/* Add/Edit Form */}
              {showAddForm && (
                <div className="bg-white p-8 rounded-3xl shadow-xl mb-10 border border-gray-100">
                  <h3 className="text-2xl font-bold text-pink-500 mb-6">{editingId ? "Edit Question" : "Add New Question"}</h3>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter question..."
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      className="w-full p-3 border-2 border-purple-100 rounded-xl focus:border-purple-300 focus:outline-none"
                    />

                    <textarea
                      placeholder="Enter answer..."
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      className="w-full p-3 border-2 border-purple-100 rounded-xl h-32 focus:border-purple-300 focus:outline-none"
                    />

                    {/* subject/class shown readonly */}
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formData.className || selectedClass}
                        readOnly
                        className="w-full p-3 border-2 border-purple-100 rounded-xl bg-gray-50"
                      />
                      <input
                        type="text"
                        value={formData.subject || selectedSubject}
                        readOnly
                        className="w-full p-3 border-2 border-purple-100 rounded-xl bg-gray-50"
                      />
                    </div>

                    {/* Difficulty segmented control */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Difficulty</p>
                      <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
                        {["easy", "medium", "hard"].map((d) => {
                          const isActive = formData.difficulty === d;
                          const base = isActive ? "scale-100" : "opacity-80";
                          const colors = d === "easy" ? "bg-green-200 text-green-700" : d === "medium" ? "bg-yellow-200 text-yellow-700" : "bg-red-200 text-red-700";
                          return (
                            <button
                              key={d}
                              onClick={() => setFormData({ ...formData, difficulty: d })}
                              className={`px-4 py-2 text-sm font-semibold ${colors} ${base} focus:outline-none`}
                              type="button"
                            >
                              {d === "easy" ? "Easy" : d === "medium" ? "Medium" : "Hard"}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Image upload only for primary classes */}
                    {primaryClasses.has(selectedClass) && (
                      <div>
                        
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (file.size > 2 * 1024 * 1024) {
                                alert("Max 2 MB file size. Please choose a smaller image.");
                                return;
                              }
                              const b64 = await fileToBase64(file);
                              setFormData({ ...formData, imageBase64: b64, imageName: file.name });
                            }}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-linear-to-r file:from-pink-500 file:to-purple-600 file:text-white"
                          />

                          {formData.imageBase64 && (
                            <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                              <img src={formData.imageBase64} alt="preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={handleAddQuestion}
                        className="flex-1 bg-linear-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl shadow-lg hover:opacity-95"
                      >
                        {editingId ? "Update" : "Add"} Question
                      </button>

                      <button
                        onClick={() => resetForm(true)}
                        className="flex-1 bg-white border-2 border-purple-400 text-gray-700 py-3 rounded-xl shadow-sm hover:shadow-md focus:border-2 border-purple-400 hover:opacity-95 transform hover:-translate-y-1 transition-transform duration-300 ease-out focus:outline-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Questions list */}
              <div className="mb-16 bg-cover bg-center bg-no-repeat rounded-3xl p-8 relative" style={{ backgroundImage: `url(${bckgrnd})` }}>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-xs rounded-3xl"></div>
                <div className="relative z-10 rounded-3xl p-6">
                  <h3 className="text-3xl font-bold text-pink-600 mb-8">All Questions ({questions.filter(q => q.className === selectedClass && q.subject === selectedSubject).length})</h3>

                  {questions.filter(q => q.className === selectedClass && q.subject === selectedSubject).length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-lg border border-gray-100">
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen size={40} className="text-purple-600" />
                      </div>
                      <p className="text-gray-600 text-lg font-medium">No questions added yet. Start creating! 🎓</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {questions
                        .filter(q => q.className === selectedClass && q.subject === selectedSubject)
                        .map((q) => {
                          if (!q.randomColor) q.randomColor = getRandomBrightColor();
                          const col = colorMap[q.randomColor] || colorMap["blue-500"];
                          return (
                            <div
                              key={q.id}
                              onClick={() => {
                                // toggle open safely
                                setQuestions(prev => prev.map(pq => pq.id === q.id ? { ...pq, _open: !pq._open } : pq));
                              }}
                              className={`bg-white rounded-2xl p-6 relative cursor-pointer border-2 ${col.border} shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex-1">
                                  <p className={`font-bold text-base leading-relaxed ${col.text}`}>{q.question}</p>

                                  <div className="mt-3 flex items-center gap-3">
                                    <span className={`inline-block px-3 py-1 text-xs rounded-full border-2 font-semibold ${
                                      q.subject.toLowerCase().includes("math") ? "border-blue-400 text-blue-700 bg-blue-50" :
                                      q.subject.toLowerCase().includes("science") ? "border-green-400 text-green-700 bg-green-50" :
                                      q.subject.toLowerCase().includes("english") ? "border-purple-400 text-purple-700 bg-purple-50" :
                                      "border-gray-300 text-gray-600 bg-gray-100"
                                    }`}>{q.subject}</span>

                                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                      q.difficulty === "easy" ? "text-green-600 border-green-400 bg-green-50" :
                                      q.difficulty === "medium" ? "text-yellow-600 border-yellow-400 bg-yellow-50" :
                                      "text-red-600 border-red-400 bg-red-50"
                                    }`}>{q.difficulty.toUpperCase()}</span>
                                  </div>

                                  <div className={`mt-4 overflow-hidden transition-all duration-500 ${q._open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                    <p className={`text-sm text-gray-700 ${col.bg} ${col.border} border p-4 rounded-xl mt-2 font-medium`}>
                                      <span className="font-bold">Answer:</span> {q.answer}
                                    </p>

                                    {q.imageBase64 && (
                                      <div className="mt-3">
                                        <p className="text-xs text-gray-500 mb-2">Attached image:</p>
                                        <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-100">
                                          <img src={q.imageBase64} alt={q.imageName || "attached"} className="w-full h-full object-cover" />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* small thumbnail if present */}
                                {q.imageBase64 && (
                                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-100 hidden md:block">
                                    <img src={q.imageBase64} alt="thumb" className="w-full h-full object-cover" />
                                  </div>
                                )}
                              </div>

                              <div className="absolute bottom-4 right-4 flex gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleEdit(q); }}
                                  className="text-white bg-linear-to-r from-cyan-400 to-blue-500 px-3 py-2 rounded-lg hover:opacity-95 transition-all shadow-sm"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDelete(q.id); }}
                                  className="text-white bg-linear-to-r from-rose-500 to-pink-500 px-3 py-2 rounded-lg hover:opacity-95 transition-all shadow-sm"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* When class selected but no subject: (secondary) show ability to add across subjects */}
          {selectedClass && !selectedSubject && (
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-600">Pick a subject to start adding questions, or use Quick Add to add a question and choose the subject later.</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
