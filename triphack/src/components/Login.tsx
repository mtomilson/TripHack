import React from "react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  return (
    <div className="flex items-center justify-center h-150">
      <form className="bg-secondary w-50 items-start">
        <input
          onChange={setEmail}
          placeholder="Email"
          className="border-3 border-primary p-2"
        ></input>
        <input
          onChange={setPassword}
          placeholder="Password"
          className="border-3 border-primary p-2"
        ></input>
        <button className="border-3 border-primary hover:cursor-pointer">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
