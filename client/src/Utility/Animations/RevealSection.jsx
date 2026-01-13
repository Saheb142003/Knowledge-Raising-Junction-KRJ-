import React from "react";
import { motion } from "framer-motion";

const RevealSection = ({ children, className = "", width = "100%" }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 }, // Start slightly below and invisible
        visible: { opacity: 1, y: 0 }, // Move to normal position and visible
      }}
      initial="hidden"
      whileInView="visible"
      // 'once: false' ensures it animates out again when you scroll away (up or down)
      viewport={{ once: false, amount: 0.2 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
      style={{ width, position: "relative" }}
    >
      {children}
    </motion.div>
  );
};

export default RevealSection;