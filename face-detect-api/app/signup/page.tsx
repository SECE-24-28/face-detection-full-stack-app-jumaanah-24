"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              mutation {
                signup(
                  username: "${username}",
                  email: "${email}",
                  password: "${password}"
                ) {
                  token
                  user {
                    id
                    email
                  }
                }
              }
            `,
          }),
        }
      );

      const result = await response.json();

      console.log("SIGNUP RESULT:", result);

      if (result.errors) {
        alert(result.errors[0].message);
        return;
      }

      alert("Signup Successful ✅");

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

 return (
  <div className="min-h-screen bg-slate-100 flex justify-center items-center">

    <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

      <h1 className="text-4xl font-bold text-slate-800 text-center mb-2">
        Create Account
      </h1>

      <p className="text-center text-slate-500 mb-8">
        Sign up to get started
      </p>

      <input
        type="text"
        placeholder="Enter your username"
        className="border border-slate-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter your email"
        className="border border-slate-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Create a password"
        className="border border-slate-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium transition"
      >
        Sign Up
      </button>

      <p className="text-center text-slate-500 mt-6">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer font-medium"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </p>

    </div>

  </div>
);
}