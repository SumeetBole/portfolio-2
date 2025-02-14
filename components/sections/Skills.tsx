"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Web", center: true },
  { name: "HTML", angle: 348, orbit: 2 },
  { name: "CSS", angle: 45, orbit: 3 },
  { name: "JavaScript", angle: 110, orbit: 2 },
  { name: "ReactJS", angle: 155, orbit: 4 },
  { name: "NextJS", angle: 195, orbit: 4 },
  { name: "Astro", angle: 180, orbit: 1 },
  { name: "TailwindCSS", angle: 225, orbit: 4 },
  { name: "Figma", angle: 270, orbit: 1 },
  { name: "Web Design", angle: 315, orbit: 4 },
  { name: "GitHub", angle: 10, orbit: 4 },
];

// Function to calculate elliptical positions
const getSkillPosition = (angle: number, radiusX: number, radiusY: number) => {
  const radian = (angle * Math.PI) / 180;
  return {
    x: radiusX * Math.cos(radian),
    y: radiusY * Math.sin(radian),
  };
};

const Skills = () => {
  const orbits = [80, 140, 200, 260, 320];

  // ✅ Ref for tracking visibility
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative flex flex-col items-center justify-center min-h-[80vh] 
        transition-colors duration-500 
        dark:bg-gray-900 bg-gray-100 dark:text-white text-black
      `}
    >
      <h2 className="text-5xl font-bold mb-8">Skills</h2>

      <div className="relative w-[800px] h-[400px] flex justify-center items-center">
        {/* Orbit Rings */}
        {orbits.map((radius, index) => (
          <div
            key={index}
            className="absolute border border-gray-600/50 rounded-full"
            style={{
              width: `${radius * 3}px`,
              height: `${radius * 1.3}px`, // Adjust height to form an ellipse
            }}
          />
        ))}

        {/* Skills */}
        {skills.map((skill, index) => {
          if (skill.center) {
            return (
              <motion.div
                key={index}
                className="absolute flex justify-center items-center w-24 h-24 bg-white text-black font-semibold rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                {skill.name}
              </motion.div>
            );
          }

          const radiusX = orbits[skill.orbit ?? 0] || 0;
          const radiusY = radiusX * 0.8; // Keep the ellipse ratio
          const angle = skill.angle ?? 0;
          const pos = getSkillPosition(angle, radiusX, radiusY);

          return (
            <motion.div
              key={index}
              className={`absolute flex justify-center items-center w-28 h-12 rounded-full shadow-lg 
                dark: bg-gradient-to-r from-primary via-secondary to-accent dark:text-black bg-black text-white
              `}
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
