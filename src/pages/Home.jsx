import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import DecryptedText from "../components/DecryptedText";
import { scrollToSection } from "../utils/scrollToSection";
import useInView from "../utils/useInView";

import homeBgVideo from "../assets/homebg.mp4";

export default function Home() {
  const [ref, inView] = useInView(0.25);
  const videoRef = useRef(null);

  // ✅ Force autoplay (browser safety fix)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch (err) {
        console.log("Autoplay blocked:", err);
      }
    };

    tryPlay();
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="scroll-mt-[110px] relative min-h-screen overflow-hidden bg-black"
    >
      {/* ✅ ONLY VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={homeBgVideo} type="video/mp4" />
        </video>
      </div>

      {/* ✅ UI content */}
      <AnimatePresence>
        {inView && (
          <motion.div
            className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="max-w-5xl"
              initial={{ opacity: 0, y: 40, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                <DecryptedText
                  text="Welcome to Chrysalis 2026"
                  animateOn="view"
                  speed={22}
                  maxIterations={22}
                  sequential={true}
                  revealDirection="center"
                  className="text-slate-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                  encryptedClassName="text-white/20"
                />
              </h1>

              <motion.p
                className="mt-6 text-white/80 text-base sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.0, ease: "easeOut" }}
              >
                Chrysalis 2026 is not just a tech fest — it’s an experience.
                It’s where innovation meets creativity, where ideas transform
                into reality, and where passionate minds come together to build
                something unforgettable. From exciting competitions and
                immersive workshops to inspiring guest sessions and fun cultural
                moments, Chrysalis is designed to challenge your skills, spark
                your curiosity, and push you beyond limits. Whether you’re a
                beginner exploring technology for the first time or an expert
                looking to showcase your talent, Chrysalis 2026 gives you the
                perfect stage to learn, compete, connect, and grow. More than
                events and activities, it’s a celebration of technology,
                teamwork, and the future — and every participant becomes a part
                of this amazing journey.{" "}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 1.0, ease: "easeOut" }}
              >
                <button
                  onClick={() => scrollToSection("about", 110)}
                  className="
                    w-full sm:w-auto
                    px-7 py-3 rounded-full
                    bg-white text-black font-semibold
                    hover:opacity-90 transition
                  "
                >
                  Explore Events
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
