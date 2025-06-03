"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { ShimmerButton } from "./magicui/shimmer-button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 120;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "About", "Skills", "Projects", "Contact"];

  const scrollToSection = (sectionId: string) => {
    const id = sectionId.toLowerCase(); // assumes section ids like "about", "skills", etc.
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 80; // Adjust this as per your actual header height
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
  
      // Close the menu first before scrolling
      setIsOpen(false);
  
      // Scroll after a small delay so menu has time to close
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
  
        setActiveSection(sectionId);
      }, 150); // delay must be long enough to allow mobile menu to animate close
    }
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-lg" : "py-6"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="profile-image">
                <Image
                  src="/assets/portrait2.jpg"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sumeet S Bole
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <ShimmerButton
                key={item}
                className={`nav-item font-medium dark:text-white ${activeSection === item ? "border-primary bg-primary/10" : ""
                  }`}
                onClick={() => scrollToSection(item)}
              >
                {item}
              </ShimmerButton>
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <ShimmerButton
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-primary/10 rounded-lg text-white dark:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </ShimmerButton>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md mt-4 rounded-lg border border-border"
            >
              <div className="py-2 flex flex-col space-y-2 px-4">
                {menuItems.map((item) => (
                  <ShimmerButton
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`w-full text-left font-medium rounded-md py-2 px-4 transition-all duration-200 ${activeSection === item
                      ? "bg-primary/10 text-primary dark:text-primary border border-primary"
                      : "text-white dark:text-white "
                      }`}
                  >
                    {item}
                  </ShimmerButton>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
};

export default Header;
