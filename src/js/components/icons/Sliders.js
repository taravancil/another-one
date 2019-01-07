import React from "react";

export default function({ id, title, fill, width }) {
  return (
    <svg
      aria-labelledby={id}
      viewBox="0 0 1792 1792"
      width={width}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={id}>{title}</title>
      <path d="m480 1408v128h-352v-128zm352-128q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19zm160-384v128h-864v-128zm-640-512v128h-224v-128zm1312 1024v128h-736v-128zm-960-1152q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19zm640 512q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19zm320 128v128h-224v-128zm0-512v128h-864v-128z" />
    </svg>
  );
}
