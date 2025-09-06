import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/logo.jpg";
import {
  MapPin,
  Phone,
  Star,
  Home as HomeIcon,
  Search,
  Bookmark,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  Hotel,
  Utensils,
} from "lucide-react";

// -----------------------------
// SAMPLE DATA (Replace with real data later)
// -----------------------------
// Rich survey data per city (sample for 5 cities)
const CITY_INFO = {
  ziro: {
    summary: "A tranquil valley in Arunachal Pradesh known for pine-clad hills, rice fields and the Apatani culture.",
    routes: {
      fastest: "Fly to Guwahati → Train to Naharlagun → Taxi (3.5–4h) to Ziro",
      cheapest: "Train to Naharlagun → shared sumo to Ziro (~₹500–800)",
      alternates: ["Fly to Dibrugarh → taxi via North Lakhimpur", "Overnight bus from Guwahati to Naharlagun"]
    ,
publicTransport: { buses: "Hourly buses 7am–7pm", rideshare: "Ola limited/none", tickets: "₹20–₹50 intra-city" }
,
markets: [{ name: "Central Market", timings: "9am–7pm", specialties: "Local produce & textiles", bargaining: "Low–Medium" }]
,
essentials: { atms: ["SBI ATM - Main Rd", "AXIS ATM - Bazaar"], evCharging: ["Town Charger 7kW (8am–8pm)"], toilets: ["Bus Stand (clean)", "Tourist Office"] }
,
safetyNotes: "Avoid late-night isolated travel; carry cash where digital is weak."
,
gallery: ["https://picsum.photos/seed/gal-ziro-1/900/600","https://picsum.photos/seed/gal-ziro-2/900/600"]
},
    permits: { required: "Yes (ILP for Indians, PAP for foreigners)", how: "Online ILP portal / State facilitation center", time: "30 min–24 h", fee: "₹100–₹400" },
    drivers: [
      { name: "Tani Tours", phone: "+91 98765 11111" },
      { name: "Apatani Cabs", phone: "+91 98765 22222" }
    ],
    faresFromHub: [
      { from: "Naharlagun → Ziro (taxi)", approx: "₹3,500–4,500" },
      { from: "Shared Sumo", approx: "₹500–800" }
    ],
    essentialsOnWay: {
      pharmacies: [{ name: "City Medico", map: "https://maps.google.com", hours: "9am–9pm" }],
      foodStops: [{ name: "Hillside Dhaba", type: "Assamese/Tea", hours: "7am–10pm" }],
      fuel: ["IOC Petrol Pump, Kimin Road"],
      toilets: ["Kimin Bus Stop", "Ziro Gate"]
    },
    culture: {
      history: "Home of the Apatani tribe; UNESCO tentative list for unique wet rice cultivation.",
      festivals: [{ name: "Ziro Music Festival", when: "Sept", notes: "Iconic outdoor music festival in paddy fields." }],
      crafts: ["Bamboo craft", "Handwoven textiles"]
    },
    emergency: {
      hospital: { name: "General Hospital Ziro", phone: "+91 98000 00001", hours: "24x7" },
      police: { name: "Ziro Police Station", phone: "+91 98000 00002" },
      helpdesk: { name: "Tourist Info Centre", phone: "+91 98000 00003" }
    }
  },
  serchhip: {
    summary: "Mizoram’s clean, hilly district HQ close to Vantawng Falls and verdant valleys.",
    routes: {
      fastest: "Fly to Aizawl (AJL) → taxi (2.5–3h) to Serchhip",
      cheapest: "Shared sumo from Aizawl, Zarkawt stand (~₹350–500)",
      alternates: ["State buses from Aizawl", "Self-drive via NH-54"]
    ,
publicTransport: { buses: "Hourly buses 7am–7pm", rideshare: "Ola limited/none", tickets: "₹20–₹50 intra-city" }
,
markets: [{ name: "Central Market", timings: "9am–7pm", specialties: "Local produce & textiles", bargaining: "Low–Medium" }]
,
essentials: { atms: ["SBI ATM - Main Rd", "AXIS ATM - Bazaar"], evCharging: ["Town Charger 7kW (8am–8pm)"], toilets: ["Bus Stand (clean)", "Tourist Office"] }
,
safetyNotes: "Avoid late-night isolated travel; carry cash where digital is weak."
,
gallery: ["https://picsum.photos/seed/gal-serchhip-1/900/600","https://picsum.photos/seed/gal-serchhip-2/900/600"]
},
    permits: { required: "Yes (ILP)", how: "Online ILP / Lengpui airport desk", time: "30–60 min", fee: "₹100–₹200" },
    drivers: [{ name: "Mizo Cab Co.", phone: "+91 98989 11111" }],
    faresFromHub: [{ from: "Aizawl → Serchhip", approx: "Taxi ₹3,000–3,800; Sumo ₹350–500" }],
    essentialsOnWay: {
      pharmacies: [{ name: "Serchhip Pharma", map: "https://maps.google.com", hours: "9am–8pm" }],
      foodStops: [{ name: "Valley Café", type: "Mizo/Tea", hours: "8am–9pm" }],
      fuel: ["Serchhip Petrol Pump"],
      toilets: ["Thenzawl Rest Point"]
    },
    culture: {
      history: "Known for handloom weaving and proximity to Vantawng Falls.",
      festivals: [{ name: "Chapchar Kut", when: "March", notes: "Spring festival across Mizoram." }],
      crafts: ["Mizo weaves", "Bamboo products"]
    },
    emergency: {
      hospital: { name: "Serchhip Civil Hospital", phone: "+91 98000 00011", hours: "24x7" },
      police: { name: "Serchhip Police Station", phone: "+91 98000 00012" },
      helpdesk: { name: "Tourism Facilitation", phone: "+91 98000 00013" }
    }
  },
  tamenglong: {
    summary: "‘Land of the Hornbill’ in Manipur, famous for waterfalls, caves and orange orchards.",
    routes: {
      fastest: "Fly to Imphal (IMF) → taxi (3–4h) to Tamenglong",
      cheapest: "Shared vans from Imphal Noney stand (~₹400–600)",
      alternates: ["State buses from Imphal"]
    ,
publicTransport: { buses: "Hourly buses 7am–7pm", rideshare: "Ola limited/none", tickets: "₹20–₹50 intra-city" }
,
markets: [{ name: "Central Market", timings: "9am–7pm", specialties: "Local produce & textiles", bargaining: "Low–Medium" }]
,
essentials: { atms: ["SBI ATM - Main Rd", "AXIS ATM - Bazaar"], evCharging: ["Town Charger 7kW (8am–8pm)"], toilets: ["Bus Stand (clean)", "Tourist Office"] }
,
safetyNotes: "Avoid late-night isolated travel; carry cash where digital is weak."
,
gallery: ["https://picsum.photos/seed/gal-tamenglong-1/900/600","https://picsum.photos/seed/gal-tamenglong-2/900/600"]
},
    permits: { required: "No for Indians; PAP for foreigners", how: "FRRO/online", time: "1–3 days", fee: "Varies" },
    drivers: [{ name: "Tamenglong Travels", phone: "+91 97777 33333" }],
    faresFromHub: [{ from: "Imphal → Tamenglong", approx: "Taxi ₹4,000–5,000; Shared ₹400–600" }],
    essentialsOnWay: {
      pharmacies: [{ name: "Noney Medico", map: "https://maps.google.com", hours: "9am–9pm" }],
      foodStops: [{ name: "Hills Café", type: "Naga/Tea", hours: "8am–8pm" }],
      fuel: ["Noney Fuel Station"],
      toilets: ["Khongshang halt point"]
    },
    culture: {
      history: "Tribal heritage of Zeliangrong community; biodiversity hotspot.",
      festivals: [{ name: "Orange Festival", when: "Dec", notes: "Celebrates harvest with fairs & music." }],
      crafts: ["Cane & bamboo craft"]
    },
    emergency: {
      hospital: { name: "District Hospital Tamenglong", phone: "+91 98000 00021", hours: "24x7" },
      police: { name: "Tamenglong Police Station", phone: "+91 98000 00022" },
      helpdesk: { name: "Tourist Help", phone: "+91 98000 00023" }
    }
  },
  pasighat: {
    summary: "Gateway to Arunachal’s Siang valley, known for riverfront views and adventure sports.",
    routes: {
      fastest: "Fly to Dibrugarh (DIB) → Bogibeel Bridge → taxi (2.5–3h) to Pasighat",
      cheapest: "Bus/shared from Dibrugarh (~₹300–500)",
      alternates: ["Fly to Pasighat ALG (limited)"]
    ,
publicTransport: { buses: "Hourly buses 7am–7pm", rideshare: "Ola limited/none", tickets: "₹20–₹50 intra-city" }
,
markets: [{ name: "Central Market", timings: "9am–7pm", specialties: "Local produce & textiles", bargaining: "Low–Medium" }]
,
essentials: { atms: ["SBI ATM - Main Rd", "AXIS ATM - Bazaar"], evCharging: ["Town Charger 7kW (8am–8pm)"], toilets: ["Bus Stand (clean)", "Tourist Office"] }
,
safetyNotes: "Avoid late-night isolated travel; carry cash where digital is weak."
,
gallery: ["https://picsum.photos/seed/gal-pasighat-1/900/600","https://picsum.photos/seed/gal-pasighat-2/900/600"]
},
    permits: { required: "Yes (ILP/PAP)", how: "Online ILP portal / Facilitation centre", time: "30 min–24 h", fee: "₹100–₹400" },
    drivers: [{ name: "Siang Cabs", phone: "+91 96666 22222" }],
    faresFromHub: [{ from: "Dibrugarh → Pasighat", approx: "Taxi ₹3,500–4,500; Bus ₹300–500" }],
    essentialsOnWay: {
      pharmacies: [{ name: "Pasighat Med Plus", map: "https://maps.google.com", hours: "9am–10pm" }],
      foodStops: [{ name: "Riverside Dhaba", type: "Assamese", hours: "8am–10pm" }],
      fuel: ["IOC Fuel, Bogibeel Rd"],
      toilets: ["Bogibeel Viewpoint"]
    },
    culture: {
      history: "One of Arunachal’s oldest towns; Adi tribe heartland.",
      festivals: [{ name: "Solung", when: "Sept", notes: "Thanks-giving festival of the Adi community." }],
      crafts: ["Cane furniture", "Textiles"]
    },
    emergency: {
      hospital: { name: "Bakin Pertin Hospital", phone: "+91 98000 00031", hours: "24x7" },
      police: { name: "Pasighat Police Station", phone: "+91 98000 00032" },
      helpdesk: { name: "Tourist Centre", phone: "+91 98000 00033" }
    }
  },
  silchar: {
    summary: "Assam’s Barak Valley hub, gateway to southern Assam with vibrant markets and eateries.",
    routes: {
      fastest: "Fly to Silchar (IXS) directly from major hubs",
      cheapest: "Intercity buses/train to Badarpur Jn → local bus",
      alternates: ["Self-drive via NH6"]
    ,
publicTransport: { buses: "Hourly buses 7am–7pm", rideshare: "Ola limited/none", tickets: "₹20–₹50 intra-city" }
,
essentials: { atms: ["SBI ATM - Main Rd", "AXIS ATM - Bazaar"], evCharging: ["Town Charger 7kW (8am–8pm)"], toilets: ["Bus Stand (clean)", "Tourist Office"] }
,
safetyNotes: "Avoid late-night isolated travel; carry cash where digital is weak."
,
gallery: ["https://picsum.photos/seed/gal-silchar-1/900/600","https://picsum.photos/seed/gal-silchar-2/900/600"]
},
    permits: { required: "No permits for Indians", how: "—", time: "—", fee: "—" },
    drivers: [{ name: "Barak Taxi", phone: "+91 95555 44444" }],
    faresFromHub: [{ from: "Airport → City", approx: "Taxi ₹400–700" }],
    essentialsOnWay: {
      pharmacies: [{ name: "City Care Pharmacy", map: "https://maps.google.com", hours: "8am–11pm" }],
      foodStops: [{ name: "Barak Bites", type: "Assamese/Indian", hours: "8am–10pm" }],
      fuel: ["BPCL Silchar Pump"],
      toilets: ["Airport, ISBT stands"]
    },
    culture: {
      history: "Centre for education and tea trade in Barak Valley.",
      festivals: [{ name: "Durga Puja", when: "Oct", notes: "City-wide pandals & processions." }],
      crafts: ["Tea & local textiles"]
    },
    emergency: {
      hospital: { name: "Silchar Medical College", phone: "+91 98000 00041", hours: "24x7" },
      police: { name: "Silchar Sadar PS", phone: "+91 98000 00042" },
      helpdesk: { name: "Tourism Kiosk", phone: "+91 98000 00043" }
    }
  }
};

