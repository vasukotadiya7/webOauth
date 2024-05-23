import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Validator = ({ access, setAccess }) => {
  const navigate = useNavigate();
  let { access_token } = useParams();
  useEffect(() => {
    setAccess({ ...access, accesstoken: access_token });

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
          setAccess({
            ...access,
            redirect_url: data.redirect,
            time: data.time,
          });
          setAccess({ ...access, validated: true });
        }
        console.log("Success:", data);
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
      {access.validated ? navigate("/login") : <h1>Validating.....</h1>}
      {access.accesstoken}
    </div>
  );
};
export default Validator;
