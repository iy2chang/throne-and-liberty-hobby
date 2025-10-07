const API_URL = "/api/users";

export async function getUsers(
  page: number = 1,
  limit: number = 50,
  search = ""
) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) {
    query.append("search", search);
  }

  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_URL}?${query.toString()}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function getUser(id: string) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user:${id}`);
  }

  return res.json();
}
