import React from "react";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-green-100  bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-24 h-24 border-t-8 border-b-8 border-green-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
