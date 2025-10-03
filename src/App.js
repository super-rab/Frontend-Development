import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const initialTasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Walk the dog", completed: true },
  { id: 3, title: "Learn React", completed: false },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Task Manager</h1>

          {/* Form to add new task */}
          <form className="d-flex mb-4" onSubmit={handleAddTask}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New task..."
              className="form-control me-2"
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>

          {/* Task List */}
          <ul className="list-group">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  task.completed ? "list-group-item-success text-decoration-line-through" : ""
                }`}
              >
                {task.title}
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
