import React, { useEffect, useState } from "react";

function Search(props) {
  const [q, setQ] = useState("");
  const [t, setT] = useState(null);

  const change = e => {
    clearTimeout(t);
    const v = e.target.value;
    setQ(v);

    setT(
      setTimeout(() => {
        props.onUpdateQuery(v);
      }, props.delay || 500)
    );
  };

  return (
    <form role="search">
      <input
        type="text"
        name="search"
        value={q}
        onChange={change}
        aria-label="Search tasks"
        placeholder="Search tasks"
        className="search small-text"
      />
    </form>
  );
}

export default Search;
