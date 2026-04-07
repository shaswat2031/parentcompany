"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ScrollProgressBar from "./ScrollProgressBar";

export default function PageAnimatePresence({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <ScrollProgressBar />
      {/* 
        Ensuring each page has a unique key for AnimatePresence 
        This is why usePathname is used here.
      */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
