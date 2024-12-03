import warningIcon from "../res/icons/warning-icon.svg";

const Banner = () => {
  return (
    <div
      id="banner"
      className="flex w-full justify-center items-center absolute left-0 top-full px-10 py-2 bg-orange-700 z-[1000]"
    >
      <img
        className="w-6 bg-white rounded-full mr-2 p-[3px]"
        src={warningIcon}
      />
      <h1 className="text-white text-lg uppercase">Prototype</h1>
    </div>
  );
};

export default Banner;
