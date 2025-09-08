import React, { useEffect, useMemo, useState } from "react";

/** =========================
 *  App-level constants
 *  ========================= */
const LOGO_SRC = "/logo.png"; // put your logo in /public/logo.png
const SPLASH_MS = 1400;

const TABS = [
  { key: "food", label: "Food" },
  { key: "sightseeing", label: "Sightseeing" },
  { key: "stay", label: "Stay" },
  { key: "festivals", label: "Festivals" },
  { key: "emergency", label: "Emergency" },
];

// City options with thumbnails under /public/assets/cities
const CITY_OPTIONS = [
  { key: "guwahati", name: "Guwahati (Assam)", imgSrc: "/assets/cities/guwahati.jpg" },
  { key: "shillong", name: "Shillong (Meghalaya)", imgSrc: "/assets/cities/shillong.jpg" },
  { key: "gangtok", name: "Gangtok (Sikkim)", imgSrc: "/assets/cities/gangtok.jpg" },
  { key: "aizawl", name: "Aizawl (Mizoram)", imgSrc: "/assets/cities/aizawl.jpg" },
  { key: "imphal", name: "Imphal (Manipur)", imgSrc: "/assets/cities/imphal.jpg" },
  { key: "itanagar", name: "Itanagar (Arunachal Pradesh)", imgSrc: "/assets/cities/itanagar.jpg" },
  { key: "agartala", name: "Agartala (Tripura)", imgSrc: "/assets/cities/agartala.jpg" },
  { key: "kohima", name: "Kohima (Nagaland)", imgSrc: "/assets/cities/kohima.jpg" },
  { key: "tawang", name: "Tawang (Arunachal Pradesh)", imgSrc: "/assets/cities/tawang.jpg" },
  { key: "dimapur", name: "Dimapur (Nagaland)", imgSrc: "/assets/cities/dimapur.jpg" },
  { key: "majuli", name: "Majuli (Assam)", imgSrc: "/assets/cities/majuli.jpg" },
  { key: "ziro", name: "Ziro (Arunachal Pradesh)", imgSrc: "/assets/cities/ziro.jpg" },
];

