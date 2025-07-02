import React from "react";

type DividerType = "horizontal" | "vertical";

export interface DividerProps {
  className?: string;
  type?: DividerType;
  withContent?: string;
  contentClassName?: string;
  bgColor?: string;
}

export const Divider: React.FC<DividerProps> = ({
  className = "",
  type = "horizontal",
  withContent,
  contentClassName = "",
  bgColor,
}) => {
  const baseClasses = "relative bg-[var(--border-color)]";
  const typeClasses =
    type === "horizontal" ? "w-full h-0.5 my-4" : "h-full w-0.5 mx-4";

  const contentBgColor = bgColor || "inherit";

  return (
    <div
      className={`${baseClasses} ${typeClasses} ${className}`}
      role="separator"
      aria-orientation={type}
      aria-label={withContent || undefined}
    >
      {withContent && (
        <span
          className={`
            absolute px-3 py-1
            ${
              type === "horizontal"
                ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap"
            }
            ${contentClassName}
          `}
          style={{ backgroundColor: contentBgColor }}
        >
          {withContent}
        </span>
      )}
    </div>
  );
};
