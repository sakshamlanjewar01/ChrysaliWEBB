import { useEffect, useRef } from "react";
import useInView from "../utils/useInView";
import galleryBgVideo from "../assets/gallerybg.mp4";

const events = [
  {
    title: "Tech Fest",
    subtitle: "Chrysalis 2026",
    venue: "Ramdeobaba University",
    date: "17 January 2026",
    desc: "Innovate, build, and compete with the brightest minds. Where ideas turn into reality.",
    slogan: "Code. Create. Conquer. 💻⚡",
  },
  {
    title: "Sports Day",
    subtitle: "Chrysalis 2026",
    venue: "Ramdeobaba University",
    date: "18 January 2026",
    desc: "Play hard, play fair, and have fun! A day full of energy, teamwork and thrill.",
    slogan: "Run fast. Play smart. Win together. 🏆🔥",
  },
  {
    title: "Inaugural & Cultural Events",
    subtitle: "Chrysalis 2026",
    venue: "Ramdeobaba University",
    date: "19 January 2026",
    desc: "A celebration of talent, music, art, and unforgettable vibes to close the fest in style.",
    slogan: "Lights on. Music loud. Memories forever. 🎭✨",
  },
];

function CircularEventGallery({ active }) {
  const ringRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    let raf = null;
    let rotation = 0;

    const animate = () => {
      rotation -= 0.15; // RIGHT ➜ LEFT rotation
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${rotation}deg)`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);

  return (
    <div className="relative w-full max-w-5xl mx-auto sm:mt-14">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Event Highlights
        </h2>
        <p className="mt-2 text-white/60 text-sm sm:text-base">
          3 Days • 3 Experiences • One Chrysalis
        </p>
      </div>

      <div className="relative mt-8 sm:mt-10 w-full h-[340px] sm:h-[380px] flex items-center justify-center">
        <div
          className="relative w-[260px] sm:w-[360px] h-[260px] sm:h-[360px]"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={ringRef}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.05s linear",
            }}
          >
            {events.map((e, i) => {
              const angle = (360 / events.length) * i;

              const radius =
                typeof window !== "undefined" && window.innerWidth < 640
                  ? 190
                  : 240;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      rotateY(${angle}deg)
                      translateZ(${radius}px)
                    `,
                  }}
                >
                  <div className="w-[240px] sm:w-[300px] rounded-3xl border border-white/15 bg-black/40 backdrop-blur-xl shadow-2xl p-5 sm:p-6 hover:scale-[1.02] transition duration-300">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-white/50 text-xs tracking-widest uppercase">
                          {e.subtitle}
                        </p>
                        <h3 className="text-white text-lg sm:text-xl font-bold mt-1">
                          {e.title}
                        </h3>
                      </div>

                      <div className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/10">
                        Day {i + 1}
                      </div>
                    </div>

                    <p className="mt-4 text-white/65 text-xs sm:text-sm leading-relaxed">
                      {e.desc}
                    </p>

                    <div className="mt-5 space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-white/70">
                        <span className="text-white/40">📍</span>
                        <span>{e.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <span className="text-white/40">📅</span>
                        <span>{e.date}</span>
                      </div>
                    </div>

                    <div className="mt-6 text-white/90 text-xs sm:text-sm font-semibold tracking-wide">
                      {e.slogan}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute -z-10 w-[460px] sm:w-[520px] h-[460px] sm:h-[520px] rounded-full blur-3xl bg-white/10" />
      </div>
    </div>
  );
}

export default function About() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      ref={ref}
      id="about"
      className="scroll-mt-[110px] bg-black text-white"
    >
      <div className="relative w-screen min-h-screen overflow-hidden bg-black pt-[96px] sm:pt-[110px]">
        {/* Video background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={galleryBgVideo} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/90" />
        </div>

        <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-5xl mx-auto text-center">
              <p className="mt-6 text-white/70 text-sm sm:text-xl leading-relaxed">
                Chrysalis 2026 is not just a tech fest — it’s an experience
                where ideas evolve into innovation. It’s a celebration of
                technology, creativity, and unstoppable energy where students
                come together to build, compete, and create something
                unforgettable.
              </p>
            </div>

            <CircularEventGallery active={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
