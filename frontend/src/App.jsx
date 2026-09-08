import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import PirateLoader   from "./components/Loader/PirateLoader";
import Navbar         from "./components/Navbar/Navbar";
import Hero           from "./components/Hero/Hero";
import Events         from "./components/Events/Events";
import About          from "./components/About/About";
import Footer         from "./components/Footer/Footer";
import AdminDashboard from "./pages/AdminDashboard";

import MagicRings from "./components/MagicRings/MagicRings";

/* ── Persistent Layout ───────────────────────────────────────── */
function Layout() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <MagicRings
          color="#c0102a"
          colorTwo="#f5c842"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

/* ── App Router ──────────────────────────────────────────────── */
export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaderDone && (
          <PirateLoader onComplete={() => setLoaderDone(true)} />
        )}
      </AnimatePresence>

      {loaderDone && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Hero />} />
              <Route path="events" element={<Events />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
