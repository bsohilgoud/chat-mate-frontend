import React from "react";
import styled from "styled-components";

type InputFieldProps = {
  type: string;
  placeHolder?: string;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = styled.input`
  outline: none;
  padding: 1.3rem;
  border-radius: 1rem;
  background-color: var(--primary-color);
  border: 1px solid var(--border-color);
  color: var(--text-primary);

  &:focus {
    border-color: var(--accent-color);
  }
`;

export const InputField = ({
  type,
  placeHolder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <Input
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
    />
  );
};
