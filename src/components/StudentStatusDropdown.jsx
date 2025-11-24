import React, { useState } from "react";
import { ChevronDown, X, Edit2, Save, Users, CreditCard } from "lucide-react";

/**
 * StudentStatusDropdown
 * - Main button in header
 * - Dropdown with 2 buttons: Attendance & Fee Status
 * - Click opens respective pages with student list
 */

export default function StudentStatusDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewMode, setViewMode] = useState(null); // 'attendance' or 'fee'
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Kumar", rollNo: "001", attendance: 92, feeSubmitted: true },
    { id: 2, name: "Priya Singh", rollNo: "002", attendance: 78, feeSubmitted: false },
    { id: 3, name: "Arjun Verma", rollNo: "003", attendance: 85, feeSubmitted: true },
    { id: 4, name: "Neha Patel", rollNo: "004", attendance: 88, feeSubmitted: true },
    { id: 5, name: "Vikram Yadav", rollNo: "005", attendance: 72, feeSubmitted: false },
    { id: 6, name: "Aisha Khan", rollNo: "006", attendance: 95, feeSubmitted: true },
    { id: 7, name: "Rohan Desai", rollNo: "007", attendance: 68, feeSubmitted: false },
    { id: 8, name: "Sneha Sharma", rollNo: "008", attendance: 90, feeSubmitted: true },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Update attendance
  const updateAttendance = (id, newValue) => {
    if (newValue < 0 || newValue > 100) {
      alert("Attendance must be between 0 and 100");
      return;
    }
    setStudents(
      students.map((s) => (s.id === id ? { ...s, attendance: newValue } : s))
    );
    setEditingId(null);
  };

  // Toggle fee status
  const toggleFeeStatus = (id) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, feeSubmitted: !s.feeSubmitted } : s
      )
    );
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return "text-green-600 bg-green-100 border-green-300";
    if (attendance >= 75) return "text-yellow-600 bg-yellow-100 border-yellow-300";
    return "text-red-600 bg-red-100 border-red-300";
  };

  return (
    <div>
      {/* Header Button */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition transform hover:-translate-y-0.5 font-semibold"
        >
          <Users size={20} />
          <span>Students</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <button
              onClick={() => {
                setViewMode("attendance");
                setShowDropdown(false);
              }}
              className="w-full px-6 py-4 text-left font-bold text-blue-600 hover:bg-blue-50 border-b border-gray-200 transition flex items-center gap-3 text-lg"
            >
              <span className="text-2xl">📊</span>
              Attendance
            </button>
            <button
              onClick={() => {
                setViewMode("fee");
                setShowDropdown(false);
              }}
              className="w-full px-6 py-4 text-left font-bold text-green-600 hover:bg-green-50 transition flex items-center gap-3 text-lg"
            >
              <span className="text-2xl">💳</span>
              Fee Status
            </button>
          </div>
        )}
      </div>

      {/* ATTENDANCE VIEW */}
      {viewMode === "attendance" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col border border-blue-200">
            {/* Header */}
            <div className="flex items-center justify-between p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">📊</span>
                Student Attendance
              </h2>
              <button
                onClick={() => setViewMode(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* Student List */}
            <div className="overflow-y-auto flex-1 p-8">
              <div className="space-y-4">
                {students.map((student, index) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-5 rounded-xl border-2 border-blue-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 ${
                      index % 2 === 0 ? "bg-white" : "bg-blue-50/50"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-lg">{student.name}</p>
                      <p className="text-sm text-gray-600 font-medium">Roll No: {student.rollNo}</p>
                    </div>

                    {editingId === student.id ? (
                      <div className="flex items-center gap-3 bg-blue-100 px-4 py-2.5 rounded-lg border-2 border-blue-400">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-20 px-3 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 font-bold text-center"
                        />
                        <span className="text-gray-700 font-bold text-lg">%</span>
                        <button
                          onClick={() => updateAttendance(student.id, parseInt(editValue))}
                          className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded-lg hover:shadow-md transition"
                        >
                          <Save size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(student.id);
                          setEditValue(student.attendance);
                        }}
                        className={`px-6 py-3 rounded-xl font-bold text-lg ${getAttendanceColor(
                          student.attendance
                        )} border-2 hover:shadow-lg transition cursor-pointer flex items-center gap-2`}
                      >
                        {student.attendance}%
                        <Edit2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FEE STATUS VIEW */}
      {viewMode === "fee" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col border border-green-200">
            {/* Header */}
            <div className="flex items-center justify-between p-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-2xl">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">💳</span>
                Fee Status
              </h2>
              <button
                onClick={() => setViewMode(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* Student List */}
            <div className="overflow-y-auto flex-1 p-8">
              <div className="space-y-4">
                {students.map((student, index) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-5 rounded-xl border-2 border-green-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 ${
                      index % 2 === 0 ? "bg-white" : "bg-green-50/50"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-lg">{student.name}</p>
                      <p className="text-sm text-gray-600 font-medium">Roll No: {student.rollNo}</p>
                    </div>

                    <button
                      onClick={() => toggleFeeStatus(student.id)}
                      className={`px-8 py-3 rounded-xl font-bold text-lg transition cursor-pointer border-2 hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2 ${
                        student.feeSubmitted
                          ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-600 hover:from-green-500 hover:to-emerald-600"
                          : "bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-600 hover:from-red-500 hover:to-pink-600"
                      }`}
                    >
                      {student.feeSubmitted ? (
                        <>
                          <span>✓</span>
                          Paid
                        </>
                      ) : (
                        <>
                          <span>✗</span>
                          Pending
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}