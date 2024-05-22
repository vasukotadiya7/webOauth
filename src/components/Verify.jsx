import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Verify = ({ access }) => {
  var navigate = useNavigate();
  if (access.accesstoken == null || "") {
    navigate("/unauthorized");
  }
  const userVerification = async () => {
    await sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Email Sent");
        navigate("/login");
      })
      .catch(alert);
  };
  return (
    <div>
      <form method="POST" onSubmit={userVerification}>
        <input type="submit" value="Verify Email" />
      </form>
    </div>
  );
};

export default Verify;
