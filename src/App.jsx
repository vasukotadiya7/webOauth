import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Forgot from "./components/Forgot";
import Verify from "./components/Verify";
import Unauthorized from "./components/Unathorized";
import { useState } from "react";
import Validator from "./components/Validator";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function App() {
  const [access, setAccess] = useState({
    usertoken: "",
    accesstoken: "",
    validated: false,
    time: 0,
    redirect_url: "",
  });
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  // if (access.validated) {
  //   const navigate = useNavigate();
  //   navigate("/login");
  // }

  return (
    <div className="relative">
      {/* {access.validated && ( */}
      <div className="text-right justify-end  flex absolute z-50  bg-gray-400 dark:bg-gray-900  ">
        <DarkModeSwitch
          // style={{ marginBottom: "2rem" }}
          checked={dark}
          onChange={darkModeHandler}
          size={40}
          onClick={darkModeHandler}
        />
      </div>
      {/* )} */}
      <Routes>
        <Route path="/" element={<h2>Access Token Not Found</h2>} />
        <Route
          path="/:access_token"
          element={<Validator access={access} setAccess={setAccess} />}
          // element={<button onClick={onSuccess}>onSuccess</button>}
        />

        {/* <Route path="/" element={<h2>You were not supposed to be here</h2>} />
        <Route
          path="/:access_token"
          element={<h2>You were not supposed to be here</h2>}
        /> */}
        <Route
          path="/login"
          element={<Login access={access} setAccess={setAccess} />}
        />
        <Route
          path="/register"
          element={<Register access={access} setAccess={setAccess} />}
        />
        <Route
          path="/reset"
          element={<Reset access={access} setAccess={setAccess} />}
        />
        <Route
          path="/forgot"
          element={<Forgot access={access} setAccess={setAccess} />}
        />
        <Route
          path="/verify"
          element={<Verify access={access} setAccess={setAccess} />}
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;
