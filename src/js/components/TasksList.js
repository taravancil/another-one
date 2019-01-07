import React, { useState, useEffect } from "react";
import Task from "./Task";
import Dropdown from "./Dropdown";
import Sliders from "./icons/Sliders";

const SORTS = {
  CHRONOLOGICAL: (a, b) => a.createdAt > b.createdAt,
  REVERSE_CHRONOLOGICAL: (a, b) => b.createdAt > a.createdAt
};

function TasksList(props) {
  const [sortFunc, setSortFunc] = useState("REVERSE_CHRONOLOGICAL");
  const [hideCompleted, setHideCompleted] = useState(false);
  const [viewMode, setViewMode] = useState(localStorage.viewMode);
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  });

  if (props.tasks === null) {
    return (
      <div className="container">
        <p className="center large-text muted-text">Loading...</p>
      </div>
    );
  }

  const tasks = props.tasks
    .filter(t => (hideCompleted ? !t.completed : t))
    .sort(SORTS[sortFunc]);

  const dropdownButton = (
    <button className="btn btn--transparent dropdown-toggle-btn">
      <Sliders
        width="16"
        id="filters-and-sort"
        title="View filters and sort controls"
      />
    </button>
  );

  return (
    <div className="container">
      {props.tasks && props.tasks.length ? (
        <div className="tasks-list-info flex">
          {props.tasks.length ? (
            <div className="muted-text tiny-text">
              {props.tasks.length} tasks{" "}
            </div>
          ) : (
            ""
          )}
          <Dropdown toggleButton={dropdownButton} direction="left">
            <div className="dropdown-items">
              <label
                className="inline-heading uppercase-heading"
                htmlFor="hide-completed"
              >
                Hide completed tasks
              </label>
              <input
                id="hide-completed"
                type="checkbox"
                checked={hideCompleted}
                onChange={() => setHideCompleted(!hideCompleted)}
              />

              <br />

              <label
                htmlFor="sort"
                className="inline-heading uppercase-heading"
              >
                Sort
              </label>
              <select id="sort">
                <option
                  onClick={e => setSortFunc(e.target.value)}
                  value="REVERSE_CHRONOLOGICAL"
                >
                  Most recent tasks first
                </option>
                <option
                  onClick={e => setSortFunc(e.target.value)}
                  value="CHRONOLOGICAL"
                >
                  Oldest tasks first
                </option>
              </select>

              <br />

              <label className="inline-heading uppercase-heading">
                View mode
              </label>
              <button
                className="btn btn--plain tiny-text"
                disabled={viewMode === "collapsed"}
                onClick={() => setViewMode("collapsed")}
              >
                Collapsed
              </button>

              <button
                className="btn btn--plain tiny-text"
                disabled={viewMode !== "collapsed"}
                onClick={() => setViewMode("expanded")}
              >
                Expanded
              </button>
            </div>
          </Dropdown>
        </div>
      ) : (
        ""
      )}

      <div className="tasks-list">
        {tasks.map(task => (
          <Task
            key={task.id}
            {...task}
            collapsed={viewMode === "collapsed"}
            onDelete={props.onDeleteTask}
            onToggleCompleted={props.onToggleCompletedTask}
          />
        ))}

        {!props.tasks.length ? (
          <div className="empty-tasks-label center large-text muted-text">
            No tasks
            <div aria-hidden="true" style={{ fontSize: "40px" }}>
              ☼
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TasksList;
