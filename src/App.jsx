import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

/**
 * NE Tourism MVP — Single-file App.jsx (CTO++ / QA hardened / content-rich)
 * -------------------------------------------------------
 * ✅ Modern Home (hero carousel, Packages, Best Places)
 * ✅ City page with sticky tabs, search, robust cards, gallery, reviews
 * ✅ Save (favorites, localStorage), Share/Copy, Open in Maps, Call/Website
 * ✅ Safe image component with multi-step fallback (no infinite onError loops)
 * ✅ Gentle filters/sort by rating/price where available
 * ✅ Zero external UI deps (Tailwind-only). Router only.
 *
 * How to run:
 * 1) Ensure images live in /public/assets/cities/<slug>.jpg (plus generic.jpg optional)
 * 2) Replace src/App.jsx with this file
 * 3) npm i react-router-dom
 * 4) npm run dev
 */

// ---------- Utilities ----------
const cls = (...xs) => xs.filter(Boolean).join(" ");
const INR = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const fmtINR = (n) => (typeof n === "number" ? INR.format(n) : n);
const storageKey = "ne_tourism_favs_v1";
const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNjQwJyBoZWlnaHQ9JzM2MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCBmaWxsPSIjMTMxODI0IiB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJy8+PHRleHQgeD0nNTAnIHk9JzIwJScgZmlsbD0nI2I0YmJjYycgZm9udC1zaXplPScxNSc+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+";

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

// Robust image with double fallback
function SafeImage({ src, alt = "", className = "", style }) {
  const [step, setStep] = useState(0); // 0: src, 1: generic, 2: placeholder
  const generic = "/assets/cities/generic.jpg"; // optional in /public
  const pick = step === 0 ? src : step === 1 ? generic : PLACEHOLDER;
  return (
    <img
      src={pick}
      alt={alt}
      className={className}
      style={style}
      onError={() => setStep((s) => (s < 2 ? s + 1 : s))}
      loading="lazy"
      decoding="async"
    />
  );
}

// ---------- Cities & Sample Content ----------
// Heavily contented sample generator: adds rich mock entries for every city so the UI looks alive.
// Replace with real data later by hitting an API or importing JSON.

function minutesToHuman(m) {
  if (!m && m !== 0) return "—";
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h && mm) return `${h}h ${mm}m`;
  if (h) return `${h}h`;
  return `${mm}m`;
}

