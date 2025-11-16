import React from 'react';
import { motion } from 'framer-motion';
import StarfieldBackground from '../components/StarfieldBackground';

const FAQPage = () => {
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

  const faqs = [
    {
      question: "What is HackSprint?",
      answer: "HackSprint is a 36-hour hackathon where developers, designers, and innovators come together to build amazing projects."
    },
    {
      question: "Who can participate?",
      answer: "Anyone with a passion for technology! Students, professionals, and enthusiasts of all skill levels are welcome."
    },
    {
      question: "Do I need a team?",
      answer: "Teams of 2-4 people are recommended, but you can also participate solo or find teammates during the event."
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, chargers, and creativity! We'll provide food, drinks, and an amazing atmosphere."
    },
    {
      question: "Are there prizes?",
      answer: "Yes! We have exciting prizes for various categories including Best Overall, Most Innovative, and People's Choice."
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
        <motion.div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl w-full px-4" variants={containerVariants}>
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-wider cursor-pointer"
            variants={itemVariants}
            style={{
              fontFamily: "'Pixelify Sans', monospace",
              fontWeight: 700,
              textShadow: "0px 0px 20px rgba(6, 182, 212, 0.5)"
            }}
          >
            FAQ
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-cyan-400 font-semibold space-font"
            variants={itemVariants}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Frequently Asked Questions
          </motion.p>

          <motion.div className="space-y-3 sm:space-y-4 mt-8 sm:mt-12">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-cyan-400/20 rounded-lg p-6 backdrop-blur-sm text-left"
                variants={itemVariants}
                whileHover={{ 
                  borderColor: "rgba(6, 182, 212, 0.5)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)"
                }}
              >
                <h3 className="text-cyan-300 font-bold text-lg mb-3 space-font">
                  {faq.question}
                </h3>
                <p className="text-white/80 body-font leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FAQPage;