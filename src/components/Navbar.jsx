import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GooeyNav from "./GooeyNav";
import { scrollToSection } from "../utils/scrollToSection";

// ✅ add your logo here
import butterflyLogo from "../assets/butterfly.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "HOME", href: "#home" },
    { label: "EVENT", href: "#about" },
    { label: "GALLERY", href: "#gallery" },
    { label: "MEMBER", href: "#members" },
    { label: "WINNER", href: "#winners" },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const handleNavClick = (href) => {
    const id = href.replace("#", "");
    scrollToSection(id, 110);
    setOpen(false);
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-[2147483647] flex justify-center px-3 sm:px-4">
      <nav
        className="
          pointer-events-auto
          flex items-center justify-between
          w-full max-w-5xl
          h-14 sm:h-16
          px-4 sm:px-7
          rounded-full
          bg-black/40
          backdrop-blur-xl
          border border-white/10
          shadow-[0_18px_55px_rgba(0,0,0,0.55)]
        "
      >
        {/* ✅ LEFT SIDE LOGO + TEXT */}
        <button
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* Logo */}
          <div
            className="
              h-10 w-10 sm:h-11 sm:w-11
              rounded-full
              grid place-items-center
              border border-white/15
              bg-white/5
              overflow-hidden
            "
          >
            <img
              src={butterflyLogo}
              alt="Chrysalis Logo"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Text */}
          <div className="leading-tight text-left">
            <p className="text-white font-extrabold tracking-wide text-sm sm:text-base">
              CHRYSALIS
            </p>
          </div>
        </button>

        {/* Desktop */}
        <div className="hidden sm:flex items-center">
          <GooeyNav
            items={navItems.map((it) => ({
              ...it,
              onClick: (e) => {
                e?.preventDefault?.();
                handleNavClick(it.href);
              },
            }))}
            particleCount={12}
            particleDistances={[70, 10]}
            particleR={80}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="
            sm:hidden
            h-10 w-10
            grid place-items-center
            rounded-full
            border border-white/10
            bg-white/5
            text-white/90
            active:scale-95
            transition
          "
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-[2147483646]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="
                fixed top-[78px] left-3 right-3
                rounded-3xl
                border border-white/10
                bg-black/70 backdrop-blur-xl
                z-[2147483647]
                p-5
              "
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="
                      w-full text-left
                      px-4 py-3 rounded-2xl
                      border border-white/10
                      bg-white/5
                      text-white font-semibold tracking-wide
                      hover:bg-white/10 transition
                    "
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
