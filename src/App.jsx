// src/App.jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Landmark,
  BedDouble,
  CalendarDays,
  AlertTriangle,
  Pill,
  Bus,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

// -----------------------------
// SAMPLE CONTENT (MVP data)
// Expand/replace with real data or move to /src/content.ts later
// -----------------------------
const CONTENT = {
  food: [
    {
      id: "food-1",
      name: "Spice Bazaar",
      description: "Authentic local cuisine with vegetarian options.",
      rating: 4.5,
      address: "Main Market",
      phone: "+91-000000-00000",
      photos: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      ],
    },
    {
      id: "food-2",
      name: "Tea & Trails",
      description: "Scenic views, great momos and tea.",
      rating: 4.2,
      address: "Hillside Road",
      phone: "+91-111111-11111",
      photos: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
      ],
    },
  ],
  sightseeing: [
    {
      id: "s-1",
      name: "Cloud Peak Viewpoint",
      notes: "Best at sunrise. Carry warm clothing.",
      photos: [
        "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop",
      ],
    },
    {
      id: "s-2",
      name: "Heritage Bamboo Park",
      notes: "Local crafts & weekend folk shows.",
      photos: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      ],
    },
  ],
  stay: [
    {
      id: "stay-1",
      name: "Hillside Homestay",
      description: "Cozy wooden rooms with breakfast.",
      rating: 4.4,
      roomType: "Double",
      pricePerNight: 2200,
      phone: "+91-999999-99999",
      photos: [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d4d?q=80&w=1200&auto=format&fit=crop",
      ],
    },
  ],
  festivals: [
    {
      id: "fest-1",
      name: "Spring Rhythms",
      when: "Mar 14–16",
      notes: "Dance, bamboo crafts, local cuisine.",
    },
  ],
  emergency: {
    police: { name: "City Police", phone: "100" },
    helpdesk: { name: "Tourist Helpdesk", phone: "1800-000-111" },
  },
  pharmacies: [
    {
      id: "ph-1",
      name: "High Street Pharmacy",
      address: "High Street",
      phone: "+91-222222-22222",
      photos: [
        "https://images.unsplash.com/photo-1586015555751-63bb77f432d7?q=80&w=1200&auto=format&fit=crop",
      ],
    },
  ],
  transport: [
    {
      id: "t-1",
      name: "City Bus Stand",
      notes: "Buses every 30 mins. Last bus 8:30 PM.",
      photos: [
        "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=1200&auto=format&fit=crop",
      ],
    },
  ],
};

// -----------------------------
// SMALL UI HELPERS
// -----------------------------
const tabs = [
  { key: "food", label: "Food", icon: Utensils },
  { key: "sightseeing", label: "Sightseeing", icon: Landmark },
  { key: "stay", label: "Stay", icon: BedDouble },
  { key: "festivals", label: "Festivals", icon: CalendarDays },
  { key: "emergency", label: "Emergency", icon: AlertTriangle },
  { key: "pharmacies", label: "Pharmacies", icon: Pill },
  { key: "transport", label: "Transport", icon: Bus },
];

function Rating({ value }) {
  const full = Math.floor(value || 0);
  const stars = Array.from({ length: 5 }, (_, i) => i < full);
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {stars.map((on, i) => (
        <Star key={i} size={16} className={on ? "fill-yellow-500" : ""} />
      ))}
      <span className="ml-1 text-xs text-gray-600">{value?.toFixed(1)}</span>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
      {children}
    </div>
  );
}

function Img({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-40 w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  );
}

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

