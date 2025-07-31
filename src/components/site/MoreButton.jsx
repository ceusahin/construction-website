import React from "react";

const Button = ({ text }) => {
  return (
    <button
      className="group relative bg-blue-500 h-16 w-64 border border-blue-500 text-left p-3 text-white text-base font-bold rounded-lg overflow-hidden
      hover:border-blue-400 hover:text-blue-100 hover:underline hover:underline-offset-4
      before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-blue-400 before:rounded-full before:blur-lg
      after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-blue-300 after:right-8 after:top-3 after:rounded-full after:blur-lg
      hover:before:right-12 hover:before:-bottom-8 hover:after:-right-8
      duration-500 before:duration-500 after:duration-500 group-hover:before:duration-500 group-hover:after:duration-500
      hover:decoration-2 origin-left"
    >
      {text}
    </button>
  );
};

export default Button;
