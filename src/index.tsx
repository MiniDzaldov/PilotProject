import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      const newTask: Task = { id: Date.now().toString(), text: newTaskText, completed: false };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Task Manager</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="New task"
          style={{ padding: "8px", marginRight: "4px" }}
        />
        <button type="submit" style={{ padding: "8px 12px", cursor: "pointer" }}>
          Add
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: "10px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              title={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', margin: "0 10px" }}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ padding: "4px 8px", cursor: "pointer" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);