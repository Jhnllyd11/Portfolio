"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Loader           = dynamic(() => import("@/components/Loader"),           { ssr: false });
const CustomCursor     = dynamic(() => import("@/components/CustomCursor"),     { ssr: false });
const ScrollBackground = dynamic(() => import("@/components/ScrollBackground"), { ssr: false });
const Navbar           = dynamic(() => import("@/components/Navbar"),           { ssr: false });
const HeroSection      = dynamic(() => import("@/components/HeroSection"),      { ssr: false });
const AboutSection     = dynamic(() => import("@/components/AboutSection"),     { ssr: false });
const TechStack        = dynamic(() => import("@/components/TechStack"),        { ssr: false });
const BentoGrid        = dynamic(() => import("@/components/BentoGrid"),        { ssr: false });
const ProjectsSection  = dynamic(() => import("@/components/ProjectsSection"),  { ssr: false });
const CertsSection     = dynamic(() => import("@/components/CertsSection"),     { ssr: false });
const ContactSection   = dynamic(() => import("@/components/ContactSection"),   { ssr: false });
const Footer           = dynamic(() => import("@/components/Footer"),           { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      {/* Fixed animated scroll-reactive background — sits behind everything */}
      <ScrollBackground />

      <CustomCursor />
      <Navbar />

      {/* All sections sit above the background canvas */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStack />
        <BentoGrid />
        <ProjectsSection />
        <CertsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
