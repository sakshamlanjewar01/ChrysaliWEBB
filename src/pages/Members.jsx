import { useEffect, useMemo, useRef } from "react";
import useInView from "../utils/useInView";
import membersBgVideo from "../assets/membersbg.mp4";

import { MEMBERS_LIST, getMemberCard, getImage } from "../data/membersData";

function MemberBox({
  post,
  name,
  image,
  delay = 0,
  animate = false,
  big = false,
}) {
  return (
    <div
      className={`
        group relative overflow-hidden
        rounded-2xl border border-white/15
        bg-white/[0.08] backdrop-blur-xl
        shadow-[0_25px_90px_rgba(0,0,0,0.65)]
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:scale-[1.03]
        hover:border-white/25
        cursor-pointer will-change-transform
        ${animate ? "memberFade" : ""}
      `}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div
        className={`
          relative w-full overflow-hidden bg-black/20
          ${big ? "aspect-[4/4.4]" : "aspect-[4/4.2]"}
        `}
      >
        <img
          src={image}
          alt={name}
          draggable={false}
          loading="lazy"
          className="
            w-full h-full object-cover
            [object-position:50%_18%]
            transition-transform duration-700 ease-out
            group-hover:scale-[1.07]
          "
          onError={(e) => {
            e.currentTarget.src =
              "https://dummyimage.com/600x600/ffffff/000000.png&text=No+Image";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-95" />
      </div>

      <div className={`${big ? "p-5" : "p-4"}`}>
        <p
          className={`
            font-extrabold tracking-wide leading-tight line-clamp-1
            ${big ? "text-[18px] sm:text-[20px]" : "text-[16px] sm:text-[17px]"}
            text-white
          `}
        >
          {name}
        </p>

        <p
          className={`
            mt-1 leading-tight line-clamp-1 font-bold
            ${big ? "text-[14px] sm:text-[15px]" : "text-[13px] sm:text-[14px]"}
            text-white/90
          `}
        >
          {post}
        </p>
      </div>
    </div>
  );
}

export default function Members() {
  const [ref, inView] = useInView(0.2);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        v.muted = true;
        await v.play();
      } catch (err) {
        console.log("Members video autoplay blocked:", err);
      }
    };

    tryPlay();
  }, []);

  const { topTwo, gridCards } = useMemo(() => {
    const sorted = [...MEMBERS_LIST].sort((a, b) => a.sr - b.sr);

    const presidentRow = sorted.find((x) => x.sr === 1);
    const vicePresidentRow = sorted.find((x) => x.sr === 2);

    const topTwoCards = [
      {
        post: presidentRow?.post || "President",
        name: presidentRow?.names?.[0] || "—",
        image: getImage(presidentRow?.names?.[0]),
      },
      {
        post: vicePresidentRow?.post || "Vice President",
        name: vicePresidentRow?.names?.[0] || "—",
        image: getImage(vicePresidentRow?.names?.[0]),
      },
    ];

    const cards = [];
    for (const row of sorted) {
      if (row.sr === 1 || row.sr === 2) continue;
      (row.names || []).forEach((nm) =>
        cards.push(getMemberCard(nm, row.post)),
      );
    }

    return { topTwo: topTwoCards, gridCards: cards };
  }, []);

  return (
    <section
      ref={ref}
      id="members"
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
            <source src={membersBgVideo} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <style>{`
        @keyframes memberFadeKey {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .memberFade {
          opacity: 0;
          animation: memberFadeKey 700ms ease-out forwards;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-white/90 text-lg sm:text-3xl mt-3 font-semibold">
            Committee structure
          </p>
        </div>

        <div className="flex justify-center gap-12 mb-20 flex-wrap">
          <div className="w-[330px] sm:w-[310px]">
            <MemberBox {...topTwo[0]} big animate={inView} delay={0} />
          </div>

          <div className="w-[330px] sm:w-[310px]">
            <MemberBox {...topTwo[1]} big animate={inView} delay={120} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-10 gap-y-12 place-items-center">
          {gridCards.map((card, idx) => (
            <div key={idx} className="w-[210px] sm:w-[220px]">
              <MemberBox
                post={card.subtitle}
                name={card.title}
                image={card.image}
                animate={inView}
                delay={idx * 60}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
