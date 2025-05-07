import React from "react";

export const Button = ({ content }: { content: string }) => {
  return (
    <button
      style={{
        padding: "10px",
        backgroundColor: "var(--accent-color)",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      {content}
    </button>
  );
};
