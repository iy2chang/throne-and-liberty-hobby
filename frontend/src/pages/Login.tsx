import { useState } from "react";
import { login } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(username, password);
      localStorage.setItem("accessToken", data.access_token);

      // decode for user info
      const decoded: any = jwtDecode(data.access_token);
      console.log("decoded", decoded);
      navigate("/profile");
    } catch (e) {
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
        {loading ? "Loging in..." : "Login"}
      </button>
    </form>
  );
}
