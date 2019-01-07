import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import LinksInput from "./LinksInput";
import { findParent } from "../utils/dom";

function TaskCreator(props) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(null);

  const initialTaskState = { title: "", notes: "", links: [] };
  const [task, setTask] = useState(initialTaskState);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.addEventListener("keyup", keyUp);

    return () => {
      document.removeEventListener("keyup", keyUp);
    };
  });

  const submit = e => {
    e.preventDefault();

    // TODO validate
    if (!task.title) {
      setFormErrors(Object.assign(formErrors, { title: "Enter a title" }));
    } else {
      props.onAddTask(task);
      setTask(initialTaskState);
      setIsAddTaskModalOpen(false);
    }
  };

  const keyUp = e => {
    // C-key press *not* inside of search input
    if (
      !findParent(e.target, "search") &&
      !isAddTaskModalOpen &&
      e.keyCode === 67
    ) {
      setIsAddTaskModalOpen(true);
    }
  };

  const addTaskModalProps = {
    title: "Add task",
    visible: isAddTaskModalOpen,
    close: () => setIsAddTaskModalOpen(false),
    submit: submit,
    submitLabel: "Add task"
  };

  return (
    <>
      <button
        onClick={() => setIsAddTaskModalOpen(true)}
        className={"btn " + props.buttonStyle}
      >
        {props.buttonLabel || "Add task"}
      </button>

      <Modal {...addTaskModalProps}>
        <div className="task-creator">
          <form onSubmit={submit}>
            <label htmlFor="task-title">Title</label>
            <div className="input-feedback input-feedback--error tiny-text">
              {formErrors.title || ""}
            </div>
            <input
              name="task-title"
              type="text"
              value={task.title}
              required
              aria-invalid={formErrors.title ? true : false}
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
            <LinksInput />
          </form>
        </div>
      </Modal>
    </>
  );
}

export default TaskCreator;
