import "./App.css";
import {
  RouterProvider,
  HashRouter as Router,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import WelcomePage from "./routes/WelcomePage";
import TitleBar from "./components/TitleBar";
import NameInputPage from "./routes/NameInputPage";
import HomePage from "./routes/HomePage";
import triangle from "./res/elements/triangle-bg-element.svg";
import triangle2 from "./res/elements/triangle-bg-element-2.svg";

const router = createHashRouter([
  { path: "/", element: <WelcomePage /> },
  { path: "/name_input", element: <NameInputPage /> },
  { path: "/home", element: <HomePage /> },
]);

  // const router = createHashRouter([
  //   { path: "/", element: <WelcomePage /> },
  //   { path: "/name_input", element: <NameInputPage /> },
  //   { path: "/home", element: <HomePage /> },
  // ]);

function App() {
  return (
    <div className="App h-screen">
      <TitleBar />
      <RouterProvider router={router} />
      <div className="z-0">
        <img
          alt="triangle element"
          className="fixed top-0 left-0 w-[20vw] triangle-bg-element"
          src={triangle}
        />
        <img
          alt="triangle element"
          className="fixed bottom-0 right-0 scale-[-1] w-[20vw] triangle-bg-element"
          src={triangle}
          style={{ animationDelay: "0s" }}
        />
        <img
          alt="triangle element"
          className="fixed bottom-24 left-20 w-[15vw] triangle-bg-element"
          src={triangle2}
          style={{ animationDelay: "1s" }}
        />
        <img
          alt="triangle element"
          className="fixed top-24 right-20 w-[15vw] scale-[-1] triangle-bg-element"
          src={triangle2}
          style={{ animationDelay: "2s" }}
        />
        <img
          alt="triangle element"
          className="fixed top-[20vh] left-[20vw] w-[5vw] scale-[-1] triangle-bg-element"
          src={triangle}
          style={{ animationDelay: ".3s" }}
        />
        <img
          alt="triangle element"
          className="fixed bottom-[20vh] right-[20vw] w-[5vw] triangle-bg-element"
          src={triangle}
          style={{ animationDelay: "2.2s" }}
        />
      </div>
    </div>
  );
}

export default App;
