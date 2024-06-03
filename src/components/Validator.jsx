import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Validator = ({ access, setAccess }) => {
  const navigate = useNavigate();
  let { access_token } = useParams();

  useEffect(() => {
    console.log(access_token);
    const validate = async () => {
      const accesstoken = access_token;
      const uri = "https://weboauthapi.onrender.com/validatetoken";
      print(JSON.stringify({ accesstoken: accesstoken }));
      try {
        const response = await fetch(uri, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          muteHttpExceptions: true,
          body: JSON.stringify({ accesstoken: accesstoken }),
        });
        if (!response.ok) {
          console.log("Something went wrong!");
          return;
        }
        const data = await response.json();
        if (data.message) {
          alert(data.message);
          return;
        } else {
          data.validated = true;
          console.log("Success:", data);

          setAccess({
            accesstoken: access_token,
            validated: true,
            time: data.time,
            redirect_url: data.redirect,
          });
          navigate("/login");

          console.log(access);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };
    validate();
  }, []);
  // navigate("/login");
  return (
    <div>
      <h1>Validating.....</h1>
      {access_token}
    </div>
  );
};
export default Validator;
