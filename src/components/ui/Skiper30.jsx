"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const images = [
  "/homebg.webp",
  "/homebg2.webp",
  "/SnapInsta.to_368252794_18295230007186235_579421688051440182_n_750.jpg",
  "/SnapInsta.to_378181396_18298849789186235_4370895842433673534_n_750.jpg",
  "/SnapInsta.to_469014936_18381580087097874_4466348175444016484_n.jpg",
  "/SnapInsta.to_469184825_18381580297097874_8533222688974240097_n_750.jpg",
  "/SnapInsta.to_471711385_18475536073002324_6102271118363019889_n_750.jpg",
  "/SnapInsta.to_471969805_18475535794002324_320309082959194364_n_750.jpg",
  "/SnapInsta.to_514565952_18564927139058263_1903189261584178576_n_750.jpg",
  "/SnapInsta.to_582015082_18541259023021250_1273442079057468699_n_750.jpg",
  "/SnapInsta.to_625047285_18111301408629000_689735211486510512_n_750.jpg",
  "/SnapInsta.to_628530086_18559636798033840_1326881019467707710_n_750.jpg",
  "/a3de815c7a261b7cedab7faa9daad714.jpg",
  "/28aa63b5324a872840a1b8f1065e21fe.jpg",
  "/b3ccf773fd05d61998269785d2404380.jpg",
  "/ba2e2214fee77f3228b4c0405e87e42a.jpg",
  "/8d1ae6c2e50b7eaa8adbb061d6420192.jpg",
  "/747e3166a39f28fdcd00fe2b7fe29b7a.jpg",
  "/79c2b2bf4b2822b47057a1f8abdb9c72.jpg",
  "/Bd.webp",
  "/SnapInsta.to_368252794_18295230007186235_579421688051440182_n_750.jpg",
  "/SnapInsta.to_471711385_18475536073002324_6102271118363019889_n_750.jpg",
  "/homebg.webp",
];

const Column = ({ images, y, className = "", offsetClass = "" }) => {
  return (
    <motion.div
      className={`relative flex h-full w-full lg:w-1/4 flex-col gap-[3vw] ${className} ${offsetClass}`}
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden shadow-2xl bg-white">
          <img
            src={src}
            alt="portfolio"
            className="pointer-events-none object-cover w-full h-full transition-transform duration-700 hover:scale-110"
          />
        </div>
      ))}
    </motion.div>
  );
};

const Skiper30 = () => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      <div
        ref={gallery}
        className="relative flex h-[150vh] md:h-[220vh] gap-[3vw] overflow-hidden p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} offsetClass="-top-[45%]" />
        <Column images={[images[3], images[4], images[5]]} y={y2} className="hidden md:flex" offsetClass="-top-[95%]" />
        <Column images={[images[6], images[7], images[8]]} y={y3} className="hidden lg:flex" offsetClass="-top-[45%]" />
        <Column images={[images[9], images[0], images[3]]} y={y} className="hidden xl:flex" offsetClass="-top-[75%]" />
      </div>
    </div>
  );
};

export { Skiper30 };
