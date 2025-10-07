import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userService";

export default function Profile() {
  const [user, setUser] = useState("");
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

  return <h1>profile page</h1>;
}
