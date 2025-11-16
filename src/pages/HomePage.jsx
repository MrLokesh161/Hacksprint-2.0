import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import EmergencyButton from "../components/EmergencyButton";
import StarfieldBackground from "../components/StarfieldBackground";
import SpaceshipLoadingAnimation from "../components/SpaceShipLoading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 97,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
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
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleStartLoading = () => {
    setIsLoading(true);

    // Show loading for 3 seconds, then navigate to about page
    setTimeout(() => {
      navigate("/about");
    }, 3000);
  };

  if (isLoading) {
    return <SpaceshipLoadingAnimation />;
  }

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

  // Sponsors data (embedded into Home page)
  const sponsorTiers = {
    platinum: [
      {
        name: "Devfolio",
        image: "./Devfolio_Logo-Colored.svg",
        alt: "DEVFOLIO LOGO",
        link: "https://devfolio.co/",
        description: "Leading hackathon platform empowering developers globally",
      },
    ],
    gold: [
      {
        name: "ETHIndia",
        image: "./ethindia-dark.svg",
        alt: "ETHINDIA LOGO",
        link: "https://ethindia.co/",
        description: "India's largest Ethereum hackathon and developer community",
      },
    ],
    silver: [
      {
        name: "TechCorp",
        image: "techcorp-logo.png",
        alt: "TechCorp Logo",
        link: "#",
        description: "Global leaders in cloud computing and enterprise solutions",
      },
      {
        name: "InnovateLab",
        image: "innovate-logo.png",
        alt: "InnovateLab Logo",
        link: "#",
        description: "Pioneering AI research and development",
      },
    ],
    bronze: [
      {
        name: "SecureNet",
        image: "securenet-logo.png",
        alt: "SecureNet Logo",
        link: "#",
        description: "Experts in cybersecurity and data protection",
      },
      {
        name: "IoT Solutions",
        image: "iot-logo.png",
        alt: "IoT Solutions Logo",
        link: "#",
        description: "Innovators in IoT and smart device technology",
      },
      {
        name: "OpenSource Inc",
        image: "opensource-logo.png",
        alt: "OpenSource Inc Logo",
        link: "#",
        description: "Champions of open-source software development",
      },
    ],
  };

  const tierConfig = {
    platinum: {
      title: "PLATINUM SPONSORS",
      color: "from-gray-300 to-gray-100",
      borderColor: "border-gray-300/50",
      textColor: "text-gray-300",
      glowColor: "rgba(229, 231, 235, 0.8)",
      cardSize: "col-span-full",
      logoSize: "h-32",
    },
    gold: {
      title: "GOLD SPONSORS",
      color: "from-yellow-400 to-yellow-600",
      borderColor: "border-yellow-400/50",
      textColor: "text-yellow-400",
      glowColor: "rgba(251, 191, 36, 0.8)",
      cardSize: "col-span-full lg:col-span-2",
      logoSize: "h-24",
    },
    silver: {
      title: "SILVER SPONSORS",
      color: "from-gray-400 to-gray-600",
      borderColor: "border-gray-400/50",
      textColor: "text-gray-400",
      glowColor: "rgba(156, 163, 175, 0.8)",
      cardSize: "col-span-1 lg:col-span-1",
      logoSize: "h-20",
    },
    bronze: {
      title: "BRONZE SPONSORS",
      color: "from-orange-600 to-orange-800",
      borderColor: "border-orange-600/50",
      textColor: "text-orange-400",
      glowColor: "rgba(234, 88, 12, 0.8)",
      cardSize: "col-span-1",
      logoSize: "h-16",
    },
  };

  return (
    <motion.div
      className="relative w-full min-h-screen bg-black spaceship-cursor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Three.js Canvas for 3D starfield background */}
      <div className="fixed inset-0 w-full h-full">
        <StarfieldBackground />
      </div>

      {/* Main content overlay */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-16 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title Section */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <motion.div
            className="relative inline-block"
            variants={titleVariants}
            whileHover="hover"
          >
            {/* Background Lightning SVG */}
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
              {/* Lightning bolts paths */}
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

              <motion.path
                d="M300 120 L400 70 L370 130 L450 90 L420 150 L500 110"
                stroke="#4da6ff"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 6px #4da6ff) drop-shadow(0 0 12px #0080ff)",
                }}
              />

              <motion.path
                d="M550 90 L650 50 L620 110 L700 70 L670 130 L750 90"
                stroke="#66ccff"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 6px #66ccff) drop-shadow(0 0 12px #0080ff)",
                }}
              />

              {/* Additional crackling effects */}
              <motion.path
                d="M100 140 L180 160 L160 180 L220 170"
                stroke="#80d4ff"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9,
                }}
                style={{
                  filter: "drop-shadow(0 0 4px #80d4ff)",
                }}
              />

              <motion.path
                d="M400 160 L480 180 L460 200 L520 190"
                stroke="#80d4ff"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
                style={{
                  filter: "drop-shadow(0 0 4px #80d4ff)",
                }}
              />

              {/* Thunder bolts passing through text */}
              <motion.path
                d="M0 100 L100 95 L80 105 L200 90 L180 110 L300 85 L280 115 L400 80 L380 120 L500 75 L480 125 L600 70 L580 130 L700 65 L680 135 L800 60"
                stroke="#ffffff"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 2,
                  repeatDelay: 3,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 12px #ffffff) drop-shadow(0 0 20px #00bfff) drop-shadow(0 0 30px #0080ff)",
                }}
              />

              <motion.path
                d="M0 120 L120 110 L100 130 L250 105 L230 135 L380 100 L360 140 L520 95 L500 145 L650 90 L630 150 L800 85"
                stroke="#e0f7ff"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 4.5,
                  repeatDelay: 4,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 8px #e0f7ff) drop-shadow(0 0 16px #00bfff)",
                }}
              />

              <motion.path
                d="M800 80 L700 85 L720 75 L600 90 L620 70 L500 95 L520 65 L400 100 L420 60 L300 105 L320 55 L200 110 L220 50 L100 115 L120 45 L0 120"
                stroke="#b3e6ff"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 0.8, 0.8, 0],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 6,
                  repeatDelay: 5,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 6px #b3e6ff) drop-shadow(0 0 12px #00bfff)",
                }}
              />

              {/* Vertical thunder strikes */}
              <motion.path
                d="M200 0 L190 50 L210 40 L185 100 L215 90 L180 150 L220 140 L175 200"
                stroke="#ffffff"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 8,
                  repeatDelay: 6,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 10px #ffffff) drop-shadow(0 0 18px #00bfff)",
                }}
              />

              <motion.path
                d="M600 0 L590 60 L610 50 L585 120 L615 110 L580 180 L620 170 L575 200"
                stroke="#ccf2ff"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 10,
                  repeatDelay: 7,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 8px #ccf2ff) drop-shadow(0 0 15px #00bfff)",
                }}
              />
            </motion.svg>

            {/* Electric glow background */}
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

            {/* Main electric title */}
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

          <motion.p
            className="text-lg md:text-2xl text-cyan-400 font-semibold tracking-wide"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              color: "#22d3ee",
              transition: { type: "spring", stiffness: 300 },
            }}
            style={{
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            36 HOUR HACKATHON
          </motion.p>

          {/* Countdown Timer */}
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

        {/* Emergency Start Button */}
        <motion.div
          className="mt-16 mb-10"
          variants={floatingVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <EmergencyButton onStartLoading={handleStartLoading} />
        </motion.div>

        <button
          className="apply-button "
          data-hackathon-slug="hacksprint2"
          data-button-theme="dark-inverted"
        ></button>

        {/* Sponsors Section (inlined from SponsorsPage) */}
        <motion.div
          className="w-full max-w-6xl mt-12 px-4 sm:px-6"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wider text-center mb-6"
            variants={itemVariants}
            style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: 700 }}
          >
            SPONSORS
          </motion.h2>

          <motion.div className="space-y-12 mt-4" variants={containerVariants}>
            {Object.entries(sponsorTiers).map(([tier, sponsors]) => {
              const config = tierConfig[tier];
              if (!sponsors || sponsors.length === 0) return null;

              return (
                <motion.div key={tier} className="space-y-6" variants={containerVariants}>
                  <motion.div className="text-center" variants={itemVariants}>
                    <motion.h3
                      className={`text-2xl md:text-3xl font-black tracking-wider ${config.textColor}`}
                      style={{ fontFamily: "'Pixelify Sans', monospace", textShadow: `0px 0px 20px ${config.glowColor}` }}
                      variants={itemVariants}
                    >
                      {config.title}
                    </motion.h3>
                  </motion.div>

                  <motion.div
                    className={`grid grid-cols-1 ${tier === 'bronze' ? 'sm:grid-cols-2 lg:grid-cols-3' : tier === 'silver' ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-1'} gap-6`}
                    variants={containerVariants}
                  >
                    {sponsors.map((sponsor) => (
                      <motion.div
                        key={sponsor.name}
                        className={`relative bg-linear-to-br from-black/40 to-black/20 border ${config.borderColor} rounded-xl p-6 backdrop-blur-sm cursor-pointer group`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${config.glowColor}` }}
                        onClick={() => sponsor.link !== "#" && window.open(sponsor.link, "_blank")}
                      >
                        <div className={`w-full ${config.logoSize} bg-white/90 rounded-lg flex items-center justify-center mb-4 p-4 group-hover:bg-white transition-all duration-300`}>
                          <img
                            src={sponsor.image}
                            alt={sponsor.alt}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => { e.target.src = `https://via.placeholder.com/200x100/374151/ffffff?text=${sponsor.name}`; }}
                          />
                        </div>

                        <div className="text-center">
                          <h4 className={`${config.textColor} font-bold text-xl mb-2 group-hover:text-white transition-colors duration-300`}>
                            {sponsor.name}
                          </h4>
                          <p className="text-white/80 text-sm leading-relaxed">{sponsor.description}</p>
                        </div>

                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-bold bg-linear-to-r ${config.color} text-black uppercase tracking-wide`}>
                            {tier}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Interactive particles */}
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
