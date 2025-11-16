import React, { useState } from "react";
import { motion } from "framer-motion";

const EmergencyButton = ({ onStartLoading }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setShowMessage(true);

    setTimeout(() => setIsPressed(false), 200);
    setTimeout(() => setShowMessage(false), 1000);

    // Start the loading sequence after a brief delay
    setTimeout(() => {
      if (onStartLoading) {
        onStartLoading();
      }
    }, 100);
  };

  return (
    <motion.div className="flex flex-col items-center space-y-6">
      {/* Emergency Button */}
      <motion.button
        onClick={handleClick}
        className="relative w-56 h-20 md:w-64 md:h-24 px-6 py-4 md:px-8 md:py-6 rounded-lg bg-linear-to-b from-purple-500 to-purple-700 border-4 border-purple-800"
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 300 },
        }}
        whileTap={{
          scale: 0.95,
          transition: { type: "spring", stiffness: 500 },
        }}
      >
        {/* Button highlight */}
        <motion.div className="absolute inset-0 rounded-lg bg-linear-to-b from-white/30 to-transparent opacity-50" />

        {/* Button text */}
        <motion.div
          className="relative flex items-center justify-center h-full"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="text-white text-2xl md:text-3xl font-black tracking-wider drop-shadow-lg"
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            START JOURNEY
          </motion.span>
        </motion.div>

        {/* Animated glow effect */}
        <motion.div className="absolute inset-0 rounded-lg bg-purple-500 blur-xl opacity-40" />
      </motion.button>
    </motion.div>
  );
};

export default EmergencyButton;
