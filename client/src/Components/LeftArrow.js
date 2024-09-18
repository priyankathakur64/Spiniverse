import React from "react";

const LeftArrow = ({ padding = "50px" }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        opacity: 1,
        position: "relative",
        padding: padding,
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          opacity: 1,
          transform:
            "perspective(1200px) translateX(0px) translateY(0px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0px)",
          borderRadius: "100px",
          right: "4px", // Adjusted to overlap with the line
          height: "7px",
          overflow: "hidden",
          position: "absolute",
          top: "calc(47.3684210526316% - 7px / 2)",
          width: "7px",
        }}
      ></div>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(242, 240, 245, 0) -2.97772e-12%, rgb(255, 255, 255) 100%)",
          opacity: 1,
          transform:
            "perspective(1200px) translateX(0px) translateY(0px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0px)",
          height: "1px",
          overflow: "hidden",
          position: "absolute",
          top: "calc(47.3684210526316% - 1px / 2)",
          right: "10px",
          left: "10px",
        }}
      ></div>
    </div>
  );
};

export default LeftArrow;
