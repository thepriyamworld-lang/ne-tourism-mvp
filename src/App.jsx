import React, { useEffect, useMemo, useState } from "react";

/** =========================
 *  Visual constants
 *  ========================= */
const LOGO_SRC = "/logo.png";
const SPLASH_MS = 1100; // a touch snappier

const TABS = [
  { key: "sightseeing", label: "Sightseeing", icon: "🗺️" },
  { key: "food", label: "Food", icon: "🍲" },
  { key: "stay", label: "Stay", icon: "🏨" },
  { key: "festivals", label: "Festivals", icon: "🎉" },
  { key: "emergency", label: "Emergency", icon: "⛑️" },
];

const CITY_OPTIONS = [
  { key: "guwahati", name: "Guwahati", state: "Assam", imgSrc: "/assets/cities/guwahati.jpg" },
  { key: "shillong", name: "Shillong", state: "Meghalaya", imgSrc: "/assets/cities/shillong.jpg" },
  { key: "gangtok", name: "Gangtok", state: "Sikkim", imgSrc: "/assets/cities/gangtok.jpg" },
  { key: "aizawl", name: "Aizawl", state: "Mizoram", imgSrc: "/assets/cities/aizawl.jpg" },
  { key: "imphal", name: "Imphal", state: "Manipur", imgSrc: "/assets/cities/imphal.jpg" },
  { key: "itanagar", name: "Itanagar", state: "Arunachal Pradesh", imgSrc: "/assets/cities/itanagar.jpg" },
  { key: "agartala", name: "Agartala", state: "Tripura", imgSrc: "/assets/cities/agartala.jpg" },
  { key: "kohima", name: "Kohima", state: "Nagaland", imgSrc: "/assets/cities/kohima.jpg" },
  { key: "tawang", name: "Tawang", state: "Arunachal Pradesh", imgSrc: "/assets/cities/tawang.jpg" },
  { key: "dimapur", name: "Dimapur", state: "Nagaland", imgSrc: "/assets/cities/dimapur.jpg" },
  { key: "majuli", name: "Majuli", state: "Assam", imgSrc: "/assets/cities/majuli.jpg" },
  { key: "ziro", name: "Ziro", state: "Arunachal Pradesh", imgSrc: "/assets/cities/ziro.jpg" },
];

// Content (kept from your working sample, tidied)
const CONTENT = {
  general: {
    sightseeing: [
      { title: "City Viewpoints", desc: "Golden-hour views. Carry a light layer—breezy evenings." },
      { title: "Monasteries & Churches", desc: "Living heritage; respect quiet hours & dress codes." },
    ],
    food: [
      { title: "Tea & Momos", desc: "Steaming momos with milk/black tea across NE towns." },
      { title: "Local Breakfast Corners", desc: "Hearty plates near markets; ask for seasonal specials." },
    ],
    stay: [
      { title: "Family Homestays", desc: "Community-run, authentic meals, local guidance." },
      { title: "Eco-lodges", desc: "Low-impact properties close to trails & viewpoints." },
    ],
    festivals: [
      { title: "Seasonal Calendar", desc: "Dates shift with lunar calendar/weather—check locally." },
      { title: "Handloom Fairs", desc: "Buy directly from artisans—ethical & memorable." },
    ],
    emergency: [
      { title: "Emergency", desc: "112 (pan-India) | Ambulance 108 | Police 100 | Fire 101" },
      { title: "Traveler Tips", desc: "Carry ID, basic meds, and cash for low-connectivity areas." },
    ],
  },
  guwahati: {
    sightseeing: [
      { title: "Kamakhya Temple", desc: "Historic Shakti Peetha on Nilachal Hill; go early." },
      { title: "Umananda Island", desc: "Short ferry to Brahmaputra’s river island temple." },
    ],
    food: [
      { title: "Assamese Thali", desc: "Khar, tenga, bamboo shoot sides; seasonal fish curry." },
      { title: "Riverside Cafés", desc: "Sunset tea & snacks with Brahmaputra views." },
    ],
  },
  shillong: {
    sightseeing: [
      { title: "Ward’s Lake", desc: "Garden circuit & boating in the city." },
      { title: "Elephant Falls", desc: "Tiered falls; mornings are calmer." },
    ],
    food: [
      { title: "Jadoh Stalls", desc: "Khasi rice-meat bowls; quick & budget friendly." },
      { title: "Café Shillong", desc: "Bakes & coffee; occasional live music." },
    ],
  },
  gangtok: {
    sightseeing: [
      { title: "MG Marg", desc: "Pedestrian promenade of cafés & bookshops." },
      { title: "Enchey Monastery", desc: "Tranquil complex; check morning prayers." },
    ],
  },
  // ... (other cities keep the same entries you already have)
};

