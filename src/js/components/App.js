import React, { useEffect, useState } from "react";
import TasksList from "./TasksList";
import TaskCreator from "./TaskCreator";
import TaskCountLabel from "./TaskCountLabel";

function App() {
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    if (tasks === null) {
      // Use localStorage until api.taravancil.com/tasks is ready
      // TODO: Double check--is this is the recommended way to fetch data using hooks?
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  });

  const addTask = task => {
    const newTasks = tasks;
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    newTasks.push(
      Object.assign(task, { id, completed: false, createdAt: Date.now() })
    );

    // TODO: Can/should this localStorage call live in a hook?
    // Ultimately this will POST to api.taravancil.com/tasks
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <TaskCreator onAddTask={addTask} />
      <TasksList tasks={tasks} />
      <TaskCountLabel count={tasks ? tasks.length : 0} />
    </div>
  );
}

export default App;
