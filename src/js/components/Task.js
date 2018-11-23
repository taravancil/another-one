import React from "react";

function Task(props) {
  const { id, title, notes, onDelete } = props;

  const deleteTask = () => {
    props.onDelete(id);
  };

  return (
    <div className="task">
      {title}
      {notes}
      <button className="btn" onClick={deleteTask}>
        x
      </button>
    </div>
  );
}

export default Task;
