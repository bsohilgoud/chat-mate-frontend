import clsx from "clsx";
import React from "react";

type dividerType = "horizontal" | "vertical";

export const Divider = ({
  className,
  type,
  content,
}: {
  className?: string;
  type: dividerType;
  content?: string;
}) => {
  return type === "horizontal" ? (
    <div
      className={clsx(
        className,
        "w-full h-0.5 bg-[var(--border-color)] px-4 my-4",
      )}
    />
  ) : (
    <div
      className={clsx(
        className,
        "h-full w-0.5 bg-[var(--border-color)] py-4 mx-4",
      )}
    />
  );
};
