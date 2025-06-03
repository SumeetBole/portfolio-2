"use client";
import { motion } from "framer-motion";
import { ArrowRight, Box, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BoxReveal } from "../magicui/box-reveal";
import { Modal, ModalTrigger } from "../ui/animated-modal";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

const roles = ["Front-end Developer", "UI/UX Developer", "Technical Writer"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    const updateText = () => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
          setDisplayText(role.slice(0, displayText.length - 1));
        }
      }
    };

    const timer = setTimeout(updateText, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-100 via-sky-200 to-blue-500 to-90% dark:from-gray-800 dark:via-blue-900 dark:to-black to-90% animate-gradient-blur " />
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-xl" />
      <div className="container mx-auto px-4 pt-32 pb-20 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <BoxReveal>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="typing-text">{displayText}</span>
                <span className="animate-pulse">|</span>
              </motion.h1>
            </BoxReveal>

            <BoxReveal>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl  mb-8"
              >
                Building beautiful, responsive, and user-friendly web applications
              </motion.p>
            </BoxReveal>

            <BoxReveal>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <InteractiveHoverButton className="bg-gradient-to-br from-blue-500 from-10% via-sky-200 to-cyan-400 dark:from-gray-500 dark:via-blue-800 dark:to-black light:text-black border-2 border-gray-500" onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  View Projects
                </InteractiveHoverButton>
                <Modal>
                  <ModalTrigger className="bg-gradient-to-br  from-blue-500 from-10% via-sky-200 to-cyan-400 dark:from-gray-500 dark:via-blue-800 dark:to-black light:text-black flex justify-center group/modal-btn border-2 border-gray-500">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                      Download CV
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20 text-2xl">
                      ⬇️
                    </div>
                  </ModalTrigger>
                </Modal>
              </motion.div>
            </BoxReveal>

            <BoxReveal>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex space-x-6 "
              >
                {[
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Mail, href: "#" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className=" hover:text-primary transition-colors "
                    whileHover={{ rotate: 15, scale: 1.0 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon size={30} />
                  </motion.a>
                ))}
              </motion.div>
            </BoxReveal>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >

            <div className="relative aspect-square max-w-md mx-auto ">
              <div className="absolute inset-0 from-primary/20 via-accent/20 to-secondary/20 rounded-full " />
              <Image
                src="/assets/portrait2.jpg"
                alt="Profile"
                width={1100}
                height={1100}
                className="rounded-full h-full border-4 border-primary/20 lg:translate-x-10 "
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
