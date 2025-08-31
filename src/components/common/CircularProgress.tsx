import React from "react";

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 40,
  strokeWidth = 4,
  progress = 0,
  color = "var(--accent-color)",
  backgroundColor = "var(--border-color)",
  showText = true,
  className = "",
}) => {
  console.log(`progress: ${progress}`);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg]"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
        />

        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.3s ease-in-out",
          }}
        />

        {/* Progress text */}
        {showText && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={Math.max(size * 0.2, 10)}
            fill={color}
            transform={`rotate(90, ${center}, ${center})`}
            style={{
              fontWeight: "600",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {Math.round(progress)}%
          </text>
        )}
      </svg>
    </div>
  );
};
