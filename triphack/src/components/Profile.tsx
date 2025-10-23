import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom"

export default function Profile() {
    const user = auth.currentUser
    const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("loggedIn", "false");
        navigate("/Onboarding");
        console.log("signout success");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center px-5 py-2">
          <h1>{user?.email}</h1>
          <button onClick={handleLogOut} className="font-bold hover:cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
