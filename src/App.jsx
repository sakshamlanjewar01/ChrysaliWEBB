import { useEffect, useState, lazy, Suspense } from "react";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import useLenis from "./utils/useLenis";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Members = lazy(() => import("./pages/Members"));
const Winners = lazy(() => import("./pages/Winners"));

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // ✅ butter smooth scroll
  useLenis(introDone);

  // ✅ fallback: if Landing gets stuck on production, auto-open website
  useEffect(() => {
    if (introDone) return;

    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 6500); // 6.5 seconds fallback

    return () => clearTimeout(timer);
  }, [introDone]);

  useEffect(() => {
    document.body.style.overflow = introDone ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [introDone]);

  return (
    <div className="min-h-screen bg-black text-white">
      {!introDone ? (
        <Landing onDone={() => setIntroDone(true)} />
      ) : (
        <>
          <Navbar />

          <Suspense
            fallback={<div className="p-6 text-white/60">Loading...</div>}
          >
            <Home />
            <About />
            <Gallery />
            <Members />
            <Winners />
          </Suspense>
        </>
      )}
    </div>
  );
}
