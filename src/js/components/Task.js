import React from "react";

function Task(props) {
  const { id, title, notes } = props;

  return (
    <div key={id} className="task">
      {title}
      {notes}
    </div>
  );
}

export default Task;
