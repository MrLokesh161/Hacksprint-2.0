import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StarfieldBackground from "../components/StarfieldBackground";

const SponsorsPage = () => {
  const navigate = useNavigate();

  const sponsorTiers = {
    platinum: [
      {
        name: "Devfolio",
        image: "./Devfolio_Logo-Colored.svg",
        alt: "DEVFOLIO LOGO",
        link: "https://devfolio.co/",
        description: "Leading hackathon platform empowering developers globally"
      }
    ],
    gold: [
      {
        name: "ETHIndia",
        image: "./ethindia-dark.svg", 
        alt: "ETHINDIA LOGO",
        link: "https://ethindia.co/",
        description: "India's largest Ethereum hackathon and developer community"
      }
    ],
    silver: [
      {
        name: "TechCorp",
        image: "techcorp-logo.png",
        alt: "TechCorp Logo",
        link: "#",
        description: "Global leaders in cloud computing and enterprise solutions"
      },
      {
        name: "InnovateLab",
        image: "innovate-logo.png", 
        alt: "InnovateLab Logo",
        link: "#",
        description: "Pioneering AI research and development"
      }
    ],
    bronze: [
      {
        name: "SecureNet",
        image: "securenet-logo.png",
        alt: "SecureNet Logo", 
        link: "#",
        description: "Experts in cybersecurity and data protection"
      },
      {
        name: "IoT Solutions",
        image: "iot-logo.png",
        alt: "IoT Solutions Logo",
        link: "#", 
        description: "Innovators in IoT and smart device technology"
      },
      {
        name: "OpenSource Inc",
        image: "opensource-logo.png",
        alt: "OpenSource Inc Logo",
        link: "#",
        description: "Champions of open-source software development"
      }
    ]
  };

  const tierConfig = {
    platinum: {
      title: "PLATINUM SPONSORS",
      color: "from-gray-300 to-gray-100",
      borderColor: "border-gray-300/50",
      textColor: "text-gray-300",
      glowColor: "rgba(229, 231, 235, 0.8)",
      cardSize: "col-span-full",
      logoSize: "h-32"
    },
    gold: {
      title: "GOLD SPONSORS", 
      color: "from-yellow-400 to-yellow-600",
      borderColor: "border-yellow-400/50",
      textColor: "text-yellow-400",
      glowColor: "rgba(251, 191, 36, 0.8)",
      cardSize: "col-span-full lg:col-span-2",
      logoSize: "h-24"
    },
    silver: {
      title: "SILVER SPONSORS",
      color: "from-gray-400 to-gray-600", 
      borderColor: "border-gray-400/50",
      textColor: "text-gray-400",
      glowColor: "rgba(156, 163, 175, 0.8)",
      cardSize: "col-span-1 lg:col-span-1",
      logoSize: "h-20"
    },
    bronze: {
      title: "BRONZE SPONSORS",
      color: "from-orange-600 to-orange-800",
      borderColor: "border-orange-600/50", 
      textColor: "text-orange-400",
      glowColor: "rgba(234, 88, 12, 0.8)",
      cardSize: "col-span-1",
      logoSize: "h-16"
    }
  };

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

  return (
    <motion.div
      className="relative w-full min-h-screen bg-black spaceship-cursor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="fixed inset-0 w-full h-full">
        <StarfieldBackground />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 py-12 sm:py-16 min-h-screen page-with-progress-bar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl w-full px-4"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-wider cursor-pointer"
            variants={itemVariants}
            style={{
              fontFamily: "'Pixelify Sans', monospace",
              fontWeight: 700,
              textShadow: "0px 0px 20px rgba(6, 182, 212, 0.5)",
            }}
          >
            SPONSORS
          </motion.h1>

          <motion.div
            className="space-y-6 text-white/90"
            variants={itemVariants}
          >
            <motion.p
              className="text-xl md:text-2xl text-cyan-400 font-semibold space-font"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Our Amazing Partners
            </motion.p>

            <motion.p
              className="text-lg md:text-xl leading-relaxed body-font"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Meet the incredible organizations supporting HackSprint 2025.
              Together, we're building the future of technology and innovation.
            </motion.p>

            {/* Sponsor Tiers */}
            <div className="space-y-12 mt-8 sm:mt-12">
              {Object.entries(sponsorTiers).map(([tier, sponsors]) => {
                const config = tierConfig[tier];
                
                if (sponsors.length === 0) return null;
                
                return (
                  <motion.div 
                    key={tier}
                    className="space-y-6"
                    variants={containerVariants}
                  >
                    {/* Tier Title */}
                    <motion.div 
                      className="text-center"
                      variants={itemVariants}
                    >
                      <motion.h2
                        className={`text-2xl md:text-3xl lg:text-4xl font-black tracking-wider cursor-pointer ${config.textColor}`}
                        style={{
                          fontFamily: "'Pixelify Sans', monospace",
                          fontWeight: 700,
                          textShadow: `0px 0px 20px ${config.glowColor}`,
                        }}
                        whileHover={{
                          scale: 1.05,
                          textShadow: `0px 0px 30px ${config.glowColor}`,
                        }}
                      >
                        {config.title}
                      </motion.h2>
                      <motion.div 
                        className={`h-1 w-24 mx-auto mt-4 bg-linear-to-r ${config.color} rounded-full`}
                        whileInView={{ width: 96 }}
                        initial={{ width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </motion.div>

                    {/* Sponsors Grid */}
                    <motion.div
                      className={`grid grid-cols-1 ${tier === 'bronze' ? 'sm:grid-cols-2 lg:grid-cols-3' : tier === 'silver' ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-1'} gap-6`}
                      variants={containerVariants}
                    >
                      {sponsors.map((sponsor, index) => (
                        <motion.div
                          key={sponsor.name}
                          className={`bg-linear-to-br from-black/40 to-black/20 border ${config.borderColor} rounded-xl p-6 backdrop-blur-sm cursor-pointer group`}
                          variants={itemVariants}
                          whileHover={{
                            scale: 1.03,
                            borderColor: config.glowColor,
                            boxShadow: `0 0 30px ${config.glowColor}`,
                          }}
                          onClick={() => sponsor.link !== "#" && window.open(sponsor.link, "_blank")}
                        >
                          {/* Logo Container */}
                          <div className={`w-full ${config.logoSize} bg-white/90 rounded-lg flex items-center justify-center mb-4 p-4 group-hover:bg-white transition-all duration-300`}>
                            <img
                              src={sponsor.image}
                              alt={sponsor.alt}
                              className="max-h-full max-w-full object-contain"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/200x100/374151/ffffff?text=${sponsor.name}`;
                              }}
                            />
                          </div>
                          
                          {/* Sponsor Info */}
                          <div className="text-center">
                            <h3 className={`${config.textColor} font-bold text-xl mb-2 space-font group-hover:text-white transition-colors duration-300`}>
                              {sponsor.name}
                            </h3>
                            <p className="text-white/80 text-sm body-font leading-relaxed">
                              {sponsor.description}
                            </p>
                          </div>

                          {/* Tier Badge */}
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
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SponsorsPage;
