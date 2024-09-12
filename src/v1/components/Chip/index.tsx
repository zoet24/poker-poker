import React from "react";

interface ChipProps {
  size?: "sm" | "md";
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  index?: number;
}

const Chip: React.FC<ChipProps> = ({ size = "md", value, onChange, index }) => {
  return (
    <div className="relative">
      <input
        className={`chip text-center ${size === "sm" && "chip--sm"}`}
        placeholder="0"
        type="number"
        value={value ? value : ""}
        onChange={onChange}
      ></input>
      {size === "md" && (
        <input
          className="bg-black h-8 w-8 rounded-full text-center text-sm absolute top-[-10px] right-[-10px] text-white"
          placeholder="0"
          type="number"
        ></input>
      )}
    </div>
  );
};

export default Chip;
