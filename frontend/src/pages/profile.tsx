import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userService";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decoded: any = jwtDecode(token);
        const id = decoded.sub;
        const res = await getUser(id);
        console.log("res", res);
        setUser(res);
      } catch (e) {
        console.error(e);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">User Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">User ID: {user._id}</p>
          <p className="card-text">
            Role: {user.isAdmin ? "Administrator" : "Standard User"}
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
