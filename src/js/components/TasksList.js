import React from "react";
import Task from "./Task";

function TasksList(props) {
  if (props.tasks === null) {
    return "Loading...";
  }

  return <div className="tasks-list">{props.tasks.map(Task)}</div>;
}

export default TasksList;
