"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Briefcase, GraduationCap, Code } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const timelineItems = [
    {
      date: "2024 - Present",
      title: "Front-end Developer",
      subtitle: "Atomic Asher LLP",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Working on dynamic web applications using Next.js, Tailwind CSS, and React.js"
    },
    {
      date: "2024",
      title: "MCA",
      subtitle: "Mumbai University",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Master's in Computer Applications"
    },
    {
      date: "2021",
      title: "B.Sc. IT",
      subtitle: "Mumbai University",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Bachelor's in Information Technology"
    }
  ];

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <section id="about" ref={ref} className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4" ref={scrollRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About Me
          </h2>
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column - Sticky Image */}
            <motion.div
              className="lg:col-span-5 lg:sticky lg:top-8"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative group rounded-lg overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <motion.div 
                  className="relative aspect-square rounded-lg overflow-hidden"
                  style={{ 
                    scale: imageScale,
                    opacity: imageOpacity
                  }}
                >
                  <img
                    src="/assets/pngtree.png"
                    alt="Profile"
                    className="object-cover w-full h-full "
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Profile and Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Profile Card */}
              <motion.div 
                className="bg-card p-6 rounded-lg shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Profile</h3>
                <p className="text-muted-foreground mb-4">
                  Dynamic and motivated web developer with a strong foundation in
                  modern front-end technologies. Currently working at Atomic Asher
                  LLP, where I collaborate on dynamic web applications.
                </p>
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="text-sm">Front-end Developer</span>
                </div>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

                <div className="space-y-8">
                  {timelineItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                      className="relative pl-12"
                    >
                      <motion.div 
                        className="absolute left-0 p-2 bg-card rounded-full border-2 border-primary"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.div>

                      <motion.div 
                        className="bg-card p-4 rounded-lg shadow-lg"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-sm text-primary font-medium">
                          {item.date}
                        </span>
                        <h3 className="text-lg font-semibold mt-1">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.subtitle}
                        </p>
                        <p className="text-sm mt-2">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;