const SLIDER_IMAGES = [
  "https://picsum.photos/seed/ne1/1200/600",
  "https://picsum.photos/seed/ne2/1200/600",
  "https://picsum.photos/seed/ne3/1200/600",
  "https://picsum.photos/seed/ne4/1200/600",
];

const CITIES = [
  { id: "ziro", name: "Ziro", state: "Arunachal Pradesh" },
  { id: "serchhip", name: "Serchhip", state: "Mizoram" },
  { id: "thenzawl", name: "Thenzawl", state: "Mizoram" },
  { id: "tamenglong", name: "Tamenglong", state: "Manipur" },
  { id: "rangpo", name: "Rangpo", state: "Sikkim" },
  { id: "majhitar", name: "Majhitar", state: "Sikkim" },
  { id: "singtam", name: "Singtam", state: "Sikkim" },
  { id: "pasighat", name: "Pasighat", state: "Arunachal Pradesh" },
  { id: "pagin", name: "Pangin", state: "Arunachal Pradesh" },
  { id: "senapati", name: "Senapati", state: "Manipur" },
  { id: "silchar", name: "Silchar", state: "Assam" },
  { id: "chumoukedima", name: "Chümoukedima", state: "Nagaland" },
  { id: "udaipur-tripura", name: "Udaipur", state: "Tripura" },
  { id: "digboi-sivasagar", name: "Digboi & Sivasagar", state: "Assam" },
];