/** =========================
 *  Styles (polished)
 *  ========================= */
const styles = {
  app: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    background: "linear-gradient(180deg, #0a1020 0%, #0b1220 60%, #0a0f1d 100%)",
    color: "#e8edff",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
  },
  max: { width: "100%", maxWidth: 1120, margin: "0 auto" },

  // Header (sticky)
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backdropFilter: "blur(8px)",
    background: "rgba(9,14,27,0.6)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  headerRow: {
    ...this,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 20px",
  },

  // Hero
  hero: (hasHero) => ({
    position: "relative",
    height: 260,
    display: "grid",
    alignItems: "end",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: hasHero
      ? `center/cover no-repeat url('/assets/hero.jpg')`
      : "radial-gradient(70% 120% at 20% 0%, rgba(94,107,241,0.25) 0%, rgba(94,107,241,0.0) 60%), linear-gradient(180deg,#0a1020,#0b1220)",
  }),
  heroShade: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(2,6,18,0.0) 0%, rgba(2,6,18,0.75) 60%, rgba(2,6,18,0.95) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    padding: "24px 20px",
  },
  heroTitle: { fontSize: 28, fontWeight: 900, letterSpacing: 0.2 },
  heroSub: { marginTop: 8, opacity: 0.9, maxWidth: 780 },

  // Sections
  section: { padding: "20px" },

  // Card & grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 14,
  },
  cityCard: {
    position: "relative",
    borderRadius: 18,
    overflow: "hidden",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    cursor: "pointer",
    transition: "transform .18s ease, box-shadow .18s ease",
  },
  cityImg: { width: "100%", height: 150, objectFit: "cover", display: "block" },
  cityOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(6,10,20,0) 40%, rgba(6,10,20,0.85) 100%)",
  },
  cityMeta: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 12,
    color: "white",
  },
  cityName: { fontWeight: 800, fontSize: 16, textShadow: "0 2px 6px rgba(0,0,0,0.45)" },
  cityState: { fontSize: 12, opacity: 0.9 },

  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 16,
  },

  // Tabs
  tabBar: {
    position: "sticky",
    bottom: 0,
    zIndex: 5,
    marginTop: 18,
    background: "rgba(10,15,28,0.9)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    display: "flex",
    gap: 6,
    padding: "6px",
    backdropFilter: "blur(6px)",
  },
  tabBtn: (active) => ({
    flex: 1,
    padding: "12px 10px",
    borderRadius: 12,
    border: "1px solid " + (active ? "rgba(95,108,241,0.9)" : "transparent"),
    background: active ? "rgba(95,108,241,0.18)" : "transparent",
    color: active ? "#dfe3ff" : "#aeb7d9",
    fontWeight: 700,
    textAlign: "center",
    cursor: "pointer",
    whiteSpace: "nowrap",
  }),
  badge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: 12,
    opacity: 0.85,
  },
};

/** =========================
 *  Screens
 *  ========================= */

