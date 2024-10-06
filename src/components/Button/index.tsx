import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => (
  <button onClick={onClick} disabled={disabled} className="btn">
    {text}
  </button>
);

export default Button;
