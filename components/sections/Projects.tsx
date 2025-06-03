"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const projects = [
  {
    title: "Atomic AI",
    description: "An AI-driven web application providing innovative solutions.",
    image: "/assets/stock-5.avif",
    technologies: ["Next.js", "Tailwind CSS", "Appwrite"],
    liveUrl: "https://ai.atomicasher.com",
    githubUrl: "#",
  },
  {
    title: "Passages to India",
    description: "A cultural and historical exploration platform.",
    image: "/assets/stock-6.avif",
    technologies: ["Astro", "Tailwind CSS"],
    liveUrl: "https://passagestoindia.netlify.app",
    githubUrl: "#",
  },
  {
    title: "LYS Saloon",
    description: "Salon and spa services website with elegant design.",
    image: "/assets/stock-7.avif",
    technologies: ["Astro", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-20 bg-gradient-to-b from-blue-500  via-sky-400 to-cyan-300 dark:from-black  dark:via-black dark:to-gray-900 to-70% ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center "
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground">Some of my recent work</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {projects.map((project, index) => (
            <CardContainer key={index} className="group">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-sky-500/[0.2] dark:bg-gray-900 dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="90"
                  className="relative aspect-video overflow-hidden rounded-lg"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500} 
                    height={300}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </CardItem>
                <div className="p-6">
                  <CardItem translateZ="50">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                  </CardItem>
                  <CardItem translateZ="40">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {tech}
                          
                        </span>
                      ))}
                    </div>
                  </CardItem>
                  <CardItem translateZ="30">
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={16} />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
