import { sendPasswordResetEmail } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useState } from "react";

const Forgot = ({ access }) => {
  var navigate = useNavigate();
  if (access.accesstoken == null || "") {
    navigate("/unauthorized");
  }
  const [email, setEmail] = useState("");
  const userForogt = async () => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate(`/login}`);
      })
      .catch(alert);
  };
  return (
    <div>
      <form method="POST" onSubmit={userForogt}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          id="email"
          placeholder="exmaple@gmail.com"
          inputMode="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input type="submit" value="Send Reset Link" />
      </form>
    </div>
  );
};

export default Forgot;
