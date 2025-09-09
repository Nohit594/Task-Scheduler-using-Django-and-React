// src/App.js
import React, { useState, useEffect } from "react";
import { Plus, Check, X, Loader2 } from "lucide-react";
import "./App.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch tasks from Django API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(
        "Failed to fetch tasks. Make sure Django server is running on port 8000."
      );
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskTitle.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTask = await response.json();
      setTasks((prev) => [newTask, ...prev]);
      setNewTaskTitle("");
      setError("");
    } catch (err) {
      setError("Failed to add task. Please try again.");
      console.error("Add task error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle task status
  const toggleTask = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_done: !currentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
      setError("");
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Toggle task error:", err);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-lg text-gray-700">Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">Stay organized with your daily tasks</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <X className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Add Task Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              disabled={submitting}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !submitting && newTaskTitle.trim()) {
                  addTask(e);
                }
              }}
            />
            <button
              onClick={addTask}
              disabled={submitting || !newTaskTitle.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {tasks.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
              <p>Add your first task above to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                    task.is_done ? "opacity-75" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id, task.is_done)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      task.is_done
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {task.is_done && <Check className="w-3 h-3" />}
                  </button>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-medium ${
                        task.is_done
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {new Date(task.created_at).toLocaleDateString()}
                      {task.updated_at !== task.created_at && (
                        <span>
                          {" • Updated: "}
                          {new Date(task.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      task.is_done
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.is_done ? "Done" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {tasks.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {tasks.length}
                </div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {tasks.filter((task) => task.is_done).length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {tasks.filter((task) => !task.is_done).length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with Django REST Framework + React</p>
        </div>
      </div>
    </div>
  );
}

export default App;