// -----------------------------
// MAIN APP
// -----------------------------
export default function App() {
  const [tab, setTab] = useState("food");

  const current = useMemo(() => {
    switch (tab) {
      case "food":
        return CONTENT.food || [];
      case "sightseeing":
        return CONTENT.sightseeing || [];
      case "stay":
        return CONTENT.stay || [];
      case "festivals":
        return CONTENT.festivals || [];
      case "pharmacies":
        return CONTENT.pharmacies || [];
      case "transport":
        return CONTENT.transport || [];
      case "emergency":
        return CONTENT.emergency || {};
      default:
        return [];
    }
  }, [tab]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl leading-tight">North-East Explorer</h1>
            <p className="text-xs/5 text-white/70">Your City — MVP</p>
          </div>

          {/* Tab Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-2">
            {tabs.map(({ key, label, icon: Icon }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition
                    ${active ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"}
                  `}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Nav (mobile) */}
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-6xl px-2 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            {tabs.map(({ key, label, icon: Icon }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition
                    ${active ? "bg-white text-black" : "bg-white/10 hover:bg-white/20 text-white"}
                  `}
                >
                  <Icon size={14} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <AnimatePresence mode="wait">
          {/* FOOD */}
          {tab === "food" && (
            <motion.section key="food" {...fade}>
              <SectionTitle icon={Utensils} title="Food & Cafés" />
              <IfEmpty items={current} empty="No food listings yet. (Sample data coming soon.)" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {current.map((f) => (
                  <Card key={f.id}>
                    {f.photos?.[0] && <Img src={f.photos[0]} alt={f.name} />}
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-base">{f.name}</h3>
                        <Rating value={f.rating} />
                      </div>
                      <p className="text-sm text-gray-600">{f.description}</p>
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <Line icon={MapPin} text={f.address} />
                        <Line icon={Phone} text={f.phone} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* SIGHTSEEING */}
          {tab === "sightseeing" && (
            <motion.section key="sightseeing" {...fade}>
              <SectionTitle icon={Landmark} title="Sightseeing" />
              <IfEmpty
                items={current}
                empty="No sightseeing spots yet. (Sample data coming soon.)"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {current.map((s) => (
                  <Card key={s.id}>
                    {s.photos?.[0] && <Img src={s.photos[0]} alt={s.name} />}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold">{s.name}</h3>
                      <p className="text-sm text-gray-600">{s.notes}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* STAY */}
          {tab === "stay" && (
            <motion.section key="stay" {...fade}>
              <SectionTitle icon={BedDouble} title="Stays & Homestays" />
              <IfEmpty items={current} empty="No stays yet. (Sample data coming soon.)" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {current.map((s) => (
                  <Card key={s.id}>
                    {s.photos?.[0] && <Img src={s.photos[0]} alt={s.name} />}
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold">{s.name}</h3>
                        <Rating value={s.rating} />
                      </div>
                      <p className="text-sm text-gray-600">{s.description}</p>
                      <div className="flex items-center gap-4 text-sm pt-1">
                        <span className="text-gray-700">
                          <span className="text-gray-500">Room:</span> {s.roomType}
                        </span>
                        <span className="text-gray-700">
                          <span className="text-gray-500">₹</span>
                          {formatPrice(s.pricePerNight)}
                          <span className="text-gray-500"> /night</span>
                        </span>
                      </div>
                      <div className="pt-2">
                        <Line icon={Phone} text={s.phone} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* FESTIVALS */}
          {tab === "festivals" && (
            <motion.section key="festivals" {...fade}>
              <SectionTitle icon={CalendarDays} title="Festivals & Culture" />
              <IfEmpty items={current} empty="No festivals yet. (Sample data coming soon.)" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {current.map((f) => (
                  <Card key={f.id}>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold">{f.name}</h3>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">When:</span> {f.when}
                      </p>
                      <p className="text-sm text-gray-600">{f.notes}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* EMERGENCY */}
          {tab === "emergency" && (
            <motion.section key="emergency" {...fade}>
              <SectionTitle icon={AlertTriangle} title="Emergency Contacts" />
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <div className="p-4 space-y-1">
                    <h3 className="font-semibold">Police</h3>
                    <Line icon={Phone} text={CONTENT.emergency?.police?.phone || "—"} />
                    <p className="text-xs text-gray-600">
                      {CONTENT.emergency?.police?.name || ""}
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="p-4 space-y-1">
                    <h3 className="font-semibold">Tourist Helpdesk</h3>
                    <Line icon={Phone} text={CONTENT.emergency?.helpdesk?.phone || "—"} />
                    <p className="text-xs text-gray-600">
                      {CONTENT.emergency?.helpdesk?.name || ""}
                    </p>
                  </div>
                </Card>
              </div>
            </motion.section>
          )}

          {/* PHARMACIES */}
          {tab === "pharmacies" && (
            <motion.section key="pharmacies" {...fade}>
              <SectionTitle icon={Pill} title="Pharmacies" />
              <IfEmpty items={current} empty="No pharmacies yet. (Sample data coming soon.)" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {current.map((p) => (
                  <Card key={p.id}>
                    {p.photos?.[0] && <Img src={p.photos[0]} alt={p.name} />}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold">{p.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <Line icon={MapPin} text={p.address} />
                        <Line icon={Phone} text={p.phone} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          {/* TRANSPORT */}
          {tab === "transport" && (
            <motion.section key="transport" {...fade}>
              <SectionTitle icon={Bus} title="Transport" />
              <IfEmpty items={current} empty="No transport info yet. (Sample data coming soon.)" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {current.map((t) => (
                  <Card key={t.id}>
                    {t.photos?.[0] && <Img src={t.photos[0]} alt={t.name} />}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold">{t.name}</h3>
                      <p className="text-sm text-gray-600">{t.notes}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* MVP hint */}
        <p className="mt-10 text-xs text-gray-500">
          MVP demo — expand the arrays in this file or move them to{" "}
          <code className="rounded bg-gray-200 px-1 py-0.5">/src/content.ts</code> later.
        </p>
      </main>
    </div>
  );
}

// -----------------------------
// REUSABLE BITS
// -----------------------------
function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon size={18} className="text-black" />
      <h2 className="font-semibold">{title}</h2>
    </div>
  );
}

function Line({ icon: Icon, text }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-2 text-gray-700">
      <Icon size={16} className="text-gray-500" />
      <span className="truncate">{text}</span>
    </div>
  );
}

function IfEmpty({ items, empty }) {
  const isEmpty = Array.isArray(items) ? items.length === 0 : !items || Object.keys(items).length === 0;
  if (!isEmpty) return null;
  return (
    <Card>
      <div className="p-6 text-center text-gray-600">{empty}</div>
    </Card>
  );
}

function formatPrice(n) {
  if (typeof n !== "number") return "—";
  return n.toLocaleString("en-IN");
}
