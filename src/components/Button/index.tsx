import React from "react";

// Define the interface for the Button props
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
