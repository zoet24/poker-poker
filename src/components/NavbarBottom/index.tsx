import Button from "../Button";
import React from "react";

// Container for game controls at bottom of page
// When layout = game, it shows the game controls (play next round or reset game)

const NavbarBottom = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="box flex justify-center relative p-2">
        <div className="btn-pair">
          <Button text="Deal cards" />
          <Button text="Reset game" />
        </div>
      </div>
    </div>
  );
};

export default NavbarBottom;
