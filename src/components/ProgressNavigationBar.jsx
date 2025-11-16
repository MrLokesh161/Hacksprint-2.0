import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const ProgressNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const routes = [
    { name: 'Home', path: '/', icon: '🏠', color: '#FF6B6B' },
    { name: 'About', path: '/about', icon: '📋', color: '#4ECDC4' },
    { name: 'Sponsors', path: '/sponsors', icon: '🤝', color: '#45B7D1' },
    { name: 'FAQ', path: '/faq', icon: '❓', color: '#96CEB4' },
    { name: 'Team', path: '/team', icon: '👥', color: '#FFEAA7' },
    { name: 'Contact', path: '/contact', icon: '📧', color: '#DDA0DD' },
  ];

  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);

  useEffect(() => {
    const index = routes.findIndex(route => route.path === location.pathname);
    setCurrentRouteIndex(index >= 0 ? index : 0);
  }, [location.pathname]);

  const handleRouteClick = (path, index) => {
    navigate(path);
    setCurrentRouteIndex(index);
  };

  const progressPercentage = ((currentRouteIndex + 1) / routes.length) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-6 py-6 max-w-4xl mt-4 mb-2">
        {/* Navigation Points with Line */}
        <div className="flex justify-between items-center relative">
          {/* Straight Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 -translate-y-1/2 -z-10"></div>
          
          {routes.map((route, index) => {
            const isActive = index === currentRouteIndex;
            const isClickable = true; // All routes are clickable
            
            return (
              <motion.div
                key={route.path}
                className="flex flex-col items-center cursor-pointer group relative"
                onClick={() => isClickable && handleRouteClick(route.path, index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Route Point or Rocket */}
                {isActive ? (
                  // Rocket for active page
                  <motion.div
                    className="w-6 h-6 flex items-center justify-center text-2xl bg-white rounded-full"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    🚀
                  </motion.div>
                ) : (
                  // Small icon for other pages
                  <motion.div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-xs bg-white/20 border border-white/40 text-white/70 hover:bg-white/30 hover:text-white transition-all duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                  >
                    {route.icon}
                  </motion.div>
                )}

                {/* Tooltip */}
                <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/90 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap border border-white/20">
                    {isActive ? `Current: ${route.name}` : `Go to ${route.name}`}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressNavigationBar;