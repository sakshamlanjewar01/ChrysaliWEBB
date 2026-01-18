import { useEffect, useMemo, useRef } from "react";
import useInView from "../utils/useInView";

const optimizeCloudinary = (url, w = 900) => {
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("/upload/") && !url.includes("f_auto")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
  }
  return url;
};

const TECH_DAY_IMAGES = [
  "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475957/chrysalis2025_1_blzalr.jpg",
  "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475957/chrysalis2025_2_h7tztm.jpg",
  "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475957/chrysalis2025_3_uhc8gz.jpg",
  "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475294/chrysalis2024_4_zuarry.jpg",
  "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738729178/chrysalis_2023_Chief_Guests_bbgzbe.jpg",
  "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738735176/1_p51ffr.png",
  "https://res.cloudinary.com/dcpugzrqm/image/upload/v1738729178/Chrysalis_2023_Audi_photo_luizwa.jpg",
  "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768761107/WhatsApp_Image_2026-01-18_at_11.53.16_PM_oeej7l.jpg",
];

function ImageCard({ src }) {
  const optimized = optimizeCloudinary(src, 900);

  return (
    <div className="relative w-[230px] sm:w-[260px] md:w-[300px] h-[160px] sm:h-[175px] md:h-[190px] overflow-hidden rounded-[22px] border border-white/15 bg-white/5 shadow-[0px_30px_80px_-40px_rgba(0,0,0,0.9)]">
      <div className="absolute inset-0">
        <img
          src={optimized}
          alt="Chrysalis Tech Day"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/10" />
      </div>
    </div>
  );
}

function MarqueeRow({ images, direction = "left", speed = 28 }) {
  const animationName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-10" />

      <div
        className="marqueeGroup"
        style={{ animation: `${animationName} ${speed}s linear infinite` }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="marqueeItem mx-3 sm:mx-4 hover:scale-[1.06] transition-transform duration-300 origin-center"
          >
            <ImageCard src={src} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [ref, inView] = useInView(0.25);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch (err) {
        console.log("Gallery video autoplay blocked:", err);
      }
    };

    tryPlay();
  }, []);

  const loopImages = useMemo(() => TECH_DAY_IMAGES, []);

  return (
    <section
      ref={ref}
      id="gallery"
      className="scroll-mt-[110px] min-h-screen bg-black text-white relative overflow-hidden pt-[96px] sm:pt-[110px] pb-16"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {inView && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          >
            <source src="/videos/gallerybg.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <style>{`
        .marqueeGroup{
          display:flex;
          width:max-content;
          will-change: transform;
          padding: 10px 0;
        }
        .marqueeGroup:hover{
          animation-play-state: paused !important;
        }

        @keyframes marqueeLeft {
          from { transform: translateX(0%); }
          to   { transform: translateX(-50%); }
        }

        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%); }
        }
      `}</style>

      <div className="relative z-10 w-full">
        <div className="w-full px-4 sm:px-6 pb-10 flex justify-center">
          <div className="max-w-5xl w-full text-center">
            <p className="mt-4 text-white/70 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              Events highlights of Chrysalis
            </p>
          </div>
        </div>

        <div className="w-[70vw] mx-auto px-2 sm:px-0 flex flex-col gap-8">
          <MarqueeRow images={loopImages} direction="right" speed={26} />
          <MarqueeRow images={loopImages} direction="left" speed={30} />
        </div>
      </div>
    </section>
  );
}
