import React from "react";
import Task from "./Task";

function TasksList(props) {
  if (props.tasks === null) {
    return "Loading...";
  }

  return (
    <div className="tasks-list">
      {props.tasks.map(task => (
        <Task key={task.id} {...task} onDelete={props.onDeleteTask} />
      ))}
    </div>
  );
}

export default TasksList;
