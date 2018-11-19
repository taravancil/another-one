import React, { useEffect, useState } from "react";

function TaskCreator(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const initialTaskState = { title: "", notes: "" };
  const [task, setTask] = useState(initialTaskState);

  useEffect(() => {
    document.addEventListener("keyup", keyUp);

    return () => {
      document.removeEventListener("keyup", keyUp);
    };
  });

  const submit = e => {
    e.preventDefault();
    props.onAddTask(task);
    setTask(initialTaskState);
  };

  const keyUp = e => {
    // C-key
    if (isCollapsed && e.keyCode === 67) {
      setIsCollapsed(false);
    }
    // ESC-key
    else if (e.keyCode === 27) {
      setIsCollapsed(true);
      setTask(initialTaskState);
    }
  };

  return (
    <div className="task-creator">
      <button className="btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        +
      </button>

      <form className={isCollapsed ? "hidden" : ""} onSubmit={submit}>
        <label htmlFor="task-title">Title</label>
        <input
          name="task-title"
          type="text"
          placeholder="feed the cat..."
          value={task.title}
          required
          onChange={e =>
            setTask(Object.assign(task, { title: e.target.value }))
          }
        />

        <label htmlFor="task-notes">Notes</label>
        <textarea
          name="task-notes"
          value={task.notes}
          onChange={e =>
            setTask(Object.assign(task, { notes: e.target.value }))
          }
        />

        <button
          type="reset"
          className="btn"
          onClick={() => setTask(initialTaskState)}
        >
          Reset
        </button>

        <button type="submit" className="btn btn--submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default TaskCreator;