function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, SPLASH_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ ...styles.app, alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src={LOGO_SRC}
          alt="App logo"
          style={{ width: 116, height: 116, objectFit: "contain", margin: "0 auto 14px" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 0.3 }}>North-East India Travel</div>
        <div style={{ marginTop: 8, opacity: 0.8 }}>Food • Stays • Sights • Festivals • Emergency</div>
        <div style={{ height: 24 }} />
        <div
          style={{
            width: 180,
            height: 6,
            margin: "0 auto",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "60%",
              height: "100%",
              background: "linear-gradient(90deg,#6e7bff,#5f6cf1)",
              borderRadius: 999,
              animation: "bar 1.15s ease-in-out infinite",
            }}
          />
        </div>
        <style>{`
          @keyframes bar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(10%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
}

function Header({ onHome, city }) {
  return (
    <div style={styles.header}>
      <div style={{ ...styles.max, ...styles.headerRow }}>
        {onHome ? (
          <button onClick={onHome} style={{ ...styles.badge, background: "transparent", cursor: "pointer" }}>
            ← Home
          </button>
        ) : (
          <span style={styles.badge}>NE India</span>
        )}
        <div style={{ fontWeight: 900, letterSpacing: 0.3, marginLeft: 8 }}>
          North-East India Travel
        </div>
        <div style={{ marginLeft: "auto", opacity: 0.75, fontSize: 12 }}>
          {city ? `Exploring: ${city.name}, ${city.state}` : "Plan your trip"}
        </div>
      </div>
    </div>
  );
}

function Home({ onCitySelect }) {
  // Detect hero presence (non-blocking)
  const [hasHero, setHasHero] = useState(true);
  useEffect(() => {
    const i = new Image();
    i.onload = () => setHasHero(true);
    i.onerror = () => setHasHero(false);
    i.src = "/assets/hero.jpg";
  }, []);

  return (
    <>
      <div style={{ ...styles.hero(hasHero) }}>
        <div style={styles.heroShade} />
        <div style={{ ...styles.max, ...styles.heroContent }}>
          <div style={styles.heroTitle}>Plan your North-East escape</div>
          <div style={styles.heroSub}>
            Choose a city to explore curated eats, sights, stays, festivals, and emergency info—built for
            clarity on the road.
          </div>
          <div style={{ height: 10 }} />
          <div style={{ ...styles.badge }}>12 curated cities • offline-friendly tips</div>
        </div>
      </div>

      <section style={{ ...styles.section }}>
        <div style={styles.max}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Choose a city</h2>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Tap any card to enter</div>
          </div>
          <div style={styles.grid}>
            {CITY_OPTIONS.map((c) => (
              <div
                key={c.key}
                onClick={() => onCitySelect(c)}
                style={styles.cityCard}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {c.imgSrc ? (
                  <img src={c.imgSrc} alt={`${c.name}, ${c.state}`} style={styles.cityImg} />
                ) : (
                  <div style={{ ...styles.cityImg, display: "grid", placeItems: "center", background: "#16203a" }}>
                    <span style={{ opacity: 0.7 }}>{c.name}</span>
                  </div>
                )}
                <div style={styles.cityOverlay} />
                <div style={styles.cityMeta}>
                  <div style={styles.cityName}>{c.name}</div>
                  <div style={styles.cityState}>{c.state}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CityScreen({ city }) {
  const [active, setActive] = useState("sightseeing");

  // merge fallback + city overrides
  const data = useMemo(() => {
    const base = CONTENT.general || {};
    const cityData = (city && CONTENT[city.key]) || {};
    return { ...base, ...cityData };
  }, [city]);

  const list = data[active] || [];

  return (
    <section style={{ ...styles.section }}>
      <div style={styles.max}>
        <div style={{ ...styles.card, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{city.name}, {city.state}</div>
          <span style={styles.badge}>Curated</span>
        </div>

        {/* Tabs */}
        <div style={styles.tabBar} role="tablist" aria-label="Categories">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              style={styles.tabBtn(active === t.key)}
              role="tab"
              aria-selected={active === t.key}
            >
              <span style={{ marginRight: 6 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {list.length ? (
            list.map((item, idx) => (
              <div key={idx} style={{ ...styles.card, minHeight: 110, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{item.title}</div>
                  <div style={{ opacity: 0.85, marginTop: 6 }}>{item.desc}</div>
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 8, opacity: 0.8, fontSize: 12 }}>
                  <span style={styles.badge}>Save</span>
                  <span style={styles.badge}>Map</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ ...styles.card }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>No entries yet</div>
              <div style={{ opacity: 0.85 }}>We’re still curating this section. Check back soon.</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** =========================
 *  Root App (state navigation)
 *  ========================= */
export default function App() {
  const [stage, setStage] = useState("splash"); // splash | home | city
  const [city, setCity] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedCity = localStorage.getItem("ne.selectedCity");
      if (savedCity) setCity(JSON.parse(savedCity));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    try {
      if (city) localStorage.setItem("ne.selectedCity", JSON.stringify(city));
    } catch {}
  }, [city]);

  useEffect(() => {
    if (stage === "splash") {
      const t = setTimeout(() => setStage("home"), SPLASH_MS);
      return () => clearTimeout(t);
    }
  }, [stage]);

  if (!ready) return null;

  if (stage === "splash") return <Splash onDone={() => setStage("home")} />;

  if (stage === "home")
    return (
      <div style={styles.app}>
        <Header />
        <Home
          onCitySelect={(c) => {
            setCity(c);
            setStage("city");
          }}
        />
      </div>
    );

  return (
    <div style={styles.app}>
      <Header onHome={() => setStage("home")} city={city} />
      <CityScreen city={city || CITY_OPTIONS[0]} />
    </div>
  );
}
