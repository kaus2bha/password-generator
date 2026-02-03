import { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const res = await api.post("/login", { username, password });
    localStorage.setItem("token", res.data.token);
    toast.success("Login successful");
  } catch {
    toast.error("Invalid credentials");
  }
};


  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Login
      </button>
    </div>
  );
}
