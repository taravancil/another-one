import React, { useEffect } from "react";
import { findParent } from "../utils/dom";

function Modal(props) {
  const {
    visible,
    children,
    title,
    description,
    submitLabel,
    submit,
    close,
    feedbackMessage
  } = props;

  useEffect(() => {
    if (visible) {
      document.addEventListener("click", click);
      document.addEventListener("keyup", keyUp);
    }
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("keyup", keyUp);
    };
  });

  const click = e => {
    if (!findParent(e.target, "modal")) {
      close();
    }
  };

  const keyUp = e => {
    // ESC-key
    if (visible && e.keyCode === 27) {
      close();
    }
  };

  return (
    <div
      className="modal-wrapper"
      hidden={visible ? "" : "hidden"}
      role="dialog"
    >
      <div className="modal-container">
        <div className="modal">
          <div className="flex">
            <h1 className="modal-title">{title}</h1>
            <button className="btn modal-close-btn btn--plain" onClick={close}>
              Close
            </button>
          </div>

          {description ? (
            <p className="modal-description italic">{description}</p>
          ) : (
            ""
          )}
          {children}

          <button
            disabled={feedbackMessage || false}
            onClick={submit}
            className="btn modal-submit-btn btn--primary btn--full-width"
          >
            {feedbackMessage || submitLabel || "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
