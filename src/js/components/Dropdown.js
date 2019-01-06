import React, { useState, useEffect } from "react";
import { findParent } from "../utils/dom";

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", click);
    if (isOpen) {
      document.addEventListener("keyup", keyUp);
    }
    return () => {
      document.removeEventListener("keyup", keyUp);
      document.body.removeEventListener("click", click);
    };
  });

  const keyUp = e => {
    // ESC-key
    if (isOpen && e.keyCode === 27) {
      setIsOpen(false);
    }
  };

  const click = e => {
    if (isOpen) {
      setIsOpen(false);
    } else if (findParent(e.target, "dropdown-container")) {
      setIsOpen(true);
    }
  };

  return (
    <div className="dropdown-container">
      {props.toggleButton}
      <div className="dropdown" hidden={isOpen ? "" : "hidden"}>
        {props.children}
      </div>
    </div>
  );
}

export default Dropdown;
