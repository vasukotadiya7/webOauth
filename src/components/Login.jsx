import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";

const Login = () => {
  const { param1 } = useParams();
  var navigate = useNavigate();
  if (param1 == null || "") {
    navigate("/unauthorized");
  }
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const userLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        if (user.emailVerified) {
          // window.location.href(`app://login/userid=${user.email}`);
          window.open(`app://login?accesstoken=${user.email}`);
          // Navigate("/");
        } else {
          navigate(`/verify/${param1}`);
          alert("Please verify your email first");
        }
      })
      .catch(alert);
  };
  return (
    <div>
      <form method="POST" onSubmit={userLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          id="email"
          placeholder="exmaple@gmail.com"
          inputMode="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <h6
          onClick={() => {
            navigate(`/forgot/${param1}`);
          }}
        >
          Forgot Password?
        </h6>
        <input type="submit" value="login" />
        <p>
          Not have an account?
          <span
            onClick={() => {
              navigate(`/register/${param1}`);
            }}
          >
            Just Create One
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
