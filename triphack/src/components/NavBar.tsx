import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-primary flex justify-end items-center pr-20 h-13 ">
      <ul className="flex space-x-6">
        <Link to="/" className="text-white">
          HomePage
        </Link>
        <Link to="/Test" className="text-white">
          Test
        </Link>
        <Link to="/Onboarding" className="text-white">
          Login
        </Link>
      </ul>
    </nav>
  );
}
