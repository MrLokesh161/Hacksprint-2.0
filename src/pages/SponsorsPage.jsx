import React from "react";
import { motion } from "framer-motion";
// removed useNavigate — page simplified to logos only
import StarfieldBackground from "../components/StarfieldBackground";

const SponsorsPage = () => {
  // Flatten all sponsor tiers into a single list for logo-only display
  const allSponsors = Object.values(sponsorTiers).flat();

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
      transition={{ duration: 1.2 }}
    >
      <div className="fixed inset-0 w-full h-full">
        <StarfieldBackground />
      </div>

      <motion.div
        className="relative z-10 flex items-center justify-center p-6 min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-6xl px-4">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center"
            variants={containerVariants}
          >
            {allSponsors.map((sponsor) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.link && sponsor.link !== "#" ? sponsor.link : undefined}
                target={sponsor.link && sponsor.link !== "#" ? "_blank" : undefined}
                rel={sponsor.link && sponsor.link !== "#" ? "noreferrer" : undefined}
                className="flex items-center justify-center p-4 bg-transparent"
                variants={itemVariants}
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.alt || sponsor.name}
                  className="max-h-20 md:max-h-24 lg:max-h-28 object-contain"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x120/111827/ffffff?text=${encodeURIComponent(sponsor.name)}`;
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SponsorsPage;
