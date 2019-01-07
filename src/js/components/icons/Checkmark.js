import React from "react";

export default function({ id, title, fill, width }) {
  return (
    <svg
      aria-labelledby={id}
      width={width}
      viewBox="0 0 32 32"
      fill={fill}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={id}>{title}</title>
      <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
    </svg>
  );
}
