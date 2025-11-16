import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  // Devfolio script
  useEffect(() => {
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

  // Sponsors data
  const sponsorTiers = {
    platinum: [
      {
        name: "Devfolio",
        image: "./devfoliologo.png",
        alt: "DEVFOLIO LOGO",
        link: "https://devfolio.co/",
      },
    ],
    gold: [
      {
        name: "ETHIndia",
        image: "./ethlogo.png",
        alt: "ETHINDIA LOGO",
        link: "https://ethindia.co/",
      },
    ],
    silver: [
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
    ],
    bronze: [
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
            {/* (All your lightning SVG + title code stays exactly the same) */}
            {/* -------------- TITLE / LIGHTNING START -------------- */}
            {/* Background Lightning SVG */}
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 800 200"
              style={{ zIndex: -1 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* (paths omitted for brevity – keep your existing ones) */}
              {/* ... your lightning <motion.path> elements here ... */}
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
            {/* -------------- TITLE / LIGHTNING END -------------- */}
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
          {/* (Your full countdown block stays the same – omitted to keep this short) */}
          {/* ---------------------------------------------- */}
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

        {/* Devfolio Apply button */}
        <button
          className="apply-button"
          data-hackathon-slug="hacksprint2"
          data-button-theme="dark-inverted"
        ></button>

        {/* Sponsors Section – SIMPLE LOGO ROWS */}
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
                <motion.div
                  key={tier}
                  className="space-y-6"
                  variants={containerVariants}
                >
                  {/* Tier title */}
                  <motion.div className="text-center" variants={itemVariants}>
                    <motion.h3
                      className={`text-2xl md:text-3xl font-black tracking-wider ${config.textColor}`}
                      style={{
                        fontFamily: "'Pixelify Sans', monospace",
                        textShadow: `0px 0px 20px ${config.glowColor}`,
                      }}
                    >
                      {config.title}
                    </motion.h3>
                  </motion.div>

                  {/* Logos only */}
                  <motion.div
                    className="flex flex-wrap justify-center items-center gap-8 mt-2"
                    variants={containerVariants}
                  >
                    {sponsors.map((sponsor) => (
                      <motion.a
                        key={sponsor.name}
                        href={sponsor.link === "#" ? undefined : sponsor.link}
                        target={
                          sponsor.link === "#" ? undefined : "_blank"
                        }
                        rel={
                          sponsor.link === "#" ? undefined : "noreferrer"
                        }
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center justify-center"
                      >
                        <img
                          src={sponsor.image}
                          alt={sponsor.alt}
                          className={`${config.logoSize} object-contain`}
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/200x100/374151/ffffff?text=${encodeURIComponent(
                              sponsor.name
                            )}`;
                          }}
                        />
                      </motion.a>
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
