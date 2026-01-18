import { useEffect, useRef } from "react";
import useInView from "../utils/useInView";
import galleryBgVideo from "../assets/gallerybg.mp4";

const optimizeCloudinary = (url, w = 900) => {
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("/upload/") && !url.includes("f_auto")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
  }
  return url;
};

const WINNERS_DATA = {
  techDay: {
    title: "Code Catalyst Winners",
    subtitle: "Chrysalis 2026",
    winner: {
      title: "Winner",
      name: "Team Cypher Crew",
      image:
        "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768762326/WhatsApp_Image_2026-01-19_at_12.20.18_AM_kgmhrf.jpg",
    },
    runnerUp: {
      title: "Runner Up",
      name: "Team Pitbox",
      image:
        "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768762326/WhatsApp_Image_2026-01-19_at_12.20.30_AM_rvrnbf.jpg",
    },
  },

  otherWinners: [
    {
      title: "BGMI Winner",
      subtitle: "Esports Champion",
      name: "Team Himanshu",
      image:
        "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768763183/WhatsApp_Image_2026-01-19_at_12.34.52_AM_wfdjne.jpg",
      badge: "🏆 Winner",
    },
    {
      title: "Volleyball Winner",
      subtitle: "Sports Champion",
      name: "BCA",
      image:
        "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768761107/WhatsApp_Image_2026-01-18_at_11.52.50_PM_dlanok.jpg",
      badge: "🏐 Winner",
    },
    {
      title: "Tug of War Winner (Girls)",
      subtitle: "Strength Champion",
      name: "Dominators",
      image:
        "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768764110/WhatsApp_Image_2026-01-19_at_12.50.33_AM_hq5jzy.jpg",
      badge: "💪 Winner",
    },
    {
      title: "Tug of War Winner (Boys)",
      subtitle: "Strength Champion",
      name: "Rope Dominators",
      image:
        "https://res.cloudinary.com/dso9pvdgi/image/upload/v1768764167/WhatsApp_Image_2026-01-19_at_12.52.02_AM_w0dq8d.jpg",
      badge: "💪 Winner",
    },
  ],
};

function WinnerCard({ title, subtitle, name, image, badge }) {
  const optimized = optimizeCloudinary(image, 900);

  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0px_30px_100px_-50px_rgba(0,0,0,0.95)] transition duration-300 hover:-translate-y-2 hover:scale-[1.02]">
      <div className="relative w-full h-[240px] sm:h-[280px] overflow-hidden">
        <img
          src={optimized}
          alt={title}
          draggable={false}
          loading="lazy"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {badge && (
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/55 border border-white/15 text-white text-xs sm:text-sm font-bold">
            {badge}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-white/60 text-xs sm:text-sm font-semibold tracking-widest uppercase">
          {subtitle}
        </p>

        <h3 className="mt-2 text-white text-xl sm:text-2xl font-extrabold">
          {title}
        </h3>

        <p className="mt-2 text-white/90 font-bold text-sm sm:text-base">
          {name}
        </p>
      </div>
    </div>
  );
}

export default function Winners() {
  const [ref, inView] = useInView(0.2);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch (err) {
        console.log("Winner page video autoplay blocked:", err);
      }
    };

    tryPlay();
  }, []);

  const tech = WINNERS_DATA.techDay;

  return (
    <section
      ref={ref}
      id="winners"
      className="scroll-mt-[110px] min-h-screen bg-black text-white relative overflow-hidden pt-[96px] sm:pt-[110px] pb-16"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
            <source src={galleryBgVideo} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-2xl sm:text-4xl font-black tracking-wide">
            Champions of Chrysalis 2026 — tech and sports winners 🏆
          </p>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {tech.title}
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <WinnerCard
              title={tech.winner.title}
              subtitle="Tech Day"
              name={tech.winner.name}
              image={tech.winner.image}
              badge="🏆 Winner"
            />
            <WinnerCard
              title={tech.runnerUp.title}
              subtitle="Tech Day"
              name={tech.runnerUp.name}
              image={tech.runnerUp.image}
              badge="🥈 Runner Up"
            />
          </div>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sports & Esports Winners
          </h3>
          <p className="mt-2 text-white/70 text-sm sm:text-base font-semibold">
            BGMI • Volleyball • Tug of War
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          {WINNERS_DATA.otherWinners.map((w, idx) => (
            <WinnerCard
              key={idx}
              title={w.title}
              subtitle={w.subtitle}
              name={w.name}
              image={w.image}
              badge={w.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