// Rich sample content. "general" entries act as fallback for all cities.
// Each city overrides or extends any tab by key.
const CONTENT = {
  general: {
    food: [
      { title: "Local Breakfast Corners", desc: "Simple, hearty plates near markets. Ask for seasonal specialties." },
      { title: "Tea & Momos", desc: "Steaming momos with milk/black tea are easy win across NE towns." },
    ],
    sightseeing: [
      { title: "City Viewpoints", desc: "Golden-hour views; carry a light layer—breezy evenings." },
      { title: "Monasteries & Churches", desc: "Living heritage; respect dress codes & quiet hours." },
    ],
    stay: [
      { title: "Family Homestays", desc: "Community-run, authentic meals, local guidance." },
      { title: "Eco-lodges", desc: "Low-impact properties with trail access and basic amenities." },
    ],
    festivals: [
      { title: "Seasonal Calendar", desc: "Check local boards—dates shift by lunar calendar/weather." },
      { title: "Handloom & Handicraft Fairs", desc: "Great for ethical souvenirs; pay artisans directly." },
    ],
    emergency: [
      { title: "National Emergency", desc: "Dial 112 (pan-India)." },
      { title: "Ambulance", desc: "108 (Emergency Response Service)." },
      { title: "Police", desc: "100  |  Fire: 101" },
      { title: "Traveler Tips", desc: "Carry ID, basic meds, cash for low-connectivity zones." },
    ],
  },

  guwahati: {
    sightseeing: [
      { title: "Kamakhya Temple", desc: "Historic Shakti Peetha atop Nilachal Hill; early mornings best." },
      { title: "Umananda Island", desc: "Ferry to Brahmaputra’s river island temple; short scenic ride." },
    ],
    food: [
      { title: "Assamese Thali", desc: "Khar, tenga, bamboo shoot sides; ask for seasonal fish curry." },
      { title: "Riverside Cafés", desc: "Sunset tea & snacks with Brahmaputra views." },
    ],
    stay: [
      { title: "Panbazar / Fancy Bazar Stays", desc: "Central, walkable to ferries & markets." },
      { title: "Beltola Homestays", desc: "Calmer neighborhoods, easy airport access." },
    ],
    festivals: [
      { title: "Bihu", desc: "Harvest festival (April/Jan); dance & music events across the city." },
    ],
  },

  shillong: {
    sightseeing: [
      { title: "Ward’s Lake", desc: "Garden circuit & paddle boating inside city." },
      { title: "Elephant Falls", desc: "Multi-tiered falls; go early to avoid crowd." },
    ],
    food: [
      { title: "Jadoh Stalls (Police Bazar)", desc: "Staple Khasi rice-meat bowls; budget & quick." },
      { title: "Café Shillong", desc: "Bakes & coffee; live music evenings sometimes." },
    ],
    stay: [
      { title: "Upper Shillong Retreats", desc: "Quieter hillside stays; cooler nights, pack layers." },
      { title: "Police Bazar Guesthouses", desc: "Central & convenient for short city stays." },
    ],
    festivals: [
      { title: "Shad Suk Mynsiem", desc: "Khasi spring thanksgiving festival (Apr)." },
    ],
  },

  gangtok: {
    sightseeing: [
      { title: "MG Marg Walk", desc: "Pedestrian street; cafés, bookshops, souvenirs." },
      { title: "Enchey Monastery", desc: "Peaceful compound; check morning prayers." },
    ],
    food: [
      { title: "Thukpa & Phagshapa", desc: "Sikkimese staples; look for small family kitchens." },
      { title: "Bakeries", desc: "Warm pastries for chilly mornings." },
    ],
    stay: [
      { title: "Deorali Homestays", desc: "Local hosts, easy ropeway access." },
      { title: "Tadong Hotels", desc: "Good mid-range options; taxis available." },
    ],
    festivals: [
      { title: "Losar", desc: "Tibetan New Year; masked dances in monasteries." },
    ],
  },

  aizawl: {
    sightseeing: [
      { title: "Durtlang Hills", desc: "City vistas; light hike; sunset photo point." },
      { title: "Solomon’s Temple", desc: "Distinct architecture; weekends can get busy." },
    ],
    food: [
      { title: "Bai & Sawhchiar", desc: "Mizo comfort dishes; ask hosts for homemade versions." },
      { title: "Tea Houses", desc: "Quiet corners for evening breaks." },
    ],
    stay: [
      { title: "Mission Veng Homestays", desc: "Warm hosts; local tips for day trips." },
      { title: "Zarkawt Hotels", desc: "Central access; markets close by." },
    ],
    festivals: [
      { title: "Chapchar Kut", desc: "Spring festival; dances & community feasts." },
    ],
  },

  imphal: {
    sightseeing: [
      { title: "Kangla Fort", desc: "Historic complex & museum; broad grounds." },
      { title: "Loktak Lake (day trip)", desc: "Phumdis (floating islands); boat rides from Moirang." },
    ],
    food: [
      { title: "Chamthong & Eromba", desc: "Simple, flavorful; look for local kitchens." },
      { title: "Ima Market Snacks", desc: "Women-run market; try seasonal fritters." },
    ],
    stay: [
      { title: "Babupara / Thangal Bazar Stays", desc: "Central; easy to markets and Kangla." },
      { title: "Moirang Guesthouses", desc: "For early start to Loktak Lake." },
    ],
    festivals: [
      { title: "Sangai Festival", desc: "Showcases Manipur’s culture & crafts (Nov)." },
    ],
  },

  itanagar: {
    sightseeing: [
      { title: "Ita Fort", desc: "Ancient brick fort remains; short exploration." },
      { title: "Ganga Lake (Gyakar Sinyi)", desc: "Lakeside walk, boating, picnic spots." },
    ],
    food: [
      { title: "Thenthuk & Zan", desc: "Arunachali staples; warming bowls for evenings." },
      { title: "Local Bamboo Shoot Dishes", desc: "Ask for mild-spice versions if new to it." },
    ],
    stay: [
      { title: "E Sector Homestays", desc: "Friendly hosts; close to markets." },
      { title: "Ganga Market Area Hotels", desc: "Convenient for short stays." },
    ],
    festivals: [
      { title: "Nyokum", desc: "Nyishi community festival (Feb)." },
    ],
  },

  agartala: {
    sightseeing: [
      { title: "Ujjayanta Palace", desc: "Museum in former royal palace; evening lights." },
      { title: "Neermahal (day trip)", desc: "Lake palace in Melaghar; photogenic sunsets." },
    ],
    food: [
      { title: "Mui Borok Thalis", desc: "Tripuri cuisine; fish & bamboo shoot specialties." },
      { title: "Market Sweet Shops", desc: "Fresh chhana-based sweets." },
    ],
    stay: [
      { title: "Krishnanagar Hotels", desc: "Central area; easy to palace & markets." },
      { title: "Near Airport", desc: "Handy for quick business trips." },
    ],
    festivals: [
      { title: "Kharchi Puja", desc: "Temple festival with fairs (Jul)." },
    ],
  },

  kohima: {
    sightseeing: [
      { title: "War Cemetery", desc: "Quiet memorial gardens; tidy lawns." },
      { title: "Heritage Village (Kisama)", desc: "Cultural hamlets; Hornbill venue." },
    ],
    food: [
      { title: "Smoked Pork Houses", desc: "Signature Naga flavors; ask about spice levels." },
      { title: "Local Cafés", desc: "Coffee & bakes with views." },
    ],
    stay: [
      { title: "PR Hill / Midland Stays", desc: "Central and taxi-friendly." },
      { title: "Homestays near Kisama", desc: "Good base during Hornbill Fest." },
    ],
    festivals: [
      { title: "Hornbill Festival", desc: "Iconic cultural festival (Dec 1–10)." },
    ],
  },

  tawang: {
    sightseeing: [
      { title: "Tawang Monastery", desc: "One of the largest monasteries in India; morning prayers." },
      { title: "Sela Pass (en route)", desc: "High-altitude lake & pass; carry warm layers." },
    ],
    food: [
      { title: "Butter Tea & Thenthuk", desc: "High-altitude comforts; hydrate well." },
      { title: "Local Noodle Soups", desc: "Warming, simple meals." },
    ],
    stay: [
      { title: "Monastery View Stays", desc: "Rooms with early-sun views; cold nights." },
      { title: "Market Area Guesthouses", desc: "Close to eateries; plan acclimatization." },
    ],
    festivals: [
      { title: "Torgya / Losar", desc: "Masked cham dances and New Year festivities." },
    ],
  },

  dimapur: {
    sightseeing: [
      { title: "Kachari Ruins", desc: "Ancient monoliths; quick walk." },
      { title: "Riverside Picnic Spots", desc: "Ask locals for safe banks." },
    ],
    food: [
      { title: "Bone Broth Soups", desc: "Comforting bowls after long rides." },
      { title: "Market Grills", desc: "Chargrilled meats & veggies." },
    ],
    stay: [
      { title: "Railway/Market Hotels", desc: "Transit-friendly for road trips." },
      { title: "Outer-Ring Homestays", desc: "Calmer neighborhoods." },
    ],
    festivals: [
      { title: "Aoleang (nearby Mon)", desc: "Konyak spring festival (Apr)." },
    ],
  },

  majuli: {
    sightseeing: [
      { title: "Satras (Vaishnavite Monasteries)", desc: "Mask-making & traditional arts." },
      { title: "River Island Cycling", desc: "Village circuits; birding in winters." },
    ],
    food: [
      { title: "Traditional Assamese Meals", desc: "Simple fish curries; local greens." },
      { title: "Tea & Pitha", desc: "Rice cakes; ask homestays for fresh ones." },
    ],
    stay: [
      { title: "Mishing Stilt Homestays", desc: "Riverine architecture; early sunrises." },
      { title: "Eco- Huts", desc: "Basic, nature-friendly stays." },
    ],
    festivals: [
      { title: "Raas Mahotsav", desc: "Krishna-themed performances (Nov; dates vary)." },
    ],
  },

  ziro: {
    sightseeing: [
      { title: "Pine Hills & Paddy Fields", desc: "Gentle walking trails; crisp air." },
      { title: "Tarin Fish Farm", desc: "Apatanis’ rice-fish farming." },
    ],
    food: [
      { title: "Local Smoked Meat Dishes", desc: "Try with mild spice first." },
      { title: "Millet-based Snacks", desc: "Light, energy-dense trekking bites." },
    ],
    stay: [
      { title: "Ziro Valley Homestays", desc: "Warm hosts; heritage stories." },
      { title: "Wooden Cabins", desc: "Cozy nights; carry light thermals." },
    ],
    festivals: [
      { title: "Ziro Music Festival", desc: "Indie music in the valley (Sep)." },
    ],
  },
};

