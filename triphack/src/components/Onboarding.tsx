import React from "react";
import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

export default function Onboarding() {
  const [wantToSignUp, setWantToSignUp] = useState(false);

  return (
    <section>
      <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full shadow-md p-4 max-w-sm 2xl:max-w-md">
          {wantToSignUp ? (
            <div>
              <SignUp />
              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?
                <button className="ml-1 hover:cursor-pointer" onClick={() => {setWantToSignUp(false)}}>Login Here</button>
              </p>
            </div>
          ) : (
            <div>
              <Login />
              <p className="mt-2 text-center text-sm text-gray-600">
                Don't have an account? 
                <button className="ml-1 hover:cursor-pointer" onClick={() => {setWantToSignUp(true)}}>Create one</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
