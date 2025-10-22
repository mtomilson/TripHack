import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      setUser(user);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <nav className="bg-primary flex justify-between items-center pl-3 h-13 ">
      <ul className="flex space-x-6">
        <Link to="/" className="text-white font-bold">
          HomePage
        </Link>
        <Link to="/Discover" className="text-white font-bold">
          Discover
        </Link>

        {isLoggedIn ? (
          <Link to="/Profile" className="text-white font-bold">
            Profile
          </Link>
        ) : (
          <Link to="/onboarding" className="text-white font-bold">
            Login
          </Link>
        )}
      </ul>
        <div>
          <h1 className="text-white pr-5 font-extrabold text-4xl">
            TripHack
          </h1>
        </div>

    </nav>
  );
}
