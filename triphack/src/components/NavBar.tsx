import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-primary flex justify-end items-center pr-20 h-13 ">
      <ul className="flex space-x-6">
        <Link to="/" className="text-white font-bold">
          HomePage
        </Link>
        <Link to="/Test" className="text-white font-bold">
          Test
        </Link>
        <Link to="/onboarding" className="text-white font-bold">
          Login
        </Link>
      </ul>
    </nav>
  );
}
