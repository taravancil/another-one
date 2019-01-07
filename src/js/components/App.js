import React, { useEffect, useState } from "react";
import TasksList from "./TasksList";
import Login from "./Login";
import Search from "./Search";
import TaskCreator from "./TaskCreator";
import useSession from "../hooks/session";

function App() {
  const session = useSession();

  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    if (tasks === null) {
      if (session && session.name) {
        // Use api.taravancil.com as tasks store
        fetch("https://api.taravancil.com/tasks", {
          credentials: "include"
        })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            setTasks(data);
            setFilteredTasks(data);
          })
          .catch(function(err) {
            setTasks([]);
            setFilteredTasks([]);
          });
      } else {
        // Use localStorage as tasks store
        try {
          const tasks = JSON.parse(localStorage.getItem("tasks"));
        } catch (_) {
          setTasks([]);
          setFilteredTasks([]);
        }
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

  const [filteredTasks, setFilteredTasks] = useState([]);
  const filterTasksByQuery = q => {
    if (q.length) {
      setFilteredTasks(
        tasks.filter(t => t.title.toLowerCase().includes(q.toLowerCase()))
      );
    } else {
      setFilteredTasks(tasks);
    }
  };

  const addTask = task => {
    const ts = Date.now();
    task = {
      ...task,
      id: ts,
      createdAt: ts.toString(),
      completed: false
    };

    // update state tasks store
    if (tasks) {
      setTasks([...tasks, task]);
    } else {
      setTasks([task]);
    }

    // persist to tasks store
    fetch("https://api.taravancil.com/tasks", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ ...task })
    }).then(function(res) {});
  };

  const deleteTask = id => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks.splice(i, 1);
        break;
      }
    }
    setTasks(tasks);
  };

  return (
    <>
      <header>
        <div className="flex container">
          <Login />

          <Search
            autofocus={true}
            onUpdateQuery={filterTasksByQuery}
            delay={150}
          />

          <TaskCreator
            onAddTask={addTask}
            buttonStyle="btn--primary"
            buttonLabel="Add task +"
          />
        </div>
      </header>

      <TasksList
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onToggleCompletedTask={toggleCompletedTask}
      />
    </>
  );
}

export default App;
