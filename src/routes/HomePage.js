import React from "react";
import Sidebar from "../components/Sidebar";
import WordTank from "../components/WordTank";

const HomePage = () => {
  return (
    <div className="h-full w-full box-border bg-red-100 flex z-30 border-5 border">
      <Sidebar />
      <div className="h-screen w-full z-30 box-border justify-center items-center flex flex-col relative bg-white">
        <WordTank />
      </div>
    </div>
  );
};

export default HomePage;
