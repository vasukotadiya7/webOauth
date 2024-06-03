import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import * as firebaseStorage from "firebase/storage";
import { useState } from "react";
import { auth, database, db, storage } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const Register = ({ access, setAccess }) => {
  var navigate = useNavigate();
  if (access.accesstoken == null || "") {
    navigate("/unauthorized");
  }
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [passmatch, setPassmatch] = useState(true);
  const [profilephoto, setProfilephoto] = useState({ url: null, file: null });

  const photoUpdate = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilephoto({
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
      photoUpload(e);
    }
  };
  const photoUpload = async (e) => {
    const strref = firebaseStorage.ref(
      storage,
      "/profileimg/" + e.target.files[0].name
    );
    console.log(e.target.files[0].name);
    const uploadPhoto = firebaseStorage.uploadBytesResumable(
      strref,
      profilephoto.file
    );
    uploadPhoto.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.bytesTransferred / snapshot.totalBytes);
      },
      (error) => {
        console.error(error);
      },
      () => {
        firebaseStorage
          .getDownloadURL(uploadPhoto.snapshot.ref)
          .then((downloadURL) => {
            setUser({ ...user, ppurl: downloadURL });
          });
      }
    );
  };
  const userRegister = async (e) => {
    if (passmatch) {
      console.log(user);
      e.preventDefault();

      const id =
        user.email.split("@")[0] +
        user.email.split("@")[1].split(".")[0] +
        user.email.split("@")[1].split(".")[1];
      await setDoc(doc(db, "Users", id), user)
        .then(() => {
          createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
              // send verification mail.
              sendEmailVerification(userCredential.user);
              // signOut();
              alert(" Verification email sent");
              navigate(`/login`);
            })
            .catch(alert);
        })
        .catch((error) => {
          console.error(error);
        });
      // await set(ref(database, "users/" + id), user)
      //   .then(() => {
      //     createUserWithEmailAndPassword(auth, user.email, user.password)
      //       .then((userCredential) => {
      //         // send verification mail.
      //         sendEmailVerification(userCredential.user);
      //         // signOut();
      //         alert(" Verification email sent");
      //         navigate(`/login`);
      //       })
      //       .catch(alert);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } else {
      alert("Passwords does not match");
    }
    // window.location.href = "app://login?username=test2";
  };
  const handleChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen overflow-y-hidden bg-gray-400 dark:bg-gray-900">
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <img
              className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MDM4MDE5OQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600"
              alt="side"
            />
            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Create an Account!
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded "
                method="POST"
                onSubmit={userRegister}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className=" flex text-center justify-center md:hidden">
                    <label htmlFor="fileinput">
                      {profilephoto.url ? (
                        <img
                          className="rounded-full w-20 h-20 hover:opacity-80"
                          src={profilephoto.url}
                          // width={128}
                        />
                      ) : (
                        <img
                          className="rounded-full w-20 h-20 hover:opacity-80"
                          src="https://i.postimg.cc/NMcbhxc8/hg7.jpg"
                          alt="profile cover"
                        />
                      )}
                    </label>
                    <input
                      type="file"
                      id="fileinput"
                      accept="image/*"
                      onChange={photoUpdate}
                      hidden
                    />
                  </div>
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="fname"
                    >
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Ex. John"
                      onChange={handleChanges}
                      required
                    />
                  </div>
                  <div className="flex text-center justify-center max-md:hidden">
                    <label htmlFor="fileinput2">
                      {profilephoto.url ? (
                        <img
                          className="rounded-full w-20 h-20 hover:opacity-80"
                          src={profilephoto.url}
                          // width={128}
                        />
                      ) : (
                        <img src="../assets/profile.jpeg"></img>
                      )}
                    </label>
                    <input
                      type="file"
                      id="fileinput2"
                      accept="image/*"
                      onChange={photoUpdate}
                      hidden
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="lname"
                    >
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Ex. Cena"
                      onChange={handleChanges}
                      required
                    />
                  </div>
                </div>
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
                    id="email"
                    name="email"
                    placeholder="Ex.johncena212@gmail.com"
                    onChange={handleChanges}
                    inputMode="email"
                    required
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChanges}
                      required
                      placeholder="**********"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="password2"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="password"
                      id="password2"
                      name="password2"
                      onChange={(e) => {
                        // setUser({ ...user, password2: e.target.value });
                        if (user.password != e.target.value) {
                          setPassmatch(false);
                        } else {
                          setPassmatch(true);
                        }
                      }}
                      placeholder="**********"
                      required
                    />
                    {!passmatch && (
                      <p className="text-xs italic text-red-500">
                        Both Passwords are not same
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <p className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800">
                    Already have an account?
                    <span
                      onClick={() => {
                        navigate(`/login/`);
                      }}
                    >
                      LogIn here
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

export default Register;
