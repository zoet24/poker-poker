import React from "react";

// Define the interface for the Button props
interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
  <button onClick={onClick} className="btn">
    {text}
  </button>
);

export default Button;
