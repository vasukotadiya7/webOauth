import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";

const Login = ({ access, setAccess }) => {
  var navigate = useNavigate();
  if (access.accesstoken == null || "") {
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
          const id =
            user.email.split("@")[0] +
            user.email.split("@")[1].split(".")[0] +
            user.email.split("@")[1].split(".")[1];
          //genrate usertoken with id through api
          const usertoken = id;
          window.open(`${access.redirect_url}?usertoken=${usertoken}`);
          // Navigate("/");
        } else {
          navigate(`/verify`);
          alert("Please verify your email first");
        }
      })
      .catch(alert);
  };
  return (
    <div className="h-screen overflow-y-hidden bg-gray-400 dark:bg-gray-900">
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <img
              className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              alt="side"
              src="https://source.unsplash.com/Mv9hjnEUHR4/600x800"
            ></img>
            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Login to Account!
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
                method="POST"
                onSubmit={userLogin}
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*********"
                    required
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                </div>

                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <p className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800">
                    <span
                      onClick={() => {
                        navigate(`/forgot`);
                      }}
                    >
                      Forgot Password?{" "}
                    </span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800">
                    Not have an account?
                    <span
                      onClick={() => {
                        navigate(`/register`);
                      }}
                    >
                      Just Create One
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