function buildCityData(c) {
  const mapsQ = encodeURIComponent(`${c.name}, ${c.state}`);
  const baseMaps = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
  const hero = cityHero(c.slug);
  const mkThumb = () => hero; // swap to entry-specific later
  const mkGallery = () => [hero, hero];

  // --- Stays (4 rich examples) ---
  const stays = [
    { id: `${c.slug}-stay-1`, type: "stay", title: `${c.name} Riverside Lodge`, description: `Cozy rooms by the river with balcony views and local cuisine.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.5,
      reviews: { count: 128, breakdown: { 5:85, 4:30, 3:10, 2:2, 1:1 } },
      fields: { roomType: "Deluxe / Family", priceFrom: 2400, amenities: ["Wi‑Fi","Breakfast","Parking"], checkIn: "1:00 PM", checkOut: "11:00 AM" },
      location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "+91-98765-43210", website: "#" }, tags: ["Scenic","Family","Budget"] },
    { id: `${c.slug}-stay-2`, type: "stay", title: `${c.name} Hilltop Homestay`, description: `Wooden cottages amidst pine groves; great sunrise points.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.7,
      reviews: { count: 96, breakdown: { 5:70, 4:20, 3:5, 2:1, 1:0 } },
      fields: { roomType: "Cottage", priceFrom: 3200, amenities: ["Bonfire","Local Meals","Guide"], checkIn: "12:00 PM", checkOut: "10:00 AM" },
      location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "+91-99870-11223", website: "#" }, tags: ["Couples","Sunrise","Cottages"] },
    { id: `${c.slug}-stay-3`, type: "stay", title: `${c.name} Heritage Inn`, description: `Colonial-era guesthouse with courtyards and library.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.2,
      reviews: { count: 61, breakdown: { 5:30, 4:20, 3:7, 2:3, 1:1 } },
      fields: { roomType: "Standard", priceFrom: 1800, amenities: ["Wi‑Fi","Breakfast"], checkIn: "2:00 PM", checkOut: "11:00 AM" },
      location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "+91-90123-45678", website: "#" }, tags: ["Budget","Heritage"] },
    { id: `${c.slug}-stay-4`, type: "stay", title: `${c.name} Eco Retreat`, description: `Sustainable cottages, organic meals, birding trails.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.8,
      reviews: { count: 142, breakdown: { 5:110, 4:24, 3:6, 2:1, 1:1 } },
      fields: { roomType: "Villa", priceFrom: 5200, amenities: ["Solar Hot Water","Local Guide","Parking"], checkIn: "12:30 PM", checkOut: "10:30 AM" },
      location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "+91-90000-22222", website: "#" }, tags: ["Eco","Premium","Nature"] },
  ];

  // --- Sightseeing (4) ---
  const sightseeing = [
    { id: `${c.slug}-see-1`, type: "sightseeing", title: `${c.name} Viewpoint`, description: `Panoramic valley views; best during golden hour.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.6,
      reviews: { count: 210, breakdown: { 5:150, 4:40, 3:15, 2:3, 1:2 } },
      fields: { entryFee: 20, timings: "6:00 AM – 6:00 PM", bestTime: "Sunrise/Sunset", timeRequiredMins: 60 },
      location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "", website: "#" }, tags: ["Sunset","Photography"] },
    { id: `${c.slug}-see-2`, type: "sightseeing", title: `${c.name} Riverside Walk`, description: `Quiet stretch by the river with suspension bridge views.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.4,
      reviews: { count: 144, breakdown: { 5:90, 4:35, 3:12, 2:5, 1:2 } },
      fields: { entryFee: 0, timings: "Open Area – Always", timeRequiredMins: 45 },
      location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "", website: "#" }, tags: ["Bridge","Nature"] },
    { id: `${c.slug}-see-3`, type: "sightseeing", title: `${c.name} Local Museum`, description: `Culture & crafts from the region; guided tours hourly.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.1,
      reviews: { count: 88, breakdown: { 5:40, 4:28, 3:15, 2:3, 1:2 } },
      fields: { entryFee: 50, timings: "10:00 AM – 5:00 PM", timeRequiredMins: 90 },
      location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "", website: "#" }, tags: ["Culture","Museum"] },
    { id: `${c.slug}-see-4`, type: "sightseeing", title: `${c.name} Botanical Park`, description: `Seasonal blooms, bamboo groves, lakeside paths.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.3,
      reviews: { count: 133, breakdown: { 5:70, 4:40, 3:18, 2:3, 1:2 } },
      fields: { entryFee: 30, timings: "8:00 AM – 6:00 PM", timeRequiredMins: 80 },
      location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "", website: "#" }, tags: ["Park","Family"] },
  ];

  // --- Food (3) ---
  const food = [
    { id: `${c.slug}-food-1`, type: "food", title: `${c.name} Kitchen & Grill`, description: `Local thalis, smoked meats, fresh greens. Vegetarian options available.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.3,
      reviews: { count: 78, breakdown: { 5:42, 4:22, 3:10, 2:3, 1:1 } },
      fields: { priceForTwo: 800, cuisine: ["Local","North‑Indian"], vegFriendly: true }, location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "+91-90909-00000", website: "#" }, tags: ["Local","Family"] },
    { id: `${c.slug}-food-2`, type: "food", title: `${c.name} Tea Lounge`, description: `Estate teas, light snacks, valley views.`, thumb: mkThumb(), gallery: mkGallery(), rating: 4.5,
      reviews: { count: 55, breakdown: { 5:35, 4:15, 3:4, 2:1, 1:0 } },
      fields: { priceForTwo: 500, cuisine: ["Cafe"], vegFriendly: true }, location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "", website: "#" }, tags: ["Cafe","Tea"] },
    { id: `${c.slug}-food-3`, type: "food", title: `${c.name} Night Market", description: "Street snacks and local produce in the evening.", thumb: mkThumb(), gallery: mkGallery(), rating: 4.0,
      reviews: { count: 120, breakdown: { 5:60, 4:35, 3:18, 2:5, 1:2 } },
      fields: { priceForTwo: 400, cuisine: ["Street Food"], vegFriendly: true }, location: { mapsUrl: baseMaps, address: `${c.name}, ${c.state}` }, contact: { phone: "", website: "#" }, tags: ["Street","Budget"] },
  ];

  // --- Transport (2) ---
  const transport = [
    { id: `${c.slug}-tx-1`, type: "transport", title: "Bus Stand", description: "Intercity and local buses.", thumb: mkThumb(), gallery: mkGallery(), rating: 4.0,
      reviews: { count: 40, breakdown: { 5:15, 4:12, 3:9, 2:3, 1:1 } },
      fields: { timings: "5:00 AM – 9:00 PM", operators: ["ASTC","Private"], approxFare: 120 }, location: { mapsUrl: baseMaps, address: `${c.name} Bus Stand` }, tags: ["Transit"] },
    { id: `${c.slug}-tx-2`, type: "transport", title: "Taxi Point", description: "Shared jeeps and taxis to nearby towns.", thumb: mkThumb(), gallery: mkGallery(), rating: 4.2,
      reviews: { count: 62, breakdown: { 5:30, 4:20, 3:9, 2:2, 1:1 } },
      fields: { timings: "6:00 AM – 7:00 PM", approxFare: 350 }, location: { mapsUrl: baseMaps, address: `${c.name} Taxi Point` }, tags: ["Transit"] },
  ];

  // --- Festivals (1) ---
  const festivals = [
    { id: `${c.slug}-fest-1`, type: "festival", title: `${c.name} Cultural Fest`, description: "Music, crafts, and food pop‑ups.", thumb: mkThumb(), gallery: mkGallery(), rating: 4.6,
      reviews: { count: 200, breakdown: { 5:140, 4:40, 3:15, 2:3, 1:2 } },
      fields: { month: "Nov–Feb", ticket: 100 }, location: { mapsUrl: baseMaps, address: `${c.name}` }, tags: ["Seasonal","Culture"] },
  ];

  // --- Emergency & Pharmacy (2+1) ---
  const emergency = [
    { id: `${c.slug}-emr-1`, type: "emergency", title: "Police Control Room", description: "24x7 – Dial 100 / 112", location: { mapsUrl: baseMaps, address: c.name } },
    { id: `${c.slug}-emr-2`, type: "emergency", title: "Nearest Hospital", description: "Emergency Ward & OPD", location: { mapsUrl: baseMaps, address: c.name } },
  ];
  const pharmacy = [
    { id: `${c.slug}-med-1`, type: "pharmacy", title: "24x7 Pharmacy", description: "Emergency medicines and first‑aid.", thumb: mkThumb(), gallery: mkGallery(), rating: 4.1,
      reviews: { count: 33, breakdown: { 5:15, 4:10, 3:6, 2:1, 1:1 } }, fields: { timings: "24 Hours" }, location: { mapsUrl: baseMaps, address: `${c.name}` }, tags: ["Medical"] },
  ];

  const packages = [
    { id: `${c.slug}-pkg-1`, title: `${c.name} Weekend Escape`, days: 2, nights: 1, price: 5499, includes: ["Stay","Breakfast","Local tour"], hero },
    { id: `${c.slug}-pkg-2`, title: `${c.name} Heritage & Nature`, days: 4, nights: 3, price: 12999, includes: ["Stay","Guide","Transfers"], hero },
  ];

  return { ...c, hero, packages, categories: { stay: stays, sightseeing, food, transport, festivals, pharmacy, emergency, notes: [] } };
}

