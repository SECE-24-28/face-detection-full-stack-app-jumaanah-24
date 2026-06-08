"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
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
                login(
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

      if (result.errors) {
        alert(result.errors[0].message);
        return;
      }

      if (result.data?.login) {
        localStorage.setItem(
          "token",
          result.data.login.token
        );
        localStorage.setItem(
  "email",
  result.data.login.user.email
);

        setLoggedInEmail(
          result.data.login.user.email
        );

        setStatus("Login Successful ✅");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 flex justify-center items-center">

    <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

      <h1 className="text-4xl font-bold text-slate-800 text-center mb-2">
        Welcome Back
      </h1>

      <p className="text-center text-slate-500 mb-8">
        Login to your account
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        className="border border-slate-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        className="border border-slate-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium transition"
      >
        Login
      </button>

      <p className="text-center text-slate-500 mt-6">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer font-medium"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </span>
      </p>

    </div>

  </div>
);
}