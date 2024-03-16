import React from "react";
import Navbar from "../component/Navbar";
import panda from "../images/panda404.png"

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[81vh]">
        {/* <p className="fort-semibold text-4xl">Oops! Page Not Found</p> */}
        <img src={panda}></img>
      </div>
    </>
  );
};

export default NotFound;
