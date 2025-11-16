import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EmergencyButton from "../components/EmergencyButton";
import StarfieldBackground from "../components/StarfieldBackground";

const Home = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    days: 97,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Load Devfolio SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 97);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          ),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Direct navigation, no loading screen
  const handleStart = () => {
    navigate("/about");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      textShadow: "0px 0px 30px rgba(6, 182, 212, 0.8)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 400,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Sponsor logo arrays (no tier passed to functions)
  const platinumSponsors = [
    {
      name: "Devfolio",
      image: "./devfoliologo.png",
      alt: "Devfolio Logo",
      link: "https://devfolio.co/",
    },
  ];

  const goldSponsors = [
    {
      name: "ETHIndia",
      image: "./ethlogo.png",
      alt: "ETHIndia Logo",
      link: "https://ethindia.co/",
    },
  ];

  const silverSponsors = [
    {
      name: "TechCorp",
      image: "techcorp-logo.png",
      alt: "TechCorp Logo",
      link: "#",
    },
    {
      name: "InnovateLab",
      image: "innovate-logo.png",
      alt: "InnovateLab Logo",
      link: "#",
    },
  ];

  const bronzeSponsors = [
    {
      name: "SecureNet",
      image: "securenet-logo.png",
      alt: "SecureNet Logo",
      link: "#",
    },
    {
      name: "IoT Solutions",
      image: "iot-logo.png",
      alt: "IoT Solutions Logo",
      link: "#",
    },
    {
      name: "OpenSource Inc",
      image: "opensource-logo.png",
      alt: "OpenSource Inc Logo",
      link: "#",
    },
  ];

  return (
    <motion.div
      className="relative w-full min-h-screen bg-black spaceship-cursor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 3D / Starfield background */}
      <div className="fixed inset-0 w-full h-full">
        <StarfieldBackground />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-16 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title + lightning */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <motion.div
            className="relative inline-block"
            variants={titleVariants}
            whileHover="hover"
          >
            {/* Lightning SVG */}
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 800 200"
              style={{ zIndex: -1 }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Your lightning paths (kept as-is from your code) */}
              <motion.path
                d="M50 100 L150 60 L120 120 L200 80 L170 140 L250 100"
                stroke="#00bfff"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 8px #00bfff) drop-shadow(0 0 15px #0080ff)",
                }}
              />
              {/* ... keep the rest of your lightning <motion.path>s here ... */}
            </motion.svg>

            {/* Glow background */}
            <motion.div
              className="absolute inset-0 -m-8"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0, 191, 255, 0.3) 0%, rgba(0, 128, 255, 0.2) 30%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main title */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider cursor-pointer relative z-10"
              style={{
                fontFamily: "'Pixelify Sans', monospace",
                fontWeight: 700,
                color: "#ffffff",
                textShadow: `
                  0 0 5px #00bfff,
                  0 0 10px #00bfff,
                  0 0 15px #00bfff,
                  0 0 20px #0080ff,
                  0 0 35px #0080ff,
                  0 0 40px #0080ff,
                  0 0 50px #0080ff,
                  0 0 75px #0080ff
                `,
                filter: "brightness(1.2)",
              }}
              animate={{
                textShadow: [
                  `0 0 5px #00bfff, 0 0 10px #00bfff, 0 0 15px #00bfff, 0 0 20px #0080ff, 0 0 35px #0080ff, 0 0 40px #0080ff`,
                  `0 0 10px #00bfff, 0 0 20px #00bfff, 0 0 30px #00bfff, 0 0 40px #0080ff, 0 0 70px #0080ff, 0 0 80px #0080ff`,
                  `0 0 5px #00bfff, 0 0 10px #00bfff, 0 0 15px #00bfff, 0 0 20px #0080ff, 0 0 35px #0080ff, 0 0 40px #0080ff`,
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              HACKSPRINT
            </motion.h1>

            {/* Electric particles */}
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${5 + i * 8}%`,
                    top: `${20 + Math.sin(i * 0.8) * 60}%`,
                    backgroundColor: "#00bfff",
                    boxShadow: "0 0 6px #00bfff, 0 0 12px #0080ff",
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-2xl text-cyan-400 font-semibold tracking-wide"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              color: "#22d3ee",
              transition: { type: "spring", stiffness: 300 },
            }}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            36 HOUR HACKATHON
          </motion.p>

          {/* Countdown */}
          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <motion.p
              className="text-sm md:text-lg text-cyan-400 font-semibold mb-4 tracking-wide"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              LAUNCH COUNTDOWN
            </motion.p>

            <motion.div
              className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8"
              variants={itemVariants}
            >
              {/* Days */}
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
              >
                <motion.div
                  className="bg-gradient-to-b from-cyan-400 to-blue-600 text-black font-black text-lg sm:text-xl md:text-2xl lg:text-4xl px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg border-2 border-cyan-300"
                  style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(34, 211, 238, 0.5)",
                      "0 0 30px rgba(34, 211, 238, 0.8)",
                      "0 0 20px rgba(34, 211, 238, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {String(timeLeft.days).padStart(2, "0")}
                </motion.div>
                <p
                  className="text-cyan-400 text-xs md:text-sm mt-2 font-semibold"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  DAYS
                </p>
              </motion.div>

              {/* Hours */}
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                <motion.div
                  className="bg-gradient-to-b from-purple-400 to-purple-600 text-white font-black text-lg sm:text-xl md:text-2xl lg:text-4xl px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg border-2 border-purple-300"
                  style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                      "0 0 30px rgba(168, 85, 247, 0.8)",
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                >
                  {String(timeLeft.hours).padStart(2, "0")}
                </motion.div>
                <p
                  className="text-purple-400 text-xs md:text-sm mt-2 font-semibold"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  HOURS
                </p>
              </motion.div>

              {/* Minutes */}
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              >
                <motion.div
                  className="bg-gradient-to-b from-pink-400 to-pink-600 text-white font-black text-lg sm:text-xl md:text-2xl lg:text-4xl px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg border-2 border-pink-300"
                  style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(236, 72, 153, 0.5)",
                      "0 0 30px rgba(236, 72, 153, 0.8)",
                      "0 0 20px rgba(236, 72, 153, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                >
                  {String(timeLeft.minutes).padStart(2, "0")}
                </motion.div>
                <p
                  className="text-pink-400 text-xs md:text-sm mt-2 font-semibold"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  MINUTES
                </p>
              </motion.div>

              {/* Seconds */}
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <motion.div
                  className="bg-gradient-to-b from-green-400 to-green-600 text-black font-black text-lg sm:text-xl md:text-2xl lg:text-4xl px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg border-2 border-green-300"
                  style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.5)",
                      "0 0 30px rgba(34, 197, 94, 0.8)",
                      "0 0 20px rgba(34, 197, 94, 0.5)",
                    ],
                    scale: timeLeft.seconds % 2 === 0 ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    boxShadow: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.9,
                    },
                    scale: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }}
                >
                  {String(timeLeft.seconds).padStart(2, "0")}
                </motion.div>
                <p
                  className="text-green-400 text-xs md:text-sm mt-2 font-semibold"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  SECONDS
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Emergency button – instant navigation */}
        <motion.div
          className="mt-16 mb-10"
          variants={floatingVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <EmergencyButton onStartLoading={handleStart} />
        </motion.div>

        {/* Devfolio apply button – required for verification */}
        <button
          className="apply-button"
          data-hackathon-slug="hacksprint2"
          data-button-theme="dark-inverted"
        ></button>

        {/* Sponsors - explicit tiers, no tier passed in functions */}
        <motion.div
          className="w-full max-w-6xl mt-12 px-4 sm:px-6"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wider text-center mb-6"
            variants={itemVariants}
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            SPONSORS
          </motion.h2>

          {/* Platinum */}
          <section className="mb-12 text-center">
            <h3
              className="text-2xl md:text-3xl font-black text-gray-300"
              style={{ textShadow: "0 0 20px rgba(229,231,235,0.8)" }}
            >
              PLATINUM SPONSORS
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
              {platinumSponsors.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="h-32 object-contain"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Gold */}
          <section className="mb-12 text-center">
            <h3
              className="text-2xl md:text-3xl font-black text-yellow-400"
              style={{ textShadow: "0 0 20px rgba(251,191,36,0.8)" }}
            >
              GOLD SPONSORS
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
              {goldSponsors.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="h-24 object-contain"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Silver */}
          <section className="mb-12 text-center">
            <h3
              className="text-2xl md:text-3xl font-black text-gray-400"
              style={{ textShadow: "0 0 20px rgba(156,163,175,0.8)" }}
            >
              SILVER SPONSORS
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
              {silverSponsors.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="h-20 object-contain"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Bronze */}
          <section className="mb-12 text-center">
            <h3
              className="text-2xl md:text-3xl font-black text-orange-400"
              style={{ textShadow: "0 0 20px rgba(234,88,12,0.8)" }}
            >
              BRONZE SPONSORS
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
              {bronzeSponsors.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="h-16 object-contain"
                  />
                </a>
              ))}
            </div>
          </section>
        </motion.div>

        {/* Floating particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
