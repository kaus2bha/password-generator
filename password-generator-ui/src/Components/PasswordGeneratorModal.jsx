import { useState } from "react";
import api from "../api/api";

export default function PasswordGeneratorModal({ onSelect, onClose }) {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const generate = async () => {
    const res = await api.post("/generate", {
      length: 12,
      includeUpper: true,
      includeLower: true,
      includeNumbers: true,
      includeSymbols: true
    });

    setPassword(res.data.password);
    setStrength(res.data.strength);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">
          Generate Strong Password
        </h2>

        <button
          onClick={generate}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Generate
        </button>

        {password && (
          <div className="mt-4 text-center">
            <p className="font-mono break-all">{password}</p>
            <p className="mt-1 text-sm">Strength: <b>{strength}</b></p>

            <button
              onClick={() => onSelect(password)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Use this password
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
