import { useState } from "react";
import fullscreenIcon from "../res/icons/fullscreen-icon.svg";
import minimizedIcon from "../res/icons/minimized-icon.svg";
import windowedIcon from "../res/icons/windowed-icon.svg";
import exitIcon from "../res/icons/exit-icon.svg";
function TitleBarBtn({ imgSrc, btnType }) {
  // Three btn types:
  // 1: Minimize
  // 2: Fullscreen/Windowed
  // 3: Closed

  const [isFullScreen, setIsFullScreen] = useState(false);

  //   useEffect(() => {
  //     window.api.isFullScreen().then(setIsFullScreen);
  //   });

  const handleClick = () => {
    switch (btnType) {
      case 1:
        // window.api.minimize();
        window.api.windowControl("minimize");
        break;
      case 2:
        window.api.windowControl("toggle-fullscreen");
        setIsFullScreen((prev) => !prev);
        break;
      case 3:
        window.api.windowControl("close");
        break;
    }
  };

  return (
    <button
      className={`title-bar-btn ${
        btnType === 3 ? "hover:bg-red-500" : "hover:bg-gray-700"
      } h-[40px] w-[40px] flex justify-center items-center select-none`}
      onClick={handleClick}
    >
      <>
        {!isFullScreen && btnType === 2 ? (
          <img className="h-[25px]" src={fullscreenIcon} />
        ) : (
          <img className="h-[25px]" src={imgSrc} />
        )}
      </>
    </button>
  );
}

const titleBarBtnsData = [
  { imgSrc: minimizedIcon, btnType: "minimize" },
  { imgSrc: windowedIcon, btnType: "minimize" },
  { imgSrc: exitIcon, btnType: "exit" },
];

const TitleBar = () => {
  return (
    <div
      id="custom-title-bar"
      className="z-50 relative select-none pl-[30px] h-[40px] bg-black flex items-center justify-between box-border"
    >
      <div className="w-fit text-[--baseColor] font-bold">LINGOVAULT</div>
      <div className="flex items-center fixed right-0 top-0">
        {titleBarBtnsData.map((btn, index) => (
          <TitleBarBtn key={index} imgSrc={btn.imgSrc} btnType={index + 1} />
        ))}
      </div>
      {/* <Banner /> */}
    </div>
  );
};

export default TitleBar;