const CITIES = CITY_LIST.map(buildCityData);

// ---------- App Shell ----------
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <SiteNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:slug" element={<CityPage />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30">NE</span>
          <span className="font-semibold tracking-wide">North‑East India Travel</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#packages" className="hover:text-sky-300">Packages</a>
          <a href="#best" className="hover:text-sky-300">Best Places</a>
          <Link to="/saved" className="hover:text-sky-300">Saved</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/10">Menu</button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-3 space-y-2">
            <a href="#packages" className="block">Packages</a>
            <a href="#best" className="block">Best Places</a>
            <Link to="/saved" className="block">Saved</Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- Home ----------
function Home() {
  const banners = useMemo(() => CITIES.slice(0, 8).map(c => ({ src: c.hero, title: c.name, slug: c.slug })), []);
  return (
    <main>
      <HeroCarousel slides={banners} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeIntro />
        <PackagesSection />
        <BestPlaces />
      </div>
    </main>
  );
}

function HeroCarousel({ slides }) {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000); return () => clearInterval(t); }, [slides.length]);
  const slide = slides[i];
  return (
    <section className="relative">
      <div className="h-[56vh] w-full overflow-hidden">
        <SafeImage src={slide.src} alt={slide.title} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Plan your North‑East escape</h1>
            <p className="mt-2 text-slate-300 max-w-2xl">Choose a city to explore curated stays, sights, food, and emergency info — built for clarity on the road.</p>
          </div>
          <Link to={`/city/${slide.slug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold">Explore {slide.title}</Link>
        </div>
      </div>
      <div className="absolute right-4 bottom-4 flex gap-2">
        {slides.map((_, idx) => (
          <button key={idx} aria-label={`Go to slide ${idx+1}`} onClick={() => setI(idx)} className={cls("h-2 w-6 rounded-full", idx===i?"bg-white":"bg-white/40 hover:bg-white/70")} />
        ))}
      </div>
    </section>
  );
}

function HomeIntro() {
  return (
    <section className="py-10">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { t:"Curated & structured", d:"Each city packs stays, sights, food, and emergency info—cleanly organized with filters and tabs." },
          { t:"Offline‑friendly", d:"Key details are compact; map links open quickly when you’re online." },
          { t:"Built for action", d:"Save places, open maps, copy links, share with friends—everything in one tap." },
        ].map((x, idx) => (
          <div key={idx} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <h3 className="font-semibold text-lg">{x.t}</h3>
            <p className="mt-2 text-sm text-slate-300">{x.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PackagesSection() {
  const top = useMemo(() => CITIES.slice(0,6).flatMap(c => c.packages.map(p => ({...p, city:c}))).slice(0,6), []);
  return (
    <section id="packages" className="py-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">Featured Packages</h2>
        <a href="#" className="text-sm text-sky-300 hover:underline">View all</a>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {top.map(pkg => (
          <article key={pkg.id} className="rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10">
            <div className="h-40 overflow-hidden"><SafeImage src={pkg.hero} alt="" className="w-full h-full object-cover"/></div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{pkg.title}</h3>
                <span className="text-sky-300 text-sm">{pkg.city.name}</span>
              </div>
              <p className="mt-2 text-slate-300 text-sm">{pkg.days}D/{pkg.nights}N • Includes: {pkg.includes.join(", ")}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold">{fmtINR(pkg.price)}</span>
                <Link to={`/city/${pkg.city.slug}`} className="px-3 py-2 rounded-lg bg-sky-500 text-slate-950 font-semibold">Explore</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BestPlaces() {
  return (
    <section id="best" className="py-10">
      <h2 className="text-2xl font-bold">Best Places to Start</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CITIES.slice(0,9).map((c) => (
          <Link to={`/city/${c.slug}`} key={c.slug} className="group rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-sky-400/40">
            <div className="h-44 overflow-hidden">
              <SafeImage src={c.hero} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition"/>
            </div>
            <div className="p-5">
              <h3 className="font-semibold">{c.name} <span className="text-slate-400 text-sm">({c.state})</span></h3>
              <p className="mt-1 text-sm text-slate-300">Curated stays, sights, food & tips.</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ---------- City Page ----------
function CityPage() {
  const { slug } = useParams();
  const city = CITIES.find(c => c.slug === slug);
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [activeTab, setActiveTab] = useState("stay");
  const [sort, setSort] = useState("rating-desc");

  useEffect(() => { window.scrollTo(0,0); }, [slug]);
  if (!city) return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <p>City not found.</p>
      <button className="mt-4 px-4 py-2 bg-white/10 rounded-lg" onClick={()=>navigate("/")}>Back</button>
    </div>
  );

  const tabs = [
    { key: "stay", label: "Stay" },
    { key: "sightseeing", label: "Sightseeing" },
    { key: "food", label: "Food" },
    { key: "transport", label: "Transport" },
    { key: "festivals", label: "Festivals" },
    { key: "pharmacy", label: "Pharmacy" },
    { key: "emergency", label: "Emergency" },
    { key: "notes", label: "Notes" },
  ];

  const list = city.categories[activeTab] || [];
  let filtered = list.filter(item => item.title.toLowerCase().includes(q.toLowerCase()))
  if (sort === "rating-desc") filtered = [...filtered].sort((a,b)=> (b.rating||0)-(a.rating||0));
  if (sort === "price-asc") filtered = [...filtered].sort((a,b)=> (a.fields?.priceFrom||a.fields?.priceForTwo||0) - (b.fields?.priceFrom||b.fields?.priceForTwo||0));

  return (
    <main>
      <section className="relative">
        <div className="h-[38vh] w-full overflow-hidden">
          <SafeImage src={city.hero} alt={city.name} className="h-full w-full object-cover"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold">{city.name} <span className="text-slate-300 text-lg font-normal">({city.state})</span></h1>
              <p className="text-slate-300 mt-1">Explore stays, sights, food & tips curated for travelers.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[56px] z-30 bg-slate-950/95 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-3 gap-3">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} className={cls("px-4 py-2 rounded-xl text-sm", activeTab===t.key?"bg-sky-500 text-slate-950 font-semibold":"bg-white/5 text-slate-200 hover:bg-white/10")}>{t.label}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search in this tab…" className="px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/10 placeholder:text-slate-400 text-sm focus:outline-none"/>
              <select value={sort} onChange={e=>setSort(e.target.value)} className="px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/10 text-sm">
                <option value="rating-desc">Top rated</option>
                <option value="price-asc">Price (low → high)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <EmptyState activeTab={activeTab} />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map(item => (
              <EntryCard key={item.id} city={city} item={item} />)
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyState({ activeTab }) {
  const hint = {
    stay: "Add homestays, hotels, hostels with room types & price.",
    sightseeing: "Add viewpoints, lakes, parks with entry fee & timings.",
    food: "Add local eateries with price for two & cuisine.",
    emergency: "Add police, hospitals, helplines.",
    notes: "Add offline tips, do’s & don’ts, seasonal advice.",
  }[activeTab];
  return (
    <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
      <p className="text-slate-300">No items yet.</p>
      <p className="text-slate-400 text-sm mt-2">{hint}</p>
    </div>
  );
}

// ---------- Entry Card + Reviews + Gallery ----------
function EntryCard({ city, item }) {
  const [showGallery, setShowGallery] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [favs, setFavs] = useLocalStorage(storageKey, {});
  const key = `${city.slug}:${item.id}`;
  const saved = Boolean(favs && favs[key]);
  const toggleSave = () => setFavs((prev) => ({ ...(prev||{}), [key]: saved ? undefined : { city: city.slug, id: item.id, title: item.title } }));

  const share = async () => {
    const url = `${window.location.origin}/city/${city.slug}`;
    try {
      if (navigator.share) { await navigator.share({ title: item.title, text: `Check this in ${city.name}`, url }); }
      else { await navigator.clipboard.writeText(url); alert("Link copied!"); }
    } catch {}
  };

  const openMaps = () => { const m = item.location?.mapsUrl; if (m) window.open(m, "_blank"); };

  return (
    <article className="rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10">
      <div className="grid grid-cols-5">
        <div className="col-span-5 md:col-span-2 h-48 md:h-full overflow-hidden">
          <SafeImage src={item.thumb} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <div className="col-span-5 md:col-span-3 p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-300" style={{display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{item.description}</p>
            </div>
            <div className="text-right min-w-[92px]">
              <StarRating value={item.rating} />
              <button onClick={()=>setShowReviews((v)=>!v)} className="mt-1 text-xs text-sky-300 hover:underline">{showReviews?"Hide":"Reviews"}</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {(item.tags||[]).map(t => <span key={t} className="px-2 py-1 rounded-lg bg-white/5 ring-1 ring-white/10">{t}</span>)}
          </div>

          <MetaFields item={item} />

          <div className="mt-1 flex flex-wrap gap-2">
            <button onClick={()=>setShowGallery(true)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 ring-1 ring-white/15 text-sm">View gallery</button>
            {item.location?.mapsUrl && <button onClick={openMaps} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 ring-1 ring-white/15 text-sm">Open in Maps</button>}
            <button onClick={share} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 ring-1 ring-white/15 text-sm">Share / Copy link</button>
            <button onClick={toggleSave} className={cls("px-3 py-2 rounded-lg text-sm ring-1", saved?"bg-sky-500 text-slate-950 ring-sky-400":"bg-white/10 hover:bg-white/15 ring-white/15")}>{saved?"Saved":"Save"}</button>
            {item.contact?.phone && <a href={`tel:${item.contact.phone}`} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 ring-1 ring-white/15 text-sm">Call</a>}
            {item.contact?.website && item.contact.website !== "#" && <a target="_blank" rel="noreferrer" href={item.contact.website} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 ring-1 ring-white/15 text-sm">Website</a>}
          </div>

          {showReviews && <ReviewBlock reviews={item.reviews} />}
        </div>
      </div>

      {showGallery && <GalleryModal images={item.gallery?.length?item.gallery:[item.thumb]} onClose={()=>setShowGallery(false)} />}
    </article>
  );
}

function MetaFields({ item }) {
  const t = item.type;
  if (t === "stay") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <Field label="Room type" value={item.fields?.roomType} />
        <Field label="Price from" value={item.fields?.priceFrom? fmtINR(item.fields.priceFrom):"—"} />
        <Field label="Amenities" value={(item.fields?.amenities||[]).join(", ")||"—"} />
      </div>
    );
  }
  if (t === "sightseeing") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <Field label="Entry fee" value={item.fields?.entryFee ? fmtINR(item.fields.entryFee) : "Free"} />
        <Field label="Timings" value={item.fields?.timings || "—"} />
        <Field label="Address" value={item.location?.address || "—"} />
      </div>
    );
  }
  if (t === "food") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <Field label="Price for two" value={item.fields?.priceForTwo? fmtINR(item.fields.priceForTwo):"—"} />
        <Field label="Cuisine" value={(item.fields?.cuisine||[]).join(", ")||"—"} />
        <Field label="Address" value={item.location?.address || "—"} />
      </div>
    );
  }
  if (t === "emergency") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <Field label="Details" value={item.description || "—"} />
        <Field label="Address" value={item.location?.address || "—"} />
        {item.location?.mapsUrl && <a target="_blank" rel="noreferrer" href={item.location.mapsUrl} className="mt-1 inline-flex text-sky-300 hover:underline text-sm">View on map →</a>}
      </div>
    );
  }
  if (t === "transport") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <Field label="Timings" value={item.fields?.timings || "—"} />
        <Field label="Approx fare" value={item.fields?.approxFare ? fmtINR(item.fields.approxFare) : "—"} />
        <Field label="Operators" value={(item.fields?.operators||[]).join(", ")||"—"} />
      </div>
    );
  }
  if (t === "festival") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <Field label="Season" value={item.fields?.month || "—"} />
        <Field label="Ticket" value={item.fields?.ticket ? fmtINR(item.fields.ticket) : "Free"} />
        <Field label="Address" value={item.location?.address || "—"} />
      </div>
    );
  }
  if (t === "pharmacy") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <Field label="Timings" value={item.fields?.timings || "—"} />
        <Field label="Address" value={item.location?.address || "—"} />
        {item.location?.mapsUrl && <a target="_blank" rel="noreferrer" href={item.location.mapsUrl} className="mt-1 inline-flex text-sky-300 hover:underline text-sm">View on map →</a>}
      </div>
    );
  }
  return null;
}

function Field({ label, value }) {
  return (
    <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-3">
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1">{value || "—"}</div>
    </div>
  );
}

function StarRating({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value)||0));
  const full = Math.floor(v);
  const half = v - full >= 0.5;
  return (
    <div className="inline-flex items-center gap-1" aria-label={`Rating ${v.toFixed(1)} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cls("h-4 w-4", i < full ? "fill-yellow-400" : i===full && half ? "fill-yellow-300" : "fill-slate-600")}>
          <path d="M10 1.5l2.69 5.45 6.02.88-4.35 4.24 1.03 6.01L10 15.8l-5.39 2.83 1.03-6.01L1.29 7.83l6.02-.88L10 1.5z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-slate-300">{v.toFixed(1)}</span>
    </div>
  );
}

