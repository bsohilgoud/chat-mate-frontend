import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";

type InputFieldProps = {
  type: "text" | "password" | "email";
  placeHolder?: string;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// const Input = styled.input`
//   outline: none;
//   padding: 1.3rem;
//   border-radius: 1rem;
//   background-color: var(--primary-color);
//   border: 1px solid var(--border-color);
//   color: var(--text-primary);

//   &:focus {
//     border-color: var(--accent-color);
//   }
// `;

export const InputField = ({
  type,
  placeHolder,
  value,
  onChange,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const hasValue = value?.length > 0;
  const shouldFloatLabel = isFocused || hasValue;

  return (
    <div className="relative w-full mb-2">
      <div className="relative">
        <input
          className={`w-full p-4 pt-6 border-2 rounded-xl outline-none transition-all duration-200 bg-[var(--secondary-color)] border-[1px] text-[var(--text-primary)]
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : shouldFloatLabel
                ? "border-[var(--accent-color)] focus:border-[var(--accent-color)]"
                : "border-[var(--border-color)] focus:border-[var(--border-color)]"
          }
        `}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <label
          className={`absolute left-3 transition-all duration-200 pointer-events-none bg-[var(--secondary-color)] px-2 ${shouldFloatLabel ? "-top-3 text-[1.25rem] text-[var(--accent-color)] font-medium" : "top-1/2 -translate-y-1/2 text-gray-500 bg-transparent px-0"}`}
        >
          {placeHolder}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
