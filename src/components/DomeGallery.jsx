import { useEffect, useMemo, useRef, useCallback } from "react";
import { useGesture } from "@use-gesture/react";

const DEFAULT_IMAGES = [
  {
    src: "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475957/chrysalis2025_1_blzalr.jpg",
    alt: "Abstract art",
  },
  {
    src: "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475957/chrysalis2025_2_h7tztm.jpg",
    alt: "Modern sculpture",
  },
  {
    src: "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475957/chrysalis2025_3_uhc8gz.jpg",
    alt: "Digital artwork",
  },
  {
    src: "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475294/chrysalis2024_4_zuarry.jpg",
    alt: "Contemporary art",
  },
  {
    src: "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475294/chrysalis2024_3_bjiqbi.jpg",
    alt: "Geometric pattern",
  },
  {
    src: "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475295/Chrysalis2024_2_ogltg1.jpg",
    alt: "Textured surface",
  },
  {
    src: "https://res.cloudinary.com/dkkivqj4k/image/upload/v1768475295/chrysalis2024_1_a6qydh.jpg",
    alt: "Social media image",
  },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const getDataNumber = (el, name, fallback) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;

  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "" }));
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") return { src: image, alt: "" };
    return { src: image.src || "", alt: image.alt || "" };
  });

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length]
  );

  // Avoid adjacent duplicates
  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
  }));
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = true,
  domeBlur = 1.8,

  // ✅ NEW
  backgroundMode = false, // background only (no interaction)
  paused = false, // pause animations when not visible
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);

  const frameRef = useRef(null);
  const viewerRef = useRef(null);
  const scrimRef = useRef(null);
  const focusedElRef = useRef(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);

  const inertiaRAF = useRef(null);
  const pointerTypeRef = useRef("mouse");
  const tapTargetRef = useRef(null);
  const openingRef = useRef(false);

  const scrollLockedRef = useRef(false);

  const isActive = !paused && !backgroundMode; // ✅ means interactive mode

  const lockScroll = useCallback(() => {
    if (backgroundMode) return;
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, [backgroundMode]);

  const unlockScroll = useCallback(() => {
    if (backgroundMode) return;
    if (!scrollLockedRef.current) return;

    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, [backgroundMode]);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg, yDeg) => {
    const el = sphereRef.current;
    if (!el) return;

    // ✅ GPU transform only
    el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  };

  const lockedRadiusRef = useRef(null);

  // ✅ ResizeObserver (cheap)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;

      let basis;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }

      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);

      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");
      root.style.setProperty("--dome-blur", domeBlur ? `${domeBlur}px` : "0px");

      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });

    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    domeBlur,
  ]);

  // ✅ STOP inertia loop when paused / unmounted
  useEffect(() => {
    if (paused || backgroundMode) {
      if (inertiaRAF.current) cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
    return () => {
      if (inertiaRAF.current) cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    };
  }, [paused, backgroundMode]);

  // ✅ Gesture (drag rotation) — only when active
  useGesture(
    {
      onPointerDown: ({ event }) => {
        if (!isActive) return;
        pointerTypeRef.current = event.pointerType || "mouse";
        draggingRef.current = true;
        movedRef.current = false;
      },

      onDragStart: ({ event }) => {
        if (!isActive) return;

        movedRef.current = false;
        startPosRef.current = { x: event.clientX, y: event.clientY };
        startRotRef.current = { ...rotationRef.current };

        if (inertiaRAF.current) cancelAnimationFrame(inertiaRAF.current);
        inertiaRAF.current = null;
      },

      onDrag: ({ event, delta: [dx, dy] }) => {
        if (!isActive) return;

        movedRef.current = true;

        const newY = startRotRef.current.y + dx / dragSensitivity;
        const newX = clamp(
          startRotRef.current.x - dy / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );

        rotationRef.current = { x: newX, y: newY };
        applyTransform(newX, newY);
      },

      onDragEnd: ({ velocity: [vx, vy], direction: [dirX, dirY] }) => {
        if (!isActive) return;

        draggingRef.current = false;

        const decay = 0.92;
        let speedX = vx * dirX * 6;
        let speedY = vy * dirY * 6;

        const inertial = () => {
          if (paused || backgroundMode) return;

          speedX *= decay;
          speedY *= decay;

          if (Math.abs(speedX) < 0.01 && Math.abs(speedY) < 0.01) {
            inertiaRAF.current = null;
            return;
          }

          const nextY = rotationRef.current.y + speedX;
          const nextX = clamp(
            rotationRef.current.x - speedY,
            -maxVerticalRotationDeg,
            maxVerticalRotationDeg
          );

          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);

          inertiaRAF.current = requestAnimationFrame(inertial);
        };

        inertiaRAF.current = requestAnimationFrame(inertial);
      },
    },
    {
      target: mainRef,
      enabled: isActive, // ✅ IMPORTANT
      drag: {
        from: () => [0, 0],
        filterTaps: true,
        pointer: { touch: true },
      },
    }
  );

  const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
      --dome-blur: 0px;
    }
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px; bottom: -999px; left: -999px; right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms;
      transform:
        rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg)))
        rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))
        translateZ(var(--radius));
    }
    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      transition: transform 300ms;
      pointer-events: auto;
      transform: translateZ(0);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <div
        ref={rootRef}
        className={`sphere-root relative w-full h-full ${
          backgroundMode || paused ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{
          ["--segments-x"]: segments,
          ["--segments-y"]: segments,
          ["--overlay-blur-color"]: overlayBlurColor,
          ["--tile-radius"]: imageBorderRadius,
          ["--enlarge-radius"]: openedImageBorderRadius,
          ["--image-filter"]: grayscale ? "grayscale(1)" : "none",
        }}
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{ touchAction: backgroundMode || paused ? "auto" : "none" }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={{
                    ["--offset-x"]: it.x,
                    ["--offset-y"]: it.y,
                    ["--item-size-x"]: it.sizeX,
                    ["--item-size-y"]: it.sizeY,
                  }}
                >
                  <div className="item__image absolute block overflow-hidden bg-gray-200 transition-transform duration-300">
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover pointer-events-none"
                      style={{
                        backfaceVisibility: "hidden",
                        filter: `var(--image-filter, ${
                          grayscale ? "grayscale(1)" : "none"
                        }) blur(var(--dome-blur, 0px))`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overlay */}
          <div
            className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`,
            }}
          />

          {/* Viewer placeholders (keep for future) */}
          {!backgroundMode && !paused && (
            <div
              ref={viewerRef}
              className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
              style={{ padding: "var(--viewer-pad)" }}
            >
              <div
                ref={scrimRef}
                className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500"
                style={{
                  background: "rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(3px)",
                }}
              />
              <div
                ref={frameRef}
                className="viewer-frame h-full aspect-square flex"
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
