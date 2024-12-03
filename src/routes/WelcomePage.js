import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="w-full h-full flex items-center justify-center text-white">
      <div className="select-none">
        <h5 className="text-3xl">Welcome to</h5>
        <h1 className="text-[calc(10px+5vw)] font-black">LINGOVAULT</h1>
        <p>Personal Vocabulary Builder App</p>
        <Link to="/name_input">
          <button className="bg-white text-lg font-medium px-5 mt-[10vh] py-2 tracking-wider rounded-full text-[--baseColor] select-none hover:bg-gray-100">
            START
          </button>
        </Link>
      </div>
    </div>
  );
}
