import React from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

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
    <nav className="bg-white flex justify-between items-center pl-5 h-13 shadow sticky top-0">
      <ul className="flex space-x-6">
        <Link to="/" className="text-primary font-bold text-2xl">
          TripHack
        </Link>
        <Link to="/Discover" className="text-primary font-bold text-2xl">
          Discover
        </Link>
      </ul>
      <div>
        {isLoggedIn ? (
          <Link to="/Profile" className="text-primary font-bold text-2xl pr-5">
            Profile
          </Link>
        ) : (
          <Link to="/onboarding" className="text-primary font-bold text-2xl pr-5">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
