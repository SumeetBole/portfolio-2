"use client";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BoxReveal } from "../magicui/box-reveal";

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
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="gradient-bg" />
      <div className="tech-pattern absolute inset-0 opacity-50" />
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
                className="text-xl md:text-2xl text-muted-foreground mb-8"
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
                <Button
                  size="lg"
                  className="group"
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Projects
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Download CV
                </Button>
              </motion.div>
            </BoxReveal>

            <BoxReveal>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex space-x-6"
              >
                {[
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Mail, href: "#" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon size={24} />
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
            <BoxReveal>
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 from-primary/20 via-accent/20 to-secondary/20 rounded-full " />
                <Image
                  src="/assets/portrait2.jpg"
                  alt="Profile"
                  width={400}
                  height={400}
                  className="rounded-full  h-full border-4 border-primary/20"
                  priority
                />
              </div>
            </BoxReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
