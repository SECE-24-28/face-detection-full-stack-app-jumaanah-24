"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageData, setImageData] = useState("");
  const [faceData, setFaceData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imgWidth, setImgWidth] = useState(1);
  const [imgHeight, setImgHeight] = useState(1);
  const [displayWidth, setDisplayWidth] = useState(1);
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  const email = localStorage.getItem("email");

  if (email) {
    setUserEmail(email);
  }
}, [router]);
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");

  router.push("/");
};

  const handleDetect = async () => {
    setLoading(true);
    setImageData(imageUrl);

    try {
      const response = await fetch(
        "/api/detect-face",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl,
          }),
        }
      );

      const result = await response.json();

      console.log("FACE++ RESULT:", result);

      if (
        result.faces &&
        result.faces.length > 0
      ) {
        setFaceData(result.faces[0]);
      } else {
        alert("No face detected");
        setFaceData(null);
      }
    } catch (error) {
      console.error(error);
      alert("Detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-white text-black">

    {/* Navbar */}
    <nav className="w-full bg-gray-200 backdrop-blur-md border-b border-purple-500">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          Face Detection App
        </h1>

        <div className="flex items-center gap-6">

          <span className="text-lg text-black/80">
            👋 Welcome, {userEmail}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-400 hover:bg-red-500 px-5 py-2 rounded-lg transition text-white"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>

    {/* Main Content */}
    <div className="max-w-4xl mx-auto mt-16">

  <h1 className="text-5xl font-bold text-center text-gray-900">
    Face Detection
  </h1>

  <p className="text-center text-gray-500 mt-3 mb-10 text-lg">
    Detect a face to view age and gender details
  </p>

  <div className="space-y-5">

    <input
      type="text"
      placeholder="Paste image URL that contains a face..."
      className="w-full border border-gray-300 p-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
    />

    <div className="flex justify-center">
      <button
        onClick={handleDetect}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium"
      >
        {loading ? "Detecting..." : "Detect Face"}
      </button>
    </div>

  </div>

</div>

      {imageData && (
        <div className="mt-12 flex flex-wrap justify-center gap-8 items-start">

          <div className="relative w-full max-w-xl">

            <img
  src={imageData}
  alt="Face"
  className="w-full max-w-xl h-auto rounded-lg border shadow-lg"
  onLoad={(e) => {
    setImgWidth(e.currentTarget.naturalWidth);
    setImgHeight(e.currentTarget.naturalHeight);
    setDisplayWidth(e.currentTarget.width);
  }}
/>

            {faceData && (
              <div
                className="absolute border-4 border-green-400"
                style={{
  top: `${
    (faceData.face_rectangle.top * displayWidth) /
    imgWidth
  }px`,

  left: `${
    (faceData.face_rectangle.left * displayWidth) /
    imgWidth
  }px`,

  width: `${
    (faceData.face_rectangle.width * displayWidth) /
    imgWidth
  }px`,

  height: `${
    (faceData.face_rectangle.height * displayWidth) /
    imgWidth
  }px`,
}}
              />
            )}

          </div>

          {faceData && (
            <div className="bg-gray-200 border border-blue-400 p-6 rounded-xl w-80 shadow-xl">

              <h2 className="font-bold text-2xl mb-6">
                Detection Result
              </h2>

              <div className="space-y-4 text-lg">

                <p>
                  ✅ Face Detected
                </p>

                <p>
                  👤 Gender:
                  {" "}
                  {faceData.attributes.gender.value}
                </p>

                <p>
                   Age:
                  {" "}
                  {faceData.attributes.age.value}
                </p>

              </div>

            </div>
          )}

        </div>
      )}

    </div>

 
);
}