/** =========================
 *  Small UI helpers (no CSS files needed)
 *  ========================= */
const styles = {
  app: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    backgroundColor: "#0b1220",
    color: "#e6ecff",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    maxWidth: 1024,
    margin: "0 auto",
    padding: "16px",
    boxSizing: "border-box",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 16,
  },
  button: {
    background: "linear-gradient(180deg, #5a68ff, #4954e8)",
    border: "none",
    color: "white",
    padding: "12px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
  },
  ghostButton: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#e6ecff",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  header: {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: 700, letterSpacing: 0.2 },
  tabBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(15,20,35,0.95)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 8px env(safe-area-inset-bottom)",
    backdropFilter: "blur(6px)",
  },
  tabBtn: (active) => ({
    padding: "10px 12px",
    borderRadius: 10,
    border: active ? "1px solid #5865f2" : "1px solid transparent",
    background: active ? "rgba(88,101,242,0.15)" : "transparent",
    color: active ? "#cfd4ff" : "#aeb7d9",
    fontWeight: 700,
    cursor: "pointer",
    minWidth: 84,
    textAlign: "center",
  }),
  fade: (show) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0px)" : "translateY(6px)",
    transition: "opacity 300ms ease, transform 300ms ease",
  }),
};

/** =========================
 *  Screens
 *  ========================= */

