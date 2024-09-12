interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <div className="btn">{text}</div>;
};

export default Button;
