import React, { useEffect, useState } from "react";

function LinksInput() {
  const [links, setLinks] = useState([]);
  const [isInputOpen, setIsInputOpen] = useState(false);

  let linkInput = null;
  useEffect(
    () => {
      if (linkInput && isInputOpen) {
        linkInput.focus();
      }
    },
    [isInputOpen]
  );

  return (
    <div className="links-input">
      {links.map(l => (
        <div>l</div>
      ))}
      <button
        onClick={() => {
          setIsInputOpen(true);
        }}
        type="button"
        hidden={isInputOpen ? "hidden" : ""}
        className="btn btn--plain"
      >
        Add a link +
      </button>

      <p>
        <input
          ref={input => {
            linkInput = input;
          }}
          name="link"
          placeholder="Add a link"
          type="text"
          hidden={isInputOpen ? "" : "hidden"}
        />
      </p>
    </div>
  );
}

export default LinksInput;
