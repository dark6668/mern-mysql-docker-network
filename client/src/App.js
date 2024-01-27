import React, { useRef, useState } from "react";
import "./App.css";
import FetchRequest from "./function/utility";
// process.env.the name you gived in the docker-compose to the var

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [buttonPosition, setButtonPosition] = useState({ x: 150, y: 100 });
  const containerMouse = useRef(null);
  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const testFetch = async () => {
    const request = {
      method: "GET",
      url: "api/users/getUser",
      body: JSON.stringify({}),
      ContentType: "application/json; charset=UTF-8",
    };

    FetchRequest(request)
      .then((result) => {
        console.log(result);
      })
      .catch((errorData) => {
        console.error(errorData.err);
      });
  };

  const moveMouse = () => {
    if (containerMouse.current) {
      const containerWidth = containerMouse.current.offsetWidth;
      const containerHeight = containerMouse.current.offsetHeight;

      setButtonPosition((prev) => ({
        x: Math.floor(Math.random() * (containerWidth - 10)) + 10,
        y: Math.floor(Math.random() * (containerHeight - 10)) + 10,
      }));
    }
  };

  const openLoveSong = () => {
    // Replace this link with your desired YouTube love song URL
    window.open("https://youtu.be/UkJMvQRhNRk?si=Hgw0KOaczt-rccaC&t=95");
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 via-red-300 to-purple-200 min-h-screen"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg text-center mb-6">
        <p className="text-3xl font-bold text-gray-800 mb-4">
          In the quiet moments when the world fades away, and love is the only
          language spoken, there's a story unfolding, a beautiful melody of
          hearts intertwined.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          As the days turn into nights and the seasons change, emotions weave
          through the tapestry of shared experiences. In the symphony of
          laughter and the gentle whispers of affection, a lingering question
          hangs in the air like the echo of a love song.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Within the harmonious dance of two souls, one wonders: Is there love
          for David? It's a simple question, yet its answer holds the key to the
          next chapter of this story. In the soft glow of shared affection,
          under the stars that witness the journey, the question remains: Do you
          love David?
        </p>
      </div>

      <div
        ref={containerMouse}
        style={{ position: "relative", width: "500px", height: "200px" }}
        className="flex justify-center "
      >
        <button
          style={{
            position: "absolute",
            top: `${buttonPosition.y}px`,
            left: `${buttonPosition.x}px`,
            transform: "translate(-50%, -50%)",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
          }}
          onMouseEnter={moveMouse}
          className="bg-pink-500 text-white p-3 rounded-md hover:bg-pink-600 focus:outline-none focus:shadow-outline-pink"
        >
          NO
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button
            onClick={testFetch}
            className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
