import React from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect } from "react";
import StarfieldBackground from "../components/StarfieldBackground";

const AboutPage = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const cardsRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true });
  const areCardsInView = useInView(cardsRef, { once: true });

  // Mouse tracking for character
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth following
  const springConfig = { damping: 25, stiffness: 150 };
  const characterX = useSpring(mouseX, springConfig);
  const characterY = useSpring(mouseY, springConfig);

  // Transform mouse position to character movement (with offset to stay on right side)
  const followX = useTransform(
    characterX,
    [0, window.innerWidth || 1920],
    [-20, 20]
  );
  const followY = useTransform(
    characterY,
    [0, window.innerHeight || 1080],
    [-30, 30]
  );

  // Eye positions based on mouse
  const eyeLeftX = useTransform(
    characterX,
    [0, window.innerWidth || 1920],
    [19, 21]
  );
  const eyeLeftY = useTransform(
    characterY,
    [0, window.innerHeight || 1080],
    [14, 16]
  );
  const eyeRightX = useTransform(
    characterX,
    [0, window.innerWidth || 1920],
    [27, 29]
  );
  const eyeRightY = useTransform(
    characterY,
    [0, window.innerHeight || 1080],
    [14, 16]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: { scale: 0.5, opacity: 0, rotateX: -90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { x: -100, opacity: 0, rotateY: -90 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 400,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 30px rgba(6, 182, 212, 0.6)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 400,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 500,
      },
    },
  };

  return (
    <motion.div
      className="relative w-full min-h-screen bg-black spaceship-cursor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Three.js Canvas for 3D starfield background */}
      <div className="fixed inset-0 w-full h-full">
        <StarfieldBackground />
      </div>

      {/* Mouse-Following Among Us Character - Top Right Corner */}
      <motion.div
        className="fixed top-8 right-8 z-30"
        initial={{ opacity: 0, x: 100, y: -50 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        style={{
          x: followX,
          y: followY,
        }}
        transition={{
          opacity: { delay: 2, type: "spring", damping: 12 },
          x: { delay: 2, type: "spring", damping: 12 },
          y: { delay: 2, type: "spring", damping: 12 },
        }}
      >
        <motion.div
          className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 drop-shadow-2xl among-us-character"
          whileHover={{
            scale: 1.3,
            rotate: 20,
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
          whileTap={{
            scale: 0.9,
            rotate: -10,
            transition: { type: "spring", stiffness: 400 },
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Custom SVG with animated eyes */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Among Us Character Body */}
            <ellipse cx="24" cy="32" rx="12" ry="8" fill="#8B5CF6" />

            {/* Main Body */}
            <path
              d="M12 20c0-6.627 5.373-12 12-12s12 5.373 12 12v16c0 2.209-1.791 4-4 4H16c-2.209 0-4-1.791-4-4V20z"
              fill="#8B5CF6"
            />

            {/* Visor/Glass */}
            <ellipse cx="24" cy="16" rx="8" ry="6" fill="#6EE7B7" />

            {/* Animated Eyes that follow cursor */}
            <motion.circle
              r="1.5"
              fill="#1F2937"
              style={{
                cx: eyeLeftX,
                cy: eyeLeftY,
              }}
            />
            <motion.circle
              r="1.5"
              fill="#1F2937"
              style={{
                cx: eyeRightX,
                cy: eyeRightY,
              }}
            />

            {/* Visor Highlight */}
            <ellipse
              cx="21"
              cy="13"
              rx="2"
              ry="1.5"
              fill="#FFFFFF"
              opacity="0.6"
            />

            {/* Backpack */}
            <rect x="32" y="14" width="4" height="8" rx="2" fill="#7C3AED" />

            {/* Legs */}
            <ellipse cx="19" cy="39" rx="3" ry="2" fill="#6B46C1" />
            <ellipse cx="29" cy="39" rx="3" ry="2" fill="#6B46C1" />

            {/* Shadow */}
            <ellipse
              cx="24"
              cy="42"
              rx="8"
              ry="2"
              fill="#000000"
              opacity="0.2"
            />
          </svg>
        </motion.div>

        {/* Enhanced floating particles around character */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-purple-400 rounded-full shadow-lg"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 0.9, 0],
              x: [0, Math.sin(i * 1.5) * 30, 0],
              y: [0, Math.cos(i * 1.5) * 25, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Additional glow particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute w-4 h-4 bg-cyan-400 rounded-full blur-sm opacity-60"
            style={{
              left: `${30 + i * 10}%`,
              top: `${40 + i * 10}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
              x: [0, Math.cos(i * 2) * 25, 0],
              y: [0, Math.sin(i * 2) * 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Main content overlay */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 py-12 sm:py-16 min-h-screen page-with-progress-bar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          ref={contentRef}
          className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl px-4"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-wider cursor-pointer"
            variants={titleVariants}
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 30px rgba(6, 182, 212, 1)",
              transition: { type: "spring", stiffness: 300 },
            }}
            style={{
              fontFamily: "'Pixelify Sans', monospace",
              fontWeight: 700,
              textShadow: "0px 0px 20px rgba(6, 182, 212, 0.5)",
            }}
          >
            MISSION BRIEFING
          </motion.h1>

          <motion.div
            className="space-y-6 text-white/90"
            variants={itemVariants}
          >
            <motion.p
              className="text-xl md:text-2xl text-cyan-400 font-semibold space-font"
              whileHover={{
                scale: 1.05,
                color: "#22d3ee",
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              Welcome to HackSprint 2025
            </motion.p>

            <motion.p
              className="text-lg md:text-xl leading-relaxed body-font"
              variants={itemVariants}
              whileHover={{
                color: "#ffffff",
                transition: { duration: 0.3 },
              }}
            >
              You've successfully joined the crew! This is a 36-hour hackathon
              where innovation meets adventure. Prepare for an epic journey
              through code, creativity, and cutting-edge technology.
            </motion.p>

            <motion.div
              ref={cardsRef}
              className="grid md:grid-cols-3 gap-6 mt-8"
              variants={containerVariants}
              initial="hidden"
              animate={areCardsInView ? "visible" : "hidden"}
            >
              <motion.div
                className="bg-cyan-500/10 border border-cyan-400 rounded-lg p-6 backdrop-blur-sm cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.h3
                  className="text-cyan-300 font-bold text-xl mb-2 space-font"
                  whileHover={{ scale: 1.1 }}
                >
                  🚀 Launch
                </motion.h3>
                <p className="text-white/80 body-font">
                  Begin your coding odyssey
                </p>
              </motion.div>

              <motion.div
                className="bg-purple-500/10 border border-purple-400 rounded-lg p-6 backdrop-blur-sm cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.h3
                  className="text-purple-300 font-bold text-xl mb-2 space-font"
                  whileHover={{ scale: 1.1 }}
                >
                  ⚡ Build
                </motion.h3>
                <p className="text-white/80 body-font">
                  Create something extraordinary
                </p>
              </motion.div>

              <motion.div
                className="bg-green-500/10 border border-green-400 rounded-lg p-6 backdrop-blur-sm cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.h3
                  className="text-green-300 font-bold text-xl mb-2 space-font"
                  whileHover={{ scale: 1.1 }}
                >
                  🏆 Deploy
                </motion.h3>
                <p className="text-white/80 body-font">Ship your masterpiece</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        

        {/* Floating interactive elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.8, 0],
                x: [0, Math.sin(i) * 20, 0],
                y: [0, Math.cos(i) * 15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