const POPULAR_CITY_IDS = ["ziro", "pasighat", "serchhip", "silchar"]; // example

const LISTINGS = {
  ziro: {
    food: [{
      id: "zi-food-1",
      name: "Pine Valley Café",
      phone: "+91 99000 10001",
      location: "Old Ziro Market",
      maps: "https://maps.google.com",
      description: "Apatani thali, smoked pork, local rice beer (apong).",
      duration: "45–60 min",
      rating: 4.6,
      photos: ["https://picsum.photos/seed/ziro-food1/900/600","https://picsum.photos/seed/ziro-food2/900/600"],
      reviews: [{ user: "Anita", text: "Authentic and cosy." }]
    
    ,activities: [{
      id: "zi-act-1",
      name: "Sunset Viewpoint Walk",
      duration: "1–2h",
      difficulty: "Easy",
      description: "Guided walk to a panoramic viewpoint; great for reels.",
      bestTime: "Evening",
      photos: ["https://picsum.photos/seed/ziro-act1/900/600"]
    }],
    markets: [{
      id: "zi-mk-1",
      name: "Local Bazaar",
      timings: "9am–7pm",
      specialties: "Handloom, spices, produce",
      bargaining: "Medium",
      location: "City Center",
      map: "https://maps.google.com"
    }]
}],
    stay: [{
      id: "zi-stay-1",
      name: "Ziro Bamboo Homestay",
      description: "Traditional bamboo homestay with valley views and local breakfast.",
      price: 2800,
      roomType: "Deluxe Room",
      rating: 4.5,
      photos: ["https://picsum.photos/seed/ziro-stay1/900/600","https://picsum.photos/seed/ziro-stay2/900/600"]
    }],
    sightseeing: [{
      id: "zi-see-1",
      name: "Talley Valley Wildlife Sanctuary",
      timing: "8am–4pm",
      fee: "₹50–₹200",
      description: "Dense subtropical forest with orchids and trekking trails.",
      photos: ["https://picsum.photos/seed/ziro-see1/900/600"]
    }],
    pharmacies: [{
      id: "zi-ph-1",
      name: "Ziro MedPlus",
      phone: "+91 99000 11001",
      hours: "9am–9pm",
      location: "Hapoli",
      map: "https://maps.google.com"
    }],
    medical: [{
      id: "zi-md-1",
      name: "General Hospital Ziro",
      phone: "+91 98000 00001",
      hours: "24x7",
      location: "Hapoli",
      map: "https://maps.google.com"
    }],
    handloom: [{
      id: "zi-hl-1",
      name: "Apatani Handloom Cluster",
      products: "Textiles, bamboo craft",
      location: "Hong Village",
      map: "https://maps.google.com"
    }]
  },
  serchhip: {
    food: [{
      id: "se-food-1",
      name: "Valley Café Serchhip",
      phone: "+91 99000 20001",
      location: "Serchhip Bazaar",
      maps: "https://maps.google.com",
      description: "Mizo delicacies; try bai, smoked meats and tea.",
      duration: "30–45 min",
      rating: 4.4,
      photos: ["https://picsum.photos/seed/ser-food1/900/600","https://picsum.photos/seed/ser-food2/900/600"],
      reviews: [{ user: "Rin", text: "Warm people and fresh food." }]
    
    ,activities: [{
      id: "se-act-1",
      name: "Sunset Viewpoint Walk",
      duration: "1–2h",
      difficulty: "Easy",
      description: "Guided walk to a panoramic viewpoint; great for reels.",
      bestTime: "Evening",
      photos: ["https://picsum.photos/seed/serchhip-act1/900/600"]
    }],
    markets: [{
      id: "se-mk-1",
      name: "Local Bazaar",
      timings: "9am–7pm",
      specialties: "Handloom, spices, produce",
      bargaining: "Medium",
      location: "City Center",
      map: "https://maps.google.com"
    }]
}],
    stay: [{
      id: "se-stay-1",
      name: "Serchhip Hills Lodge",
      description: "Clean rooms, hill views, near bus stand.",
      price: 2200,
      roomType: "Standard",
      rating: 4.2,
      photos: ["https://picsum.photos/seed/ser-stay1/900/600","https://picsum.photos/seed/ser-stay2/900/600"]
    }],
    sightseeing: [{
      id: "se-see-1",
      name: "Vantawng Falls",
      timing: "9am–5pm",
      fee: "₹20–₹50",
      description: "Mizoram’s highest waterfall near Thenzawl.",
      photos: ["https://picsum.photos/seed/ser-see1/900/600"]
    }],
    pharmacies: [{
      id: "se-ph-1",
      name: "Serchhip Pharmacy",
      phone: "+91 98989 22001",
      hours: "9am–8pm",
      location: "Central Market",
      map: "https://maps.google.com"
    }],
    medical: [{
      id: "se-md-1",
      name: "Serchhip Civil Hospital",
      phone: "+91 98000 00011",
      hours: "24x7",
      location: "District HQ",
      map: "https://maps.google.com"
    }],
    handloom: [{
      id: "se-hl-1",
      name: "Mizo Weavers Society",
      products: "Traditional shawls & puans",
      location: "Near Bazaar",
      map: "https://maps.google.com"
    }]
  },
  tamenglong: {
    food: [{
      id: "ta-food-1",
      name: "Hornbill Kitchen",
      phone: "+91 99000 30001",
      location: "Main Market Road",
      maps: "https://maps.google.com",
      description: "Naga-style smoked pork, axone dishes and tea.",
      duration: "40–55 min",
      rating: 4.5,
      photos: ["https://picsum.photos/seed/tam-food1/900/600","https://picsum.photos/seed/tam-food2/900/600"],
      reviews: [{ user: "Sanjay", text: "Bold flavors, generous portions." }]
    
    ,activities: [{
      id: "ta-act-1",
      name: "Sunset Viewpoint Walk",
      duration: "1–2h",
      difficulty: "Easy",
      description: "Guided walk to a panoramic viewpoint; great for reels.",
      bestTime: "Evening",
      photos: ["https://picsum.photos/seed/tamenglong-act1/900/600"]
    }],
    markets: [{
      id: "ta-mk-1",
      name: "Local Bazaar",
      timings: "9am–7pm",
      specialties: "Handloom, spices, produce",
      bargaining: "Medium",
      location: "City Center",
      map: "https://maps.google.com"
    }]
}],
    stay: [{
      id: "ta-stay-1",
      name: "Orange Grove Homestay",
      description: "Family-run homestay amidst orange orchards.",
      price: 2500,
      roomType: "Cottage",
      rating: 4.6,
      photos: ["https://picsum.photos/seed/tam-stay1/900/600","https://picsum.photos/seed/tam-stay2/900/600"]
    }],
    sightseeing: [{
      id: "ta-see-1",
      name: "Barak Waterfalls",
      timing: "8am–4pm",
      fee: "Free",
      description: "Series of picturesque cascades popular for picnics.",
      photos: ["https://picsum.photos/seed/tam-see1/900/600"]
    }],
    pharmacies: [{
      id: "ta-ph-1",
      name: "Tamenglong Medico",
      phone: "+91 97777 33001",
      hours: "9am–9pm",
      location: "Main Road",
      map: "https://maps.google.com"
    }],
    medical: [{
      id: "ta-md-1",
      name: "District Hospital Tamenglong",
      phone: "+91 98000 00021",
      hours: "24x7",
      location: "District HQ",
      map: "https://maps.google.com"
    }],
    handloom: [{
      id: "ta-hl-1",
      name: "Cane & Bamboo Craft Coop",
      products: "Baskets, decor",
      location: "Local Market",
      map: "https://maps.google.com"
    }]
  },
  pasighat: {
    food: [{
      id: "pa-food-1",
      name: "Siang Riverside Eatery",
      phone: "+91 99000 40001",
      location: "Siang Riverfront",
      maps: "https://maps.google.com",
      description: "Fresh fish curry, thukpa and momo with river views.",
      duration: "35–50 min",
      rating: 4.6,
      photos: ["https://picsum.photos/seed/pas-food1/900/600","https://picsum.photos/seed/pas-food2/900/600"],
      reviews: [{ user: "Meera", text: "Lovely setting by the river." }]
    
    ,activities: [{
      id: "pa-act-1",
      name: "Sunset Viewpoint Walk",
      duration: "1–2h",
      difficulty: "Easy",
      description: "Guided walk to a panoramic viewpoint; great for reels.",
      bestTime: "Evening",
      photos: ["https://picsum.photos/seed/pasighat-act1/900/600"]
    }],
    markets: [{
      id: "pa-mk-1",
      name: "Local Bazaar",
      timings: "9am–7pm",
      specialties: "Handloom, spices, produce",
      bargaining: "Medium",
      location: "City Center",
      map: "https://maps.google.com"
    }]
}],
    stay: [{
      id: "pa-stay-1",
      name: "Siang View Resort",
      description: "Riverside cottages, bonfire area and local meals.",
      price: 4200,
      roomType: "River Cottage",
      rating: 4.7,
      photos: ["https://picsum.photos/seed/pas-stay1/900/600","https://picsum.photos/seed/pas-stay2/900/600"]
    }],
    sightseeing: [{
      id: "pa-see-1",
      name: "Daying Ering Wildlife Sanctuary",
      timing: "7am–4pm",
      fee: "₹50–₹200",
      description: "Riverine islands with migratory birds; boat rides.",
      photos: ["https://picsum.photos/seed/pas-see1/900/600"]
    }],
    pharmacies: [{
      id: "pa-ph-1",
      name: "Pasighat Med Plus",
      phone: "+91 96666 22001",
      hours: "9am–10pm",
      location: "Main Market",
      map: "https://maps.google.com"
    }],
    medical: [{
      id: "pa-md-1",
      name: "Bakin Pertin Hospital",
      phone: "+91 98000 00031",
      hours: "24x7",
      location: "NH-52 Bypass",
      map: "https://maps.google.com"
    }],
    handloom: [{
      id: "pa-hl-1",
      name: "Adi Handicraft Centre",
      products: "Textiles, cane furniture",
      location: "Market Road",
      map: "https://maps.google.com"
    }]
  },
  silchar: {
    food: [{
      id: "si-food-1",
      name: "Barak Bites",
      phone: "+91 99000 50001",
      location: "Central Market",
      maps: "https://maps.google.com",
      description: "Assamese thali, rolls and sweets.",
      duration: "25–40 min",
      rating: 4.3,
      photos: ["https://picsum.photos/seed/sil-food1/900/600","https://picsum.photos/seed/sil-food2/900/600"],
      reviews: [{ user: "Pooja", text: "Great value and tasty." }]
    
    ,activities: [{
      id: "si-act-1",
      name: "Sunset Viewpoint Walk",
      duration: "1–2h",
      difficulty: "Easy",
      description: "Guided walk to a panoramic viewpoint; great for reels.",
      bestTime: "Evening",
      photos: ["https://picsum.photos/seed/silchar-act1/900/600"]
    }],
    markets: [{
      id: "si-mk-1",
      name: "Local Bazaar",
      timings: "9am–7pm",
      specialties: "Handloom, spices, produce",
      bargaining: "Medium",
      location: "City Center",
      map: "https://maps.google.com"
    }]
}],
    stay: [{
      id: "si-stay-1",
      name: "Barak Valley Inn",
      description: "Business hotel with clean rooms and breakfast.",
      price: 2600,
      roomType: "Deluxe",
      rating: 4.2,
      photos: ["https://picsum.photos/seed/sil-stay1/900/600","https://picsum.photos/seed/sil-stay2/900/600"]
    }],
    sightseeing: [{
      id: "si-see-1",
      name: "Khaspur Ruins",
      timing: "8am–5pm",
      fee: "₹10–₹25",
      description: "Historical ruins of the Kachari kingdom near Silchar.",
      photos: ["https://picsum.photos/seed/sil-see1/900/600"]
    }],
    pharmacies: [{
      id: "si-ph-1",
      name: "City Care Pharmacy",
      phone: "+91 99000 52001",
      hours: "8am–11pm",
      location: "Ambicapatty",
      map: "https://maps.google.com"
    }],
    medical: [{
      id: "si-md-1",
      name: "Silchar Medical College",
      phone: "+91 98000 00041",
      hours: "24x7",
      location: "Silchar",
      map: "https://maps.google.com"
    }],
    handloom: [{
      id: "si-hl-1",
      name: "Barak Handloom Centre",
      products: "Local textiles, shawls",
      location: "Market Road",
      map: "https://maps.google.com"
    }]
  }
};

