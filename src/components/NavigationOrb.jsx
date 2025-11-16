import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NavigationOrb = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const routes = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'About', path: '/about', icon: '📋' },
    { name: 'Sponsors', path: '/sponsors', icon: '🤝' },
    { name: 'FAQ', path: '/faq', icon: '❓' },
    { name: 'Team', path: '/team', icon: '👥' },
    { name: 'Contact', path: '/contact', icon: '📧' },
  ];

  const handleRouteClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      x: 50,
      y: -50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      x: 50,
      y: -50,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: 30,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <div className="relative">
      {/* Main Navigation Orb */}
      <motion.div
        className="cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <motion.img
          src="/pngwing.com.png"
          alt="Navigation Menu"
          className="w-20 h-20 md:w-24 md:h-24 opacity-60 drop-shadow-lg hover:opacity-80 transition-opacity"
          animate={{
            rotate: isMenuOpen ? [0, 180] : [0, 360],
            scale: isMenuOpen ? [0.8, 1.1, 1] : [0.8, 1, 0.8],
          }}
          transition={{
            rotate: { 
              duration: isMenuOpen ? 0.5 : 20, 
              repeat: isMenuOpen ? 0 : Infinity, 
              ease: isMenuOpen ? "easeOut" : "linear" 
            },
            scale: { 
              duration: isMenuOpen ? 0.5 : 4, 
              repeat: isMenuOpen ? 0 : Infinity, 
              ease: "easeInOut" 
            },
          }}
        />
      </motion.div>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute bottom-full right-0 mb-4 bg-black/80 backdrop-blur-md rounded-2xl border border-cyan-400/30 p-4 min-w-48"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Menu Header */}
            <motion.div 
              className="text-center mb-3 pb-2 border-b border-cyan-400/20"
              variants={itemVariants}
            >
              <h3 className="text-cyan-400 font-semibold text-sm pixel-font">
                NAVIGATION
              </h3>
            </motion.div>

            {/* Menu Items */}
            <motion.div className="space-y-2">
              {routes.map((route, index) => (
                <motion.button
                  key={route.path}
                  variants={itemVariants}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-cyan-400/10 transition-all duration-200 text-left body-font"
                  onClick={() => handleRouteClick(route.path)}
                  whileHover={{ 
                    scale: 1.05,
                    x: 5,
                    backgroundColor: "rgba(6, 182, 212, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{route.icon}</span>
                  <span className="font-medium">{route.name}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Menu Footer */}
            <motion.div 
              className="text-center mt-3 pt-2 border-t border-cyan-400/20"
              variants={itemVariants}
            >
              <p className="text-xs text-white/40 body-font">
                HackSprint 2025
              </p>
            </motion.div>

            {/* Close button */}
            <motion.button
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs flex items-center justify-center transition-colors"
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={itemVariants}
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay when menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationOrb;