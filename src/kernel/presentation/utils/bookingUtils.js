export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const diff = Math.round((b - a) / 86400000);
  return Math.max(1, diff);
}

export function calcTotals(roomPrice, nights, rooms) {
  const subtotal = roomPrice * nights * rooms;
  const taxes = Math.round(subtotal * 0.18);
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal + taxes - discount;
  return { subtotal, taxes, discount, total };
}

export function fmtINR(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}
