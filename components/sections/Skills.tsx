"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Skills data
const skills = [
  { name: "Web", center: true },
  { name: "HTML", angle: 348, orbit: 2 },
  { name: "CSS", angle: 45, orbit: 3 },
  { name: "JavaScript", angle: 110, orbit: 2 },
  { name: "ReactJS", angle: 155, orbit: 4 },
  { name: "NextJS", angle: 195, orbit: 4 },
  { name: "Astro", angle: 180, orbit: 1 },
  { name: "Tailwind", angle: 225, orbit: 4 },
  { name: "Figma", angle: 270, orbit: 1 },
  { name: "Canva", angle: 315, orbit: 4 },
  { name: "GitHub", angle: 10, orbit: 4 },
];

// Function to calculate skill positions
const getSkillPosition = (angle: number, radiusX: number, radiusY: number) => {
  const radian = (angle * Math.PI) / 180;
  return {
    x: radiusX * Math.cos(radian),
    y: radiusY * Math.sin(radian),
  };
};

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Orbit sizes: Circular for mobile, elliptical for larger screens
  const orbits = isMobile ? [60, 100, 140, 180] : [80, 140, 200, 260, 320 ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // **For mobile, evenly distribute skills in orbit (excluding "Web")**
  const mobileSkills = skills.filter((s) => !s.center); // Exclude center skill
  const mobileAngles = mobileSkills.map((_, i) => (i * 360) / mobileSkills.length);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center  min-h-[60vh] lg:min-h-[100vh]  
        transition-colors duration-500  bg-gradient-to-b from-cyan-200  via-sky-100 to-blue-500 to-90%
    dark:bg-gradient-to-b dark:from-gray-900 from-10% dark:via-blue-900 dark:to-black "
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-24 md:mb-24 lg:mt-16">Skills</h2>

      <div
        className="relative flex justify-center items-center 
          w-[90vw] max-w-[350px] h-[350px] 
          md:max-w-[600px] md:h-[500px] 
          lg:w-[800px] lg:h-[400px] mb-64"
      >
        {/* Orbit Rings */}
        {orbits.map((radius, index) => (
          <div
            key={index}
            className="absolute border border-gray-600/50 rounded-full"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * (isMobile ? 2 : 1.3)}px`, // Circular for mobile
            }}
          />
        ))}

        {/* Center Skill (Only Web on Mobile) */}
        {skills
          .filter((skill) => skill.center)
          .map((skill, index) => (
            <motion.div
              key={index}
              className="absolute flex justify-center items-center 
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                bg-white text-black font-semibold rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {skill.name}
            </motion.div>
          ))}

        {/* Surrounding Skills */}
        {mobileSkills.map((skill, index) => {
          // Get the proper orbit for mobile and desktop
          const radiusX = isMobile ? orbits[2] : orbits[skill.orbit ?? 0] || 0;
          const radiusY = isMobile ? radiusX : radiusX * 0.8; // Circular on mobile

          // **For mobile, distribute angles evenly**
          const angle = isMobile ? mobileAngles[index] : skill.angle ?? 0;
          const pos = getSkillPosition(angle, radiusX, radiusY);

          return (
            <motion.div
              key={index}
              className="absolute flex justify-center items-center 
                w-20 h-8 sm:w-20 sm:h-10 md:w-28 md:h-12
                rounded-full shadow-lg dark:bg-gradient-to-r from-primary via-secondary to-accent 
                dark:text-black bg-black text-white text-sm md:text-base"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={isInView ? { scale: 1, x: pos.x, y: pos.y } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {skill.name}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
