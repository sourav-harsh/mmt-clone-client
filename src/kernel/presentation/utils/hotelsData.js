export const hotels = [
  {
    id: "taj-palace",
    name: "The Taj Palace",
    city: "New Delhi",
    address: "2, Sardar Patel Marg, Diplomatic Enclave, New Delhi",
    rating: 4.7,
    reviews: 2310,
    price: 8999,
    img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
    ],
    amenities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Restaurant", "Gym", "Parking", "Bar", "Room Service"],
    description:
      "An iconic luxury hotel set on lush gardens in the heart of the capital. Awarded for service, dining and timeless Indian hospitality.",
    rooms: [
      { id: "deluxe", name: "Deluxe Room", bed: "1 King Bed", size: "38 sqm", price: 8999, breakfast: true, refundable: true },
      { id: "club", name: "Taj Club Room", bed: "1 King / 2 Twin", size: "42 sqm", price: 12499, breakfast: true, refundable: true },
      { id: "suite", name: "Luxury Suite", bed: "1 King Bed", size: "70 sqm", price: 21999, breakfast: true, refundable: false },
    ],
  },
  {
    id: "oberoi-grand",
    name: "Oberoi Grand",
    city: "Kolkata",
    address: "15, Jawaharlal Nehru Road, Kolkata",
    rating: 4.8,
    reviews: 1820,
    price: 11200,
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1576675784201-0e142b423952?w=1200",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
    ],
    amenities: ["Free Wi-Fi", "Pool", "Spa", "Multi-cuisine", "Gym", "Valet"],
    description:
      "Heritage colonial-era hotel known as the Grande Dame of Kolkata with elegant rooms and award-winning restaurants.",
    rooms: [
      { id: "premier", name: "Premier Room", bed: "1 King Bed", size: "32 sqm", price: 11200, breakfast: true, refundable: true },
      { id: "deluxe-suite", name: "Deluxe Suite", bed: "1 King Bed", size: "55 sqm", price: 18500, breakfast: true, refundable: true },
    ],
  },
  {
    id: "leela-sky",
    name: "Leela Sky Villas",
    city: "Mumbai",
    address: "Sahar, Andheri East, Mumbai",
    rating: 4.6,
    reviews: 980,
    price: 15750,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200",
      "https://images.unsplash.com/photo-1559599238-308793637427?w=1200",
    ],
    amenities: ["Free Wi-Fi", "Pool", "Spa", "Airport Shuttle", "Restaurant", "Bar"],
    description:
      "Contemporary luxury near the airport with skyline views, multiple restaurants and a serene rooftop pool.",
    rooms: [
      { id: "deluxe", name: "Deluxe King", bed: "1 King Bed", size: "36 sqm", price: 15750, breakfast: false, refundable: true },
      { id: "club", name: "Club Room", bed: "1 King Bed", size: "40 sqm", price: 19500, breakfast: true, refundable: true },
      { id: "villa", name: "Sky Villa", bed: "1 King + Living", size: "85 sqm", price: 34999, breakfast: true, refundable: false },
    ],
  },
  {
    id: "itc-royal",
    name: "ITC Royal Bengal",
    city: "Bengaluru",
    address: "Windsor Square, Bengaluru",
    rating: 4.5,
    reviews: 1455,
    price: 7200,
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200",
    ],
    amenities: ["Free Wi-Fi", "Pool", "Spa", "Gym", "Multiple Restaurants"],
    description:
      "Responsible luxury at its finest with signature ITC hospitality, gourmet cuisine and tranquil interiors.",
    rooms: [
      { id: "executive", name: "Executive Club", bed: "1 King Bed", size: "34 sqm", price: 7200, breakfast: true, refundable: true },
      { id: "tower", name: "Tower Suite", bed: "1 King Bed", size: "60 sqm", price: 13500, breakfast: true, refundable: true },
    ],
  },
  {
    id: "goa-marriott",
    name: "Goa Marriott Resort",
    city: "Goa",
    address: "Miramar Beach, Panjim, Goa",
    rating: 4.4,
    reviews: 3120,
    price: 9800,
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
    ],
    amenities: ["Beachfront", "Pool", "Spa", "Casino", "Bar", "Kids Club"],
    description:
      "Beachfront resort overlooking the Arabian Sea, walking distance to Miramar, with multiple dining options.",
    rooms: [
      { id: "deluxe-sea", name: "Deluxe Sea View", bed: "1 King Bed", size: "38 sqm", price: 9800, breakfast: true, refundable: true },
      { id: "executive", name: "Executive Suite", bed: "1 King Bed", size: "62 sqm", price: 17500, breakfast: true, refundable: true },
    ],
  },
  {
    id: "jaipur-rambagh",
    name: "Rambagh Palace",
    city: "Jaipur",
    address: "Bhawani Singh Road, Jaipur",
    rating: 4.9,
    reviews: 2604,
    price: 24500,
    img: "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=1200",
      "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=1200",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200",
    ],
    amenities: ["Heritage", "Pool", "Spa", "Royal Dining", "Garden", "Butler"],
    description:
      "Former residence of the Maharaja of Jaipur, now a palace hotel renowned for old-world charm and regal service.",
    rooms: [
      { id: "palace", name: "Palace Room", bed: "1 King Bed", size: "45 sqm", price: 24500, breakfast: true, refundable: true },
      { id: "historical-suite", name: "Historical Suite", bed: "1 King + Lounge", size: "95 sqm", price: 52000, breakfast: true, refundable: false },
    ],
  },
];

export const getHotelById = (id) => hotels.find((h) => h.id === id);
