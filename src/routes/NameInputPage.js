import { Link } from "react-router-dom";

const NameInputPage = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="h-50%">
        <h1 className="text-white font-semibold text-[calc(3vw+20px)]">
          What's your name?
        </h1>
        <input
          className="rounded-md h-full w-full min-h-[50px] py-5 my-5 px-5 text-[3vw+10px]"
          type="text"
          placeholder="Enter your name..."
        />
        <Link to="/home">
          <button className="bg-white text-lg font-medium px-5 mt-[10vh] py-2 tracking-wider rounded-full text-[--baseColor] select-none hover:bg-gray-100">
            PROCEED
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NameInputPage;