// Utility helpers
const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;
const Stars = ({ score = 0 }) => {
  const full = Math.floor(score);
  const half = score - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < full ? "fill-current" : half && i === full ? "fill-current opacity-50" : ""
          }`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">{score.toFixed(1)}</span>
    </div>
  );
};

// Tiny UI primitives
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium shadow-sm hover:shadow md:active:scale-[0.99] transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white shadow-sm border border-gray-100 ${className}`}>{children}</div>
);

const Chip = ({ selected, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm border ${
      selected ? "bg-black text-white border-black" : "bg-white text-gray-800 border-gray-300"
    }`}
  >
    {children}
  </button>
);

// Image slider component
const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl aspect-[16/9]">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="slide"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full ${i === index ? "bg-white" : "bg-white/60"}`}
          />
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur rounded-full p-2"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur rounded-full p-2"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

// Modals
const Modal = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 p-0 md:p-6">
      <div className="bg-white w-full md:max-w-3xl rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-5 w-5"/></button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// City details screen
const CityScreen = ({ cityId, onBack }) => {
  const city = CITIES.find((c) => c.id === cityId);
  const [tab, setTab] = useState("overview");
  const content = LISTINGS[cityId] || { food: [], stay: [] };
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto flex items-center gap-3 p-3">
          <button onClick={onBack} className="rounded-full p-2 hover:bg-gray-100"><ChevronLeft/></button>
          <div>
            <h2 className="text-xl font-bold">{city?.name}</h2>
            <p className="text-sm text-gray-600">{city?.state}</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-3 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { key: "overview", label: "Overview" },
              { key: "food", label: "Food" },
              { key: "stay", label: "Stay" },
              { key: "sightseeing", label: "Sightseeing" },
              { key: "pharmacies", label: "Pharmacy" },
              { key: "medical", label: "Medical" },
              { key: "transport", label: "Transport" },
              { key: "handloom", label: "Handloom" },
              { key: "markets", label: "Markets" },
              { key: "activities", label: "Activities" },
              { key: "essentials", label: "Essentials" },
              { key: "safety", label: "Safety" },
              { key: "gallery", label: "Gallery" },
            ].map((t) => (
              <Chip key={t.key} selected={tab === t.key} onClick={() => setTab(t.key)}>
                {t.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-3 space-y-4">
        {tab === "overview" && (
          <>
            <Card>
              <img
                src={`https://picsum.photos/seed/${cityId}/1200/600`}
                className="w-full h-56 md:h-80 object-cover rounded-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Welcome to {city?.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-rose-100 text-rose-800 border border-rose-200">{CITY_INFO[cityId]?.permits?.required ? `Permit: ${CITY_INFO[cityId]?.permits?.required}` : "Permit: Check"}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200">Best Season: Oct–Apr</span>
                </div>
                <p className="text-gray-600">{CITY_INFO[cityId]?.summary || "Discover culture, cuisine and scenic escapes."}</p>
              </div>
            </Card>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Getting There</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Fastest:</strong> {CITY_INFO[cityId]?.routes?.fastest || "-"}</li>
                  <li><strong>Cheapest:</strong> {CITY_INFO[cityId]?.routes?.cheapest || "-"}</li>
                  <li><strong>Alternates:</strong> {(CITY_INFO[cityId]?.routes?.alternates || []).join(", ")}</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Permits</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Required:</strong> {CITY_INFO[cityId]?.permits?.required || "—"}</li>
                  <li><strong>How:</strong> {CITY_INFO[cityId]?.permits?.how || "—"}</li>
                  <li><strong>Time:</strong> {CITY_INFO[cityId]?.permits?.time || "—"}</li>
                  <li><strong>Fee:</strong> {CITY_INFO[cityId]?.permits?.fee || "—"}</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Emergency</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Hospital:</strong> {CITY_INFO[cityId]?.emergency?.hospital?.name} ({CITY_INFO[cityId]?.emergency?.hospital?.phone})</li>
                  <li><strong>Police:</strong> {CITY_INFO[cityId]?.emergency?.police?.name} ({CITY_INFO[cityId]?.emergency?.police?.phone})</li>
                  <li><strong>Helpdesk:</strong> {CITY_INFO[cityId]?.emergency?.helpdesk?.name} ({CITY_INFO[cityId]?.emergency?.helpdesk?.phone})</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Festivals</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(CITY_INFO[cityId]?.culture?.festivals || []).map((f, i) => (
                    <li key={i}><strong>{f.name}</strong> — {f.when} · {f.notes}</li>
                        ))}
    </ul>
  </Card>
</div>
}}

        {tab === "food" && (
          <div className="grid md:grid-cols-2 gap-4">
            {content.food.length === 0 && (
              <Card className="p-6 text-center text-gray-600">No food listings yet. (Sample data coming soon.)</Card>
            )}
            {content.food.map((f) => (
              <Card key={f.id} className="overflow-hidden">
                <img src={f.photos[0]} className="w-full h-44 object-cover" />
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center gap-2"><Utensils className="h-4 w-4"/>{f.name}</h4>
                    <Stars score={f.rating} />
                  </div>
                  <p className="text-sm text-gray-600">{f.description}</p>
                  <div className="text-sm text-gray-700 flex items-center gap-1"><MapPin className="h-4 w-4"/>{f.location}</div>
                  <div className="flex gap-2 pt-2">
                    <Button className="bg-black text-white" onClick={() => setOpenItem(f)}>View</Button>
                    <a href={`tel:${f.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border">
                      <Phone className="h-4 w-4"/>Call
                    </a>
                    <a href={f.maps} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border">
                      <MapPin className="h-4 w-4"/>Map
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "stay" && (
          <div className="grid md:grid-cols-2 gap-4">
            {content.stay.length === 0 && (
              <Card className="p-6 text-center text-gray-600">No stays yet. (Sample data coming soon.)</Card>
            )}
            {content.stay.map((s) => (
              <Card key={s.id} className="overflow-hidden">
                <img src={s.photos[0]} className="w-full h-44 object-cover" />
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center gap-2"><Hotel className="h-4 w-4"/>{s.name}</h4>
                    <Stars score={s.rating} />
                  </div>
                  <p className="text-sm text-gray-600">{s.description}</p>
                  <div className="flex items-center gap-3 pt-2 text-sm">
                    <span className="font-medium">{s.roomType}</span>
                    <span className="text-gray-500">•</span>
                    <span>{formatPrice(s.price)}/night</span>
                  </div>
                  <div className="pt-2">
                    <Button className="bg-black text-white" onClick={() => setOpenItem(s)}>View</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

        {tab === "sightseeing" && (
          <div className="grid md:grid-cols-2 gap-4">
            {(content.sightseeing || []).length === 0 && (
              <Card className="p-6 text-center text-gray-600">No sightseeing spots yet.</Card>
            )}
            {(content.sightseeing || []).map((s) => (
              <Card key={s.id} className="overflow-hidden">
                <img src={s.photos?.[0]} className="w-full h-44 object-cover" />
                <div className="p-4 space-y-1">
                  <h4 className="font-semibold">{s.name}</h4>
                  <div className="text-sm text-gray-700">Timing: {s.timing} · Fee: {s.fee}</div>
                  <p className="text-sm text-gray-600">{s.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "pharmacies" && (
          <div className="grid md:grid-cols-2 gap-4">
            {(content.pharmacies || []).length === 0 && (
              <Card className="p-6 text-center text-gray-600">No pharmacies added.</Card>
            )}
            {(content.pharmacies || []).map((p) => (
              <Card key={p.id} className="p-4 space-y-1">
                <h4 className="font-semibold">{p.name}</h4>
                <div className="text-sm text-gray-700">Hours: {p.hours}</div>
                <div className="text-sm text-gray-700">Location: {p.location}</div>
                <div className="flex gap-2 pt-2">
                  <a href={`tel:${p.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border"><Phone className="h-4 w-4"/>Call</a>
                  <a href={p.map} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border"><MapPin className="h-4 w-4"/>Map</a>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "medical" && (
          <div className="grid md:grid-cols-2 gap-4">
            {(content.medical || []).length === 0 && (
              <Card className="p-6 text-center text-gray-600">No medical centers added.</Card>
            )}
            {(content.medical || []).map((m) => (
              <Card key={m.id} className="p-4 space-y-1">
                <h4 className="font-semibold">{m.name}</h4>
                <div className="text-sm text-gray-700">Hours: {m.hours}</div>
                <div className="text-sm text-gray-700">Location: {m.location}</div>
                <div className="flex gap-2 pt-2">
                  <a href={`tel:${m.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border"><Phone className="h-4 w-4"/>Call</a>
                  <a href={m.map} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border"><MapPin className="h-4 w-4"/>Map</a>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "transport" && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Drivers</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {(CITY_INFO[cityId]?.drivers || []).map((d, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{d.name}</span>
                    <a href={`tel:${d.phone}`} className="text-rose-700 underline">{d.phone}</a>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Approx. Fares from Hubs</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {(CITY_INFO[cityId]?.faresFromHub || []).map((f, i) => (
                  <li key={i}><strong>{f.from}</strong>: {f.approx}</li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {tab === "handloom" && (
          <div className="grid md:grid-cols-2 gap-4">
            {(content.handloom || []).length === 0 && (
              <Card className="p-6 text-center text-gray-600">No handloom/industry info yet.</Card>
            )}
            {(content.handloom || []).map((h) => (
              <Card key={h.id} className="p-4 space-y-1">
                <h4 className="font-semibold">{h.name}</h4>
                <div className="text-sm text-gray-700">Products: {h.products}</div>
                <div className="text-sm text-gray-700">Location: {h.location}</div>
                <a href={h.map} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border mt-2"><MapPin className="h-4 w-4"/>Map</a>
              </Card>
            ))}
          </div>
        )}
        )}
      </div>


        {tab === "markets" && (
          <div className="grid md:grid-cols-2 gap-4">
            {(content.markets || []).length === 0 && <Card className="p-6 text-center text-gray-600">No markets added.</Card>}
            {(content.markets || []).map((mkt) => (
              <Card key={mkt.id || mkt.name} className="p-4">
                <h4 className="font-semibold">{mkt.name}</h4>
                <div className="text-sm text-gray-700">Timings: {mkt.timings}</div>
                <div className="text-sm text-gray-700">Specialties: {mkt.specialties}</div>
                <div className="text-sm text-gray-700">Bargaining: {mkt.bargaining}</div>
                {mkt.location && <div className="text-sm text-gray-700">Location: {mkt.location}</div>}
                <div className="flex gap-2 pt-2">
                  {mkt.map && <a href={mkt.map} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border"><MapPin className="h-4 w-4"/>Map</a>}
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "activities" && (
          <div className="grid md:grid-cols-2 gap-4">
            {(content.activities || []).length === 0 && <Card className="p-6 text-center text-gray-600">No activities yet.</Card>}
            {(content.activities || []).map((a) => (
              <Card key={a.id || a.name} className="overflow-hidden">
                <img src={a.photos?.[0]} className="w-full h-44 object-cover" />
                <div className="p-4 space-y-1">
                  <h4 className="font-semibold">{a.name}</h4>
                  <div className="text-sm text-gray-700">Duration: {a.duration} · Difficulty: {a.difficulty} · Best: {a.bestTime}</div>
                  <p className="text-sm text-gray-600">{a.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "essentials" && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">ATMs & Banks</h4>
              <ul className="text-sm text-gray-700 list-disc ml-5">
                {(CITY_INFO[cityId]?.essentials?.atms || []).map((t, i) => (<li key={i}>{t}</li>))}
              </ul>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-2">EV Charging & Fuel</h4>
              <ul className="text-sm text-gray-700 list-disc ml-5">
                {(CITY_INFO[cityId]?.essentials?.evCharging || []).map((t, i) => (<li key={i}>{t}</li>))}
              </ul>
            </Card>
            <Card className="p-4 md:col-span-2">
              <h4 className="font-semibold mb-2">Public Toilets / Rest Areas</h4>
              <ul className="text-sm text-gray-700 list-disc ml-5">
                {(CITY_INFO[cityId]?.essentials?.toilets || []).map((t, i) => (<li key={i}>{t}</li>))}
              </ul>
            </Card>
          </div>
        )}

        {tab === "safety" && (
          <div className="grid gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Safety Notes</h4>
              <p className="text-sm text-gray-700">{CITY_INFO[cityId]?.safetyNotes || "Be aware of local advisories."}</p>
            </Card>
          </div>
        )}

        {tab === "gallery" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(CITY_INFO[cityId]?.gallery || []).map((g, i) => (
              <img key={i} src={g} className="h-40 w-full object-cover rounded-2xl" />
            ))}
          </div>
        )}

            <Modal open={!!openItem} onClose={() => setOpenItem(null)} title={openItem?.name}>
        {openItem && (
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-2">
              {openItem.photos?.map((p, i) => (
                <img key={i} src={p} className="w-full h-40 object-cover rounded-xl" />
              ))}
            </div>
            {openItem.description && <p className="text-gray-700">{openItem.description}</p>}
            {openItem.location && (
              <div className="text-sm text-gray-700 flex items-center gap-2"><MapPin className="h-4 w-4"/>{openItem.location}</div>
            )}
            {openItem.phone && (
              <a href={`tel:${openItem.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border"><Phone className="h-4 w-4"/>Call</a>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

// Auth screen (name + phone only)
const AuthScreen = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const canContinue = name.trim().length >= 2 && phone.trim().length >= 8;
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-rose-50 to-white p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="text-gray-600">Sign in or create an account</p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Priyam Gupta"
              className="mt-1 w-full rounded-2xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., 98765 43210"
              className="mt-1 w-full rounded-2xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            <p className="text-xs text-gray-500 mt-1">No OTP required for MVP.</p>
          </div>
          <Button
            className={`w-full ${canContinue ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
            disabled={!canContinue}
            onClick={() => onComplete({ name, phone })}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Home screen
const HomeScreen = ({ onPickCity }) => {
  const [selectedState, setSelectedState] = useState("All");
  const states = useMemo(() => ["All", ...Array.from(new Set(CITIES.map((c) => c.state)))], []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-5xl mx-auto p-3 space-y-4">
        {/* Hero slider */}
        <ImageSlider images={SLIDER_IMAGES} />

        {/* Title + description */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">North-East Explorer</h2>
          <p className="text-gray-700 leading-relaxed">
            Discover the 7 Sisters and 1 Brother — explore culture, food, and stays across
            14 key cities. Handpicked guides, maps, and reviews to make your trip effortless.
          </p>
        </div>

        {/* Browse categories: city filter by state */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Browse by City</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {states.map((s) => (
                <Chip key={s} selected={selectedState === s} onClick={() => setSelectedState(s)}>
                  {s}
                </Chip>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CITIES.filter((c) => selectedState === "All" || c.state === selectedState).map((city) => (
              <button
                key={city.id}
                onClick={() => onPickCity(city.id)}
                className="group relative overflow-hidden rounded-2xl border hover:shadow-md transition"
              >
                <img
                  src={`https://picsum.photos/seed/${city.id}/400/300`}
                  className="h-28 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"/>
                <div className="p-2">
                  <div className="text-sm font-semibold">{city.name}</div>
                  <div className="text-xs text-gray-600">{city.state}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Popular cities */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Popular Cities</h3>
            <a className="text-sm text-rose-700" href="#">See all</a>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {POPULAR_CITY_IDS.map((id) => {
              const city = CITIES.find((c) => c.id === id);
              return (
                <button
                  key={id}
                  onClick={() => onPickCity(id)}
                  className="min-w-[220px] rounded-2xl overflow-hidden border hover:shadow-md"
                >
                  <img src={`https://picsum.photos/seed/pop-${id}/500/300`} className="h-32 w-full object-cover" />
                  <div className="p-2">
                    <div className="font-semibold">{city?.name}</div>
                    <div className="text-xs text-gray-600">{city?.state}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="h-20"></div>
      </div>

      {/* Footer Nav */}
      <nav className="fixed bottom-3 inset-x-3 md:inset-x-0 md:bottom-0 md:relative">
        <div className="mx-auto md:max-w-5xl bg-white/90 backdrop-blur border rounded-2xl md:rounded-none md:border-t shadow-lg">
          <div className="grid grid-cols-4">
            {[
              { icon: <HomeIcon className="h-5 w-5"/>, label: "Home" },
              { icon: <Search className="h-5 w-5"/>, label: "Explore" },
              { icon: <Bookmark className="h-5 w-5"/>, label: "Saved" },
              { icon: <User className="h-5 w-5"/>, label: "Profile" },
            ].map((tab, i) => (
              <button key={i} className="flex flex-col items-center p-3 text-sm hover:bg-gray-50">
                {tab.icon}
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

// Splash screen (GIF placeholder)
const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-emerald-100 to-white">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="h-28 w-28 rounded-3xl bg-white shadow grid place-items-center overflow-hidden border">
          <img src={logo} alt="Logo" className="object-cover h-full w-full" />
        </div>
        <motion.div className="h-8 w-8 rounded-full border-4 border-rose-600 border-t-transparent animate-spin mt-3" aria-label="preloader" />
        <div className="mt-4 text-lg font-semibold">North-East Explorer</div>
        <div className="text-sm text-gray-600">Loading experiences…</div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState(null);
  const [activeCity, setActiveCity] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("ne_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const goHome = () => setScreen("home");

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SplashScreen
              onDone={() => {
                setScreen(user ? "home" : "auth");
              }}
            />
          </motion.div>
        )}

        {screen === "auth" && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AuthScreen
              onComplete={(u) => {
                setUser(u);
                localStorage.setItem("ne_user", JSON.stringify(u));
                setScreen("home");
              }}
            />
          </motion.div>
        )}

        {screen === "home" && !activeCity && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeScreen
              onPickCity={(id) => {
                setActiveCity(id);
                setScreen("city");
              }}
            />
          </motion.div>
        )}

        {screen === "city" && activeCity && (
          <motion.div key="city" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CityScreen cityId={activeCity} onBack={() => { setActiveCity(null); goHome(); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
