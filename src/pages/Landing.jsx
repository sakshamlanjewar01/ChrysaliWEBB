import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgVideo from "../assets/Landing1.mp4"; // ✅ keep only one

export default function Landing({ onDone }) {
  const videoRef = useRef(null);
  const [showIntroText, setShowIntroText] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = finished ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [finished]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timer;

    const checkTime = () => {
      if (!video.duration) return;
      if (video.currentTime >= video.duration - 2) {
        setShowIntroText(true);
        clearInterval(timer);
      }
    };

    timer = setInterval(checkTime, 300);

    const onEnded = () => {
      setShowIntroText(false);
      setFinished(true);

      setTimeout(() => {
        onDone?.();
      }, 600);
    };

    video.addEventListener("ended", onEnded);

    return () => {
      clearInterval(timer);
      video.removeEventListener("ended", onEnded);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[2147483647] bg-black">
      <AnimatePresence>
        {!finished && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain sm:object-cover bg-black"
              autoPlay
              muted
              playsInline
              preload="metadata"
            >
              <source src={bgVideo} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/50" />

            <AnimatePresence>
              {showIntroText && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center px-4 text-center"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Intro text optional */}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
