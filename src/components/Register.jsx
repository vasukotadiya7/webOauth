import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import * as firebaseStorage from "firebase/storage";
import { useState } from "react";
import { auth, database, storage } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";

const Register = () => {
  const { param1 } = useParams();
  var navigate = useNavigate();
  if (param1 == null || "") {
    navigate("/unauthorized");
  }
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    age: 0,
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
    }
  };
  const userRegister = async (e) => {
    if (passmatch) {
      console.log(user);
      e.preventDefault();

      const hash = user.email.split("@");
      const id = new Date().getTime() + hash[0];

      const strref = firebaseStorage.ref(
        storage,
        "/profileimg/" + profilephoto.file.name
      );
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
      await set(ref(database, "users/" + id), user)
        .then(() => {
          createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
              // send verification mail.
              sendEmailVerification(userCredential.user);
              // signOut();
              alert(" Verification email sent");
              navigate(`/login/${param1}`);
            })
            .catch(alert);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Passwords does not match");
    }
    // window.location.href = "app://login?username=test2";
  };
  const handleChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <p>Param:{param1}</p>
      <form method="POST" onSubmit={userRegister}>
        <div>
          <label htmlFor="fileinput">
            {profilephoto.url ? (
              <img
                className="rounded-full w-32 hover:opacity-80"
                src={profilephoto.url}
                // width={128}
              />
            ) : (
              <img src="../assets/profile.jpeg"></img>
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
        <div>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Ex. John"
            onChange={handleChanges}
            required
          />
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Ex. Cena"
            onChange={handleChanges}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={handleChanges}
            required
            inputMode="decimal"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ex.johncena212@gmail.com"
            onChange={handleChanges}
            inputMode="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChanges}
            required
            inputMode=""
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input
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
            required
          />
        </div>
        {!passmatch && <p>passwords does not matchs</p>}
        <div>
          <input type="submit" value="Sign Up" />
        </div>
        <p>
          Already have an account?
          <span
            onClick={() => {
              navigate(`/login/${param1}`);
            }}
          >
            LogIn here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
