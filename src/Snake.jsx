import React from "react";

const Snake = ({ dots }) => {
  return (
    <>
      {dots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        };
        return <div className="snake-dot" key={i} style={style} />;
      })}
    </>
  );
};

export default Snake;
