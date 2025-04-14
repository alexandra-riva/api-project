import { useEffect, useState } from "react";
import "./AgeGate.css";

const AgeGate = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isAdult = localStorage.getItem("isAdult");
    if (!isAdult) {
      setShowModal(true);
      document.querySelector(".App")?.classList.add("blurred");
    }
  }, []);

  const handleResponse = (response) => {
    if (response === "yes") {
      localStorage.setItem("isAdult", "true");
      setShowModal(false);
      document.querySelector(".App")?.classList.remove("blurred");
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  if (!showModal) return null;

  return (
    <div className="age-overlay">
      <div className="age-modal">
        <h2>Are you 18 or older?</h2>
        <p>This site is for adults only. Please confirm your age to continue.</p>
        <div className="age-buttons">
          <button onClick={() => handleResponse("yes")}>Yes</button>
          <button onClick={() => handleResponse("no")}>No</button>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
