import { useEffect, useState } from "react";
import { getCurrentUser, subscribe } from "./authStore.js";

export default function useAuth() {
  const [user, setUser] = useState(() => getCurrentUser());
  useEffect(() => subscribe(() => setUser(getCurrentUser())), []);
  return user;
}
