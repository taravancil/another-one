import React, { useEffect, useState } from "react";

export default function() {
  const [count, setCount] = useState(0);
  useEffect(
    () => {
      document.title = count;
    },
    [count]
  );

  return (
    <div className="container">
      <p>You clicked {count} times</p>
      <button className="btn" onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  );
}
