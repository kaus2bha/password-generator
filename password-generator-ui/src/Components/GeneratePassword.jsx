import { useState, useEffect } from "react";
import api from "../api/api";
import { toast } from "react-toastify";


export default function GeneratePassword() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const generate = async () => {
  try {
    const res = await api.post("/generate", {
      length: 12,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
      includeSymbols: true
    });

    setPassword(res.data.password);
    setStrength(res.data.strength);
    toast.success("Password generated successfully");
  } catch {
    toast.error("Failed to generate password");
  }
};

useEffect(() => {
  if (!localStorage.getItem("token")) {
    toast.error("Please login first");
  }
}, []);

if (!localStorage.getItem("token")) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-80 text-center">
      Login required to generate password
    </div>
  );
}

  const strengthColor = () => {
    if (strength === "WEAK") return "text-red-600";
    if (strength === "MEDIUM") return "text-yellow-500";
    if (strength === "STRONG") return "text-green-600";
    return "";
  };

  const strengthBar = () => {
    if (strength === "WEAK") return "w-1/3 bg-red-500";
    if (strength === "MEDIUM") return "w-2/3 bg-yellow-500";
    if (strength === "STRONG") return "w-full bg-green-500";
    return "w-0";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Generate Password
      </h2>

      <button
        onClick={generate}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Generate
      </button>

      {password && (
        <div className="mt-4">
          <p className="font-mono break-all text-center">
            {password}
          </p>

          <p className={`text-center mt-2 font-semibold ${strengthColor()}`}>
            Strength: {strength}
          </p>

          {/* Strength Bar */}
          <div className="w-full h-2 bg-gray-200 rounded mt-2">
            <div
              className={`h-2 rounded transition-all duration-300 ${strengthBar()}`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
