import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("username", username);
    console.log("password", password);
    try {
      await register(username, password);
      navigate("/login");
    } catch (e: any) {
      setError(e.response?.err?.message || "Registration Faile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>username</label>
        <input
          type="text"
          className="form-control"
          id="usernameInput"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>password</label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Register..." : "Register"}
      </button>
    </form>
  );
}
