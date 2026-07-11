"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import everything to avoid SSR issues with Three.js / Framer Motion
const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
const BentoGrid = dynamic(() => import("@/components/BentoGrid"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), { ssr: false });
const CertsSection = dynamic(() => import("@/components/CertsSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth scroll — dynamically imported to avoid SSR
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.08, smoothWheel: true } as ConstructorParameters<typeof Lenis>[0]);
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    });
  }, []);

  if (!mounted) return null;
  if (loading) return <Loader onComplete={() => setLoading(false)} />;

  return (
    <main className="relative bg-obsidian overflow-hidden">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BentoGrid />
      <ProjectsSection />
      <CertsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
