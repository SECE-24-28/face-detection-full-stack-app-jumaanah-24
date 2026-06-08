"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white shadow-lg rounded-2xl p-10 text-center w-[500px]">

        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Face Detection App
        </h1>

        <p className="text-slate-500 mb-8">
          Detect faces, age and gender using AI.
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Sign Up
          </button>

        </div>

      </div>

    </div>
  );
}