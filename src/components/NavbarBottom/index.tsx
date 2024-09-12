import Button from "../Button";
import React from "react";

// Container for game controls at bottom of page
// When layout = game, it shows the game controls (play next round or reset game)

const NavbarBottom = () => {
  return (
    <div className="bg-white fixed bottom-0 left-0 right-0">
      NavbarBottom
      <div className="flex">
        <Button />
        <Button />
      </div>
    </div>
  );
};

export default NavbarBottom;
