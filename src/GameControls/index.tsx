import React from "react";

const GameControls = () => {
  return (
    <div className="fixed top-0 left-0 right-0 shadow-lg">
      <div className="container flex items-center justify-center space-x-1 !h-20">
        <div className="card card--sm card--rotate"></div>
        <div className="card card--sm"></div>
        <div className="card card--sm"></div>
        <div className="card card--sm"></div>
        <div className="card card--sm"></div>
        <div className="card card--sm"></div>
        <div className="card card--sm card--rotate"></div>
      </div>
      <div className="pot-value">100</div>
    </div>
  );
};

export default GameControls;
