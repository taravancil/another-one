import React from "react";
import Checkmark from "./icons/Checkmark";
import Dropdown from "./Dropdown";
import { getDateString } from "../utils/time";

function Task(props) {
  const { id } = props;

  let classes = "task flex";
  if (props.completed) {
    classes += " task--completed";
  }
  if (props.collapsed) {
    classes += " task--collapsed";
  }

  // TODO implement delete
  /*
  const deleteTask = task => {
    fetch("https://api.taravancil.com/tasks", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ id: task.id })
    });
  };
  */

  return (
    <div className={classes}>
      <div className="task-container">
        <div>
          <div className="task-header flex">
            <h3 className="task-title inline-heading large-text">
              {props.title}
            </h3>
          </div>

          {props.notes ? (
            <p className="task-notes small-text">{props.notes}</p>
          ) : null}

          <ul className="task-links undecorated-list small-text">
            {props.links
              ? props.links.map(l => (
                  <li>
                    <a href={l}>{l}</a>
                  </li>
                ))
              : ""}
            <li>
              <a className="tiny-text" href="">
                butts.com
              </a>
            </li>
          </ul>
        </div>

        <div className="task-footer flex">
          <div className="muted-text tiny-text">
            {getDateString(props.createdAt)}
          </div>

          {props.completed ? (
            <button
              onClick={() => props.onToggleCompleted(id)}
              className="task-status btn btn--transparent inline-flex"
            >
              <span className="tiny-text muted-text">
                Completed {getDateString(props.completedAt)}
              </span>
              <Checkmark width="12" fill="lime" />
            </button>
          ) : (
            <button
              onClick={() => props.onToggleCompleted(id)}
              className="btn btn--transparent tiny-text"
            >
              <span className="tiny-text">Mark as completed</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
