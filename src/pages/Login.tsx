// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Example: hardcoded validation
    if (username === "username@example.com" && password === "123@abcABC") {
      // Redirect to dashboard
      navigate("/entity-dashboard/riffle-inc");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 max-w-sm mx-auto mt-20">
      <input
        type="text"
        placeholder="Username"
        className="border px-2 py-1"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-2 py-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}
