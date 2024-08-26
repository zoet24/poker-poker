import React from "react";

interface ChipProps {
  size?: "sm" | "md";
}

const Chip: React.FC<ChipProps> = ({ size = "md" }) => {
  return (
    <div className="relative">
      <input
        className={`chip text-center ${size === "sm" && "chip--sm"}`}
        placeholder="10"
        type="number"
      ></input>
      {size === "md" && (
        <input
          className="bg-black h-8 w-8 rounded-full text-center text-sm absolute top-[-10px] right-[-10px] text-white"
          placeholder="10"
          type="number"
        ></input>
      )}
    </div>
  );
};

export default Chip;
