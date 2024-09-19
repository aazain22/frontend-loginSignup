

import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

const Image = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 100 - 50;
    const y = (e.clientY / innerHeight) * 100 - 50;
    setOffsetX(x);
    setOffsetY(y);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-950 px-4 sm:px-0">
      <div className="text-center mb-6 p-4 max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-50">
          Hello, I am Aazain Shah
        </h1>
        <p className="text-sm sm:text-lg text-stone-50 mt-4">
          Welcome to all the Gen Z out there as this platform is dedicated for you to learn new things so that technology can reach greater heights—and only you people can do it!
        </p>
      </div>

      <div className="flex justify-center items-center w-full">
        <Tilt
          className="shadow-lg rounded-lg"
          tiltMaxAngleX={20}
          tiltMaxAngleY={20}
          glareEnable={true}
          glareMaxOpacity={0.4}
          glareColor="lightblue"
          glarePosition="bottom"
          scale={1.05}
          transitionSpeed={250}
        >
          <img
            src="https://media.istockphoto.com/id/1303662978/vector/3d-isometric-flat-vector-conceptual-illustration-of-generation-z.jpg?s=612x612&w=0&k=20&c=nm1sxGLGCSYrszH814xg4IrXw_cKdKeT4hZRAgDzhCU="
            alt="Tilted Image"
            className="w-64 h-64 sm:w-96 sm:h-96 object-cover rounded-lg"
          />
        </Tilt>
      </div>
    </div>
  );
};

export default Image;


