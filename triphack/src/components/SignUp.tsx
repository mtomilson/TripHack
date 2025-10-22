import React from "react";
import { auth } from "../firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";

export default function SignUp() {
  const [email, setEmail] = useState<string>(""); //set email takes parameters of string only or undefined, default state is undefined
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");


  const canSignUp =
    email !== undefined &&
    password !== undefined &&
    confirmPass !== undefined &&
    password === confirmPass;

  const handleSignUp = (e: React.FormEvent) => {
    // fixes render problem where when submitting form it would refresh the page and take to login page
    e.preventDefault();
    if (canSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.uid, " Successfully signed up");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Create your Account</h2>
      <form className="mt-5" onSubmit={handleSignUp}>
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
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-black">
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                placeholder="Confirm Password"
                className="flex h-10 w-full rounded-md border
                 border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400
                 focus:outline-none focus:ring-1 focus:ring-gray-400 offset-1 disabled:cursor-not-allowed
                 disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSignUp}
            className="bg-black font-semibold text-white rounded-md h-10 w-full
                inline-flex items-center justify-center px-3.5 py-2.5 leading-7 hover:bg-black/80 disabled:cursor-not-allowed"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
