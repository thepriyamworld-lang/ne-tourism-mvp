// src/App.jsx
import React, { useMemo, useState } from "react";
import {
  MapPin,
  Phone,
  Star,
  Utensils,
  Hotel,
  Landmark,
  ShieldCheck,
  LifeBuoy,
  Pill,
  Bus,
  CalendarDays,
} from "lucide-react";

/** =========================
 * Inline DATA (edit/expand later)
 * ========================= */
const CONTENT = {
  meta: { cityName: "Your City", subtitle: "North-East Explorer — MVP" },

  food: [
    {
      id: "f-1",
      name: "Spice Bazaar",
      notes: "Authentic local cuisine with vegetarian options.",
      rating: 4.5,
      location: "Main Market",
      phone: "+91-00000-00000",
      photos: [],
    },
    {
      id: "f-2",
      name: "Tea & Trails",
      notes: "Scenic views, great momos and tea.",
      rating: 4.2,
      location: "Hillside Road",
      phone: "+91-11111-11111",
      photos: [],
    },
  ],

  sightseeing: [
    {
      id: "s-1",
      name: "Sky View Point",
      notes: "Best sunrise spot.",
      rating: 4.7,
      location: "East Ridge",
      phone: "",
      photos: [],
    },
    {
      id: "s-2",
      name: "Old Fort",
      notes: "Historic landmark and museum.",
      rating: 4.4,
      location: "Fort Road",
      phone: "",
      photos: [],
    },
  ],

  stay: [
    {
      id: "st-1",
      name: "Pine Resort",
      notes: "Cozy rooms, mountain view.",
      rating: 4.3,
      location: "Valley Side",
      phone: "+91-22222-22222",
      roomType: "Deluxe",
      pricePerNight: 2800,
      photos: [],
    },
  ],

  culture: {
    festivals: [
      { name: "Harvest Fest", when: "March", notes: "Parades and folk music." },
      { name: "River Lights", when: "October", notes: "Lanterns and food stalls." },
    ],
  },

  emergencies: {
    police: { name: "City Police", phone: "+91-100" },
    helpdesk: { name: "Tourist Helpdesk", phone: "+91-1800-123-000" },
  },

  pharmacies: [
    { id: "ph-1", name: "Care Pharmacy", location: "High Street", phone: "+91-33333-33333", notes: "24/7" },
  ],

  transport: [
    { id: "t-1", name: "Central Bus Stand", location: "Civic Center", phone: "", notes: "Intercity buses hourly." },
  ],
};

/** =========================
 * Helpers (UI)
 * ========================= */
function Stars({ score = 0 }) {
  const s = Math.max(0, Math.min(5, Number(score) || 0));
  const full = Math.floor(s);
  const half = s - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < full || (i === full && half) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">{s.toFixed(1)}</span>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 ${className}`}>{children}</div>;
}

function ImgOrPlaceholder({ src, alt, label }) {
  return src ? (
    <img src={src} alt={alt || label} className="w-full h-44 object-cover" />
  ) : (
    <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-xs text-gray-500">{label || "Photo"}</div>
  );
}

function INR(n) {
  const v = Number(n || 0);
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);
}

/** =========================
 * Section components
 * ========================= */
