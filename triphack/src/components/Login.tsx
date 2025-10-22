import React, { type FormEvent } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import { Link } from "react-router-dom";
import Test from "./Test";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userr, setUser] = useState<UserCredential>();

  const canLogin = email !== "" && password !== "";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (canLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setUser(user);
          console.log(user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">
        Sign in to your account
      </h2>
      <form className="mt-5" onSubmit={handleLogin}>
        <div className="space-y-5">
          <div>
            <label className="text-base font-medium text-black">
              Email Address
            </label>
            <div className="mt-2">
              <input
                placeholder="Email"
                className="flex h-10 w-full rounded-md border
                 border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400
                 focus:outline-none focus:ring-1 focus:ring-gray-400 offset-1 disabled:cursor-not-allowed
                 disabled:opacity-50"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-black">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                placeholder="Password"
                className="flex h-10 w-full rounded-md border
                 border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400
                 focus:outline-none focus:ring-1 focus:ring-gray-400 offset-1 disabled:cursor-not-allowed
                 disabled:opacity-50"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <Link to="/Test">
            <button
              type="submit"
              disabled={!canLogin}
              className="bg-black font-semibold text-white rounded-md h-10 w-full hover:cursor-pointer
                inline-flex items-center justify-center px-3.5 py-2.5 leading-7 hover:bg-black/80 disabled:cursor-not-allowed"
              onClick={handleLogin}
            >
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
