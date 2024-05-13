import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Forgot from "./components/Forgot";
import Verify from "./components/Verify";
import Unauthorized from "./components/Unathorized";

function App() {
  let { param1 } = useParams();
  const onSuccess = (uname = "vasukotadiya7") => {
    window.location.href = "app://login?username=" + uname;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/:param1"
          element={<Login />}
          // element={<button onClick={onSuccess}>onSuccess</button>}
        />
        <Route path="/login/:param1" element={<Login />} />
        <Route path="/register/:param1" element={<Register />} />
        <Route path="/reset/:param1" element={<Reset />} />
        <Route path="/forgot/:param1" element={<Forgot />} />
        <Route path="/verify/:param1" element={<Verify />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="unauthorized/:param1" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