function FoodGrid({ items }) {
  const list = items || [];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {list.length === 0 && (
        <Card>
          <div className="p-6 text-center text-gray-600">No food listings yet.</div>
        </Card>
      )}
      {list.map((f) => (
        <Card key={f.id}>
          <ImgOrPlaceholder src={f.photos?.[0]} alt={f.name} label="Food" />
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{f.name}</h4>
              <Stars score={f.rating} />
            </div>
            <p className="text-sm text-gray-700">{f.notes}</p>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {f.location || "—"}
              </span>
              {f.phone ? (
                <a href={`tel:${f.phone}`} className="inline-flex items-center gap-1 hover:underline">
                  <Phone className="h-4 w-4" />
                  {f.phone}
                </a>
              ) : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function SightseeingGrid({ items }) {
  const list = items || [];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {list.length === 0 && (
        <Card>
          <div className="p-6 text-center text-gray-600">No sightseeing spots yet.</div>
        </Card>
      )}
      {list.map((s) => (
        <Card key={s.id}>
          <ImgOrPlaceholder src={s.photos?.[0]} alt={s.name} label="Sightseeing" />
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{s.name}</h4>
              <Stars score={s.rating} />
            </div>
            <p className="text-sm text-gray-700">{s.notes}</p>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {s.location || "—"}
              </span>
              {s.phone ? (
                <a href={`tel:${s.phone}`} className="inline-flex items-center gap-1 hover:underline">
                  <Phone className="h-4 w-4" />
                  {s.phone}
                </a>
              ) : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function StayGrid({ items }) {
  const list = items || [];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {list.length === 0 && (
        <Card>
          <div className="p-6 text-center text-gray-600">No stays yet.</div>
        </Card>
      )}
      {list.map((h) => (
        <Card key={h.id}>
          <ImgOrPlaceholder src={h.photos?.[0]} alt={h.name} label="Stay" />
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{h.name}</h4>
              <Stars score={h.rating} />
            </div>
            <p className="text-sm text-gray-700">{h.notes}</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1">
                <Hotel className="h-4 w-4" />
                {h.roomType || "—"}
              </span>
              <span className="inline-flex items-center gap-1 justify-end">
                <span className="font-medium">{INR(h.pricePerNight || 0)}</span>
                <span>/night</span>
              </span>
            </div>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {h.location || "—"}
              </span>
              {h.phone ? (
                <a href={`tel:${h.phone}`} className="inline-flex items-center gap-1 hover:underline">
                  <Phone className="h-4 w-4" />
                  {h.phone}
                </a>
              ) : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Festivals({ items }) {
  const list = items || [];
  return (
    <Card>
      <div className="p-4">
        <h4 className="font-semibold mb-2 inline-flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Festivals
        </h4>
        {list.length === 0 ? (
          <p className="text-sm text-gray-600">No festivals listed.</p>
        ) : (
          <ul className="text-sm text-gray-700 space-y-1">
            {list.map((f, i) => (
              <li key={i}>
                <strong className="mr-1">{f.name}</strong> — {f.when}
                {f.notes ? <span className="text-gray-600"> · {f.notes}</span> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function Emergencies({ police, helpdesk }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <div className="p-4 space-y-1">
          <h4 className="font-semibold inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Police
          </h4>
          <div className="text-sm text-gray-700">{police?.name || "—"}</div>
          {police?.phone ? (
            <a href={`tel:${police.phone}`} className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1">
              <Phone className="h-4 w-4" /> {police.phone}
            </a>
          ) : (
            <div className="text-sm text-gray-500">No phone</div>
          )}
        </div>
      </Card>

      <Card>
        <div className="p-4 space-y-1">
          <h4 className="font-semibold inline-flex items-center gap-2">
            <LifeBuoy className="h-4 w-4" /> Helpdesk
          </h4>
          <div className="text-sm text-gray-700">{helpdesk?.name || "—"}</div>
          {helpdesk?.phone ? (
            <a href={`tel:${helpdesk.phone}`} className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1">
              <Phone className="h-4 w-4" /> {helpdesk.phone}
            </a>
          ) : (
            <div className="text-sm text-gray-500">No phone</div>
          )}
        </div>
      </Card>
    </div>
  );
}

function Pharmacies({ items }) {
  const list = items || [];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {list.length === 0 && (
        <Card>
          <div className="p-6 text-center text-gray-600">No pharmacies listed.</div>
        </Card>
      )}
      {list.map((p) => (
        <Card key={p.id}>
          <div className="p-4 space-y-2">
            <h4 className="font-semibold inline-flex items-center gap-2">
              <Pill className="h-4 w-4" />
              {p.name}
            </h4>
            <p className="text-sm text-gray-700">{p.notes}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {p.location || "—"}
              </span>
              {p.phone ? (
                <a href={`tel:${p.phone}`} className="inline-flex items-center gap-1 hover:underline">
                  <Phone className="h-4 w-4" />
                  {p.phone}
                </a>
              ) : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Transport({ items }) {
  const list = items || [];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {list.length === 0 && (
        <Card>
          <div className="p-6 text-center text-gray-600">No transport entries.</div>
        </Card>
      )}
      {list.map((t) => (
        <Card key={t.id}>
          <div className="p-4 space-y-2">
            <h4 className="font-semibold inline-flex items-center gap-2">
              <Bus className="h-4 w-4" />
              {t.name}
            </h4>
            <p className="text-sm text-gray-700">{t.notes}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {t.location || "—"}
              </span>
              {t.phone ? (
                <a href={`tel:${t.phone}`} className="inline-flex items-center gap-1 hover:underline">
                  <Phone className="h-4 w-4" />
                  {t.phone}
                </a>
              ) : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/** =========================
 * App
 * ========================= */
export default function App() {
  const data = useMemo(() => CONTENT, []);
  const [tab, setTab] = useState("food");

  const tabs = [
    { key: "food", label: "Food", icon: Utensils },
    { key: "sightseeing", label: "Sightseeing", icon: Landmark },
    { key: "stay", label: "Stay", icon: Hotel },
    { key: "festivals", label: "Festivals", icon: CalendarDays },
    { key: "emergencies", label: "Emergency", icon: ShieldCheck },
    { key: "pharmacies", label: "Pharmacies", icon: Pill },
    { key: "transport", label: "Transport", icon: Bus },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-semibold">{data.meta?.cityName || "Explorer"}</h1>
            <p className="text-xs text-gray-600">{data.meta?.subtitle || "MVP"}</p>
          </div>
          <nav className="flex flex-wrap gap-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${
                  tab === key
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {tab === "food" && <FoodGrid items={data.food} />}
        {tab === "sightseeing" && <SightseeingGrid items={data.sightseeing} />}
        {tab === "stay" && <StayGrid items={data.stay} />}
        {tab === "festivals" && <Festivals items={data.culture?.festivals} />}
        {tab === "emergencies" && (
          <Emergencies police={data.emergencies?.police} helpdesk={data.emergencies?.helpdesk} />
        )}
        {tab === "pharmacies" && <Pharmacies items={data.pharmacies} />}
        {tab === "transport" && <Transport items={data.transport} />}
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10 pt-4 text-xs text-gray-500">
        MVP demo — expand the arrays in this file (CONTENT) or move them to a separate `src/content.js` later.
      </footer>
    </div>
  );
}
