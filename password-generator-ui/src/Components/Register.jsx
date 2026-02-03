import { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import PasswordGeneratorModal from "./PasswordGeneratorModal";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);

  const handleRegister = async () => {
    try {
      const res = await api.post("/register", { username, password });
      toast.success(res.data);
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-2 rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={() => setShowGenerator(true)}
          className="text-sm text-blue-600 hover:underline mb-3"
        >
          Generate strong password
        </button>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </div>

      {showGenerator && (
        <PasswordGeneratorModal
          onSelect={(pwd) => {
            setPassword(pwd);
            setShowGenerator(false);
          }}
          onClose={() => setShowGenerator(false)}
        />
      )}
    </>
  );
}
