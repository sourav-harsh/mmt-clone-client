// Lightweight client-side auth + bookings store backed by localStorage.
// This is a frontend-only demo — do NOT use for real authentication.

const USERS_KEY = "mmt_users";
const SESSION_KEY = "mmt_session";
const BOOKINGS_KEY = "mmt_bookings";

const read = (k, fallback) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());
export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export function getCurrentUser() {
  const email = read(SESSION_KEY, null);
  if (!email) return null;
  const users = read(USERS_KEY, {});
  return users[email] || null;
}

export function signup({ firstName, lastName, email, phone, password }) {
  const users = read(USERS_KEY, {});
  const key = email.toLowerCase().trim();
  if (users[key]) throw new Error("An account with this email already exists.");
  const user = {
    firstName,
    lastName,
    email: key,
    phone,
    password, // demo only
    city: "",
    dob: "",
    gender: "",
    createdAt: new Date().toISOString(),
  };
  users[key] = user;
  write(USERS_KEY, users);
  write(SESSION_KEY, key);
  notify();
  return user;
}

export function login({ email, password }) {
  const users = read(USERS_KEY, {});
  const key = email.toLowerCase().trim();
  const u = users[key];
  if (!u || u.password !== password) throw new Error("Invalid email or password.");
  write(SESSION_KEY, key);
  notify();
  return u;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  notify();
}

export function updateProfile(patch) {
  const u = getCurrentUser();
  if (!u) throw new Error("Not logged in.");
  const users = read(USERS_KEY, {});
  users[u.email] = { ...u, ...patch, email: u.email };
  write(USERS_KEY, users);
  notify();
  return users[u.email];
}

// Bookings
export function getAllBookings() {
  const u = getCurrentUser();
  if (!u) return [];
  const all = read(BOOKINGS_KEY, {});
  return (all[u.email] || []).slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function addBooking(booking) {
  const u = getCurrentUser();
  if (!u) throw new Error("Login required to book.");
  const all = read(BOOKINGS_KEY, {});
  const list = all[u.email] || [];
  const record = {
    id: booking.id || `MMT${Math.floor(Math.random() * 9_000_000 + 1_000_000)}`,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    ...booking,
  };
  list.push(record);
  all[u.email] = list;
  write(BOOKINGS_KEY, all);
  notify();
  return record;
}

export function cancelBooking(bookingId) {
  const u = getCurrentUser();
  if (!u) return;
  const all = read(BOOKINGS_KEY, {});
  const list = (all[u.email] || []).map((b) =>
    b.id === bookingId ? { ...b, status: "Cancelled" } : b
  );
  all[u.email] = list;
  write(BOOKINGS_KEY, all);
  notify();
}