function ReviewBlock({ reviews }) {
  const total = reviews?.count || 0;
  const breakdown = reviews?.breakdown || {};
  const maxCount = Math.max(1, ...Object.values(breakdown));
  return (
    <div className="mt-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
      <div className="text-sm font-semibold">User reviews</div>
      <div className="text-xs text-slate-400">{total} reviews</div>
      <div className="mt-3 space-y-1">
        {[5,4,3,2,1].map(n => (
          <div key={n} className="flex items-center gap-3 text-sm">
            <span className="w-10 text-right">{n}★</span>
            <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-sky-400" style={{ width: `${((breakdown[n]||0)/maxCount)*100}%` }} />
            </div>
            <span className="w-10 text-slate-300 text-right">{breakdown[n]||0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryModal({ images = [], onClose }) {
  const [i, setI] = useState(0);
  useEffect(() => { const onKey = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [onClose]);
  const next = () => setI(p => (p+1)%images.length);
  const prev = () => setI(p => (p-1+images.length)%images.length);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center p-4">
      <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-white/10">
        <SafeImage src={images[i]} alt="gallery" className="w-full h-[60vh] object-cover" />
        <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between">
          <button onClick={onClose} className="px-3 py-2 rounded-lg bg-white/10 ring-1 ring-white/15">Close</button>
          <div className="flex gap-2">
            <button onClick={prev} className="px-3 py-2 rounded-lg bg-white/10 ring-1 ring-white/15">Prev</button>
            <button onClick={next} className="px-3 py-2 rounded-lg bg-white/10 ring-1 ring-white/15">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} NE Tourism MVP</span>
        <span>Built for clarity on the road</span>
      </div>
    </footer>
  );
}

function Saved() {
  const [favs] = useLocalStorage(storageKey, {});
  const items = Object.values(favs || {}).filter(Boolean);
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold">Saved places</h1>
      {items.length === 0 ? (
        <p className="text-slate-300 mt-3">Nothing saved yet. Tap “Save” on any card to add here.</p>
      ) : (
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, idx) => (
            <li key={idx} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-slate-400">/{it.city}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-300">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="mt-6 inline-block px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-semibold">Go home</Link>
    </main>
  );
}
