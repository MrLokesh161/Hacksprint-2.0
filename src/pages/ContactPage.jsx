import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StarfieldBackground from '../components/StarfieldBackground';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      details: "hello@hacksprint.com",
      description: "Get in touch with us"
    },
    {
      icon: "🐦",
      title: "Twitter",
      details: "@HackSprint2024",
      description: "Follow us for updates"
    },
    {
      icon: "💬",
      title: "Discord",
      details: "HackSprint Community",
      description: "Join our community"
    },
    {
      icon: "📍",
      title: "Location",
      details: "Virtual & On-site",
      description: "Global participation"
    }
  ];

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
        <motion.div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-6xl w-full px-4" variants={containerVariants}>
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-wider cursor-pointer"
            variants={itemVariants}
            style={{
              fontFamily: "'Pixelify Sans', monospace",
              fontWeight: 700,
              textShadow: "0px 0px 20px rgba(6, 182, 212, 0.5)"
            }}
          >
            MISSION CONTROL
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-cyan-400 font-semibold space-font"
            variants={itemVariants}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Ready to Join the Adventure? Contact Us!
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mt-8 sm:mt-12">
            {/* Contact Information */}
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.h2 
                className="text-2xl md:text-3xl text-white font-bold space-font mb-8"
                variants={itemVariants}
              >
                Get In Touch
              </motion.h2>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 border border-cyan-400/20 rounded-lg p-6 backdrop-blur-sm flex items-center space-x-4"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: "rgba(6, 182, 212, 0.5)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                  }}
                >
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <h3 className="text-white font-bold text-lg space-font">
                      {info.title}
                    </h3>
                    <p className="text-cyan-400 font-semibold">
                      {info.details}
                    </p>
                    <p className="text-white/70 text-sm">
                      {info.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={containerVariants}>
              <motion.h2 
                className="text-2xl md:text-3xl text-white font-bold space-font mb-8"
                variants={itemVariants}
              >
                Send a Message
              </motion.h2>
              
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/5 border border-cyan-400/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 backdrop-blur-sm"
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/5 border border-cyan-400/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 backdrop-blur-sm"
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/5 border border-cyan-400/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 backdrop-blur-sm"
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-4 bg-white/5 border border-cyan-400/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 backdrop-blur-sm resize-none"
                    required
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 space-font"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  LAUNCH MESSAGE 🚀
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;