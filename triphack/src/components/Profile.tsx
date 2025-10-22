import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";


export default function Profile() {
    const user = auth.currentUser

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
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
          <button onClick={handleLogOut} className="font-bold">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
