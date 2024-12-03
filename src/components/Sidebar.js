import { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

const SidebarNav = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`min-h-[50px] flex justify-center items-center cursor-pointer ${
        isHovered ? "bg-green-700" : "bg-[--baseColor]"
      } text-white font-semibold`}
    >
      {text}
    </li>
  );
};

const Sidebar = () => {
  const { width, height } = useWindowSize();

  if (width >= 700) {
    return (
      <div className="w-[5vw] h-full bg-[--baseColor] min-w-[200px] flex flex-col justify-around items-center box-border py-10 *:select-none z-30">
        <div>
          <div className="bg-white w-32 h-32 rounded-full"></div>
          <h5 className="py-5 text-lg text-white font-bold">Kyle Revin</h5>
        </div>
        <div className="w-full bg-blue-400">
          <ul className="">
            <SidebarNav text="Take a Quiz" />
            <SidebarNav text="Add to Queue" />
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Sidebar;
