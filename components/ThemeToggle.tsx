"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShineBorder } from "./magicui/shine-border"; // Import the ShineBorder component

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <div className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
      <ShineBorder
        borderWidth={2} // Adjust border width
        duration={8} // Adjust animation speed
        shineColor={["#00FFFF", "#007BFF"]} // Cyan to blue gradient
      />
      <button
        className="relative flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-900 rounded-full transition-all duration-75 group-hover:bg-transparent group-hover:dark:bg-transparent"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5 text-black" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}