function SplashScreen({ onDone }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 60);
    const t2 = setTimeout(() => onDone?.(), SPLASH_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div style={{ ...styles.app, alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...styles.container, textAlign: "center", ...styles.fade(show) }}>
        <img
          src={LOGO_SRC}
          alt="App logo"
          style={{ width: 112, height: 112, objectFit: "contain", margin: "0 auto 16px" }}
          onError={(e) => {
            // graceful fallback if logo not found
            e.currentTarget.style.display = "none";
          }}
        />
        <h1 style={{ fontSize: 22, margin: 0, fontWeight: 800, letterSpacing: 0.4 }}>
          North-East India Travel
        </h1>
        <p style={{ marginTop: 8, opacity: 0.8 }}>
          Curated food • stays • sights • festivals • emergency info
        </p>
        <div style={{ height: 28 }} />
        <div
          role="progressbar"
          aria-label="Loading"
          style={{
            width: 160,
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
              background: "linear-gradient(90deg, #7a85ff, #4f5bf0)",
              borderRadius: 999,
              animation: "bar 1.2s ease-in-out infinite",
            }}
          />
        </div>
        {/* Inline keyframes so no CSS file is needed */}
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

function HomeScreen({ onCitySelect, defaultCity }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ ...styles.container, ...styles.fade(show) }}>
      <div style={{ ...styles.card, marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Plan your trip</h2>
        <p style={{ marginTop: 8, opacity: 0.85 }}>
          Choose a city to explore curated eats, sights, stays, festivals, and emergency details.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {CITY_OPTIONS.map((c) => (
          <button
            key={c.key}
            onClick={() => onCitySelect(c)}
            style={{ ...styles.card, textAlign: "left", cursor: "pointer", padding: 0 }}
          >
            {c.imgSrc ? (
              <img
                src={c.imgSrc}
                alt={c.name}
                style={{ width: "100%", height: 120, objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
            ) : null}
            <div style={{ padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
              {!c.imgSrc ? (
                <div
                  aria-hidden
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "linear-gradient(180deg,#2a355b,#1a223d)",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    color: "#cfd7ff",
                  }}
                >
                  {c.name.charAt(0)}
                </div>
              ) : null}
              <div>
                <div style={{ fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  Tap to open {c.name.split(" ")[0]}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {defaultCity ? (
        <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => onCitySelect(defaultCity)} style={styles.button}>
            Quick continue: {defaultCity.name}
          </button>
          <button
            onClick={() => {
              try {
                localStorage.removeItem("ne.selectedCity");
              } catch {}
              location.reload();
            }}
            style={styles.ghostButton}
          >
            Reset choice
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Header({ city, onBackToHome }) {
  return (
    <div style={styles.header}>
      <button aria-label="Back" onClick={onBackToHome} style={styles.ghostButton}>
        ← Home
      </button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={styles.headerTitle}>North-East India Travel</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          {city?.name ? `Exploring: ${city.name}` : "Choose a city"}
        </div>
      </div>
    </div>
  );
}

function MainScreen({ city, activeTab, setActiveTab }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 40);
    return () => clearTimeout(t);
  }, [city?.key]);

  // Merge general content with any city-specific overrides
  const data = useMemo(() => {
    const base = CONTENT.general;
    const cityData = city?.key && CONTENT[city.key] ? CONTENT[city.key] : {};
    return { ...base, ...cityData };
  }, [city]);

  const list = data[activeTab] || [];

  return (
    <div style={{ ...styles.container, paddingBottom: 84, ...styles.fade(show) }}>
      <div style={{ ...styles.card, marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>{city?.name || "Your City"}</h2>
        <p style={{ marginTop: 8, opacity: 0.85 }}>
          Navigate by category below. Content is curated to be practical, current, and trip-ready.
        </p>
      </div>

      {list.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {list.map((item, idx) => (
            <div key={idx} style={styles.card}>
              <div style={{ fontWeight: 700 }}>{item.title}</div>
              <div style={{ opacity: 0.8, marginTop: 6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ ...styles.card }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>No entries yet</div>
          <div style={{ opacity: 0.8 }}>
            We’re still curating this section for {city?.name || "your city"}. Check back soon.
          </div>
        </div>
      )}

      {/* Bottom Tab Bar */}
      <nav aria-label="Main" style={styles.tabBar}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={styles.tabBtn(activeTab === t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/** =========================
 *  Root App (state-based router)
 *  ========================= */
export default function App() {
  const [stage, setStage] = useState("splash"); // splash | home | main
  const [city, setCity] = useState(null);
  const [activeTab, setActiveTab] = useState("sightseeing");
  const [ready, setReady] = useState(false);

  // Restore persisted state (if any)
  useEffect(() => {
    try {
      const savedCity = localStorage.getItem("ne.selectedCity");
      const savedTab = localStorage.getItem("ne.activeTab");
      if (savedCity) setCity(JSON.parse(savedCity));
      if (savedTab) setActiveTab(savedTab);
    } catch {}
    setReady(true);
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      if (city) localStorage.setItem("ne.selectedCity", JSON.stringify(city));
      if (activeTab) localStorage.setItem("ne.activeTab", activeTab);
    } catch {}
  }, [city, activeTab]);

  // Splash → Home auto transition
  useEffect(() => {
    if (stage !== "splash") return;
    const t = setTimeout(() => setStage("home"), SPLASH_MS);
    return () => clearTimeout(t);
  }, [stage]);

  if (!ready) return null; // avoid flicker during hydration

  if (stage === "splash") {
    return <SplashScreen onDone={() => setStage("home")} />;
  }

  if (stage === "home") {
    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <div style={styles.headerTitle}>North-East India Travel</div>
        </div>
        <HomeScreen
          defaultCity={city || CITY_OPTIONS[0]}
          onCitySelect={(c) => {
            setCity(c);
            setStage("main");
          }}
        />
      </div>
    );
  }

  // stage === "main"
  return (
    <div style={styles.app}>
      <Header
        city={city}
        onBackToHome={() => {
          setStage("home");
        }}
      />
      <MainScreen city={city} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
