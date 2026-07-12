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
const AiChat           = dynamic(() => import("@/components/AiChat"),           { ssr: false });
const CursorTrail      = dynamic(() => import("@/components/CursorTrail"),      { ssr: false });
const ActivityFeed     = dynamic(() => import("@/components/ActivityFeed"),     { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Lenis smooth scroll — low lerp for "heavy IDE" feel
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        lerp: 0.07,
        smoothWheel: true,
        syncTouch: false,
      } as ConstructorParameters<typeof Lenis>[0]);

      // Wire GSAP ScrollTrigger to Lenis if available
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger);
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((time) => lenis.raf(time * 1000));
          gsap.ticker.lagSmoothing(0);
        }
      ).catch(() => {
        // Fallback: run Lenis without GSAP
        const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      });
    });
  }, []);

  if (!mounted) return null;
  if (loading) return <Loader onComplete={() => setLoading(false)} />;

  return (
    <>
      {/* z-0: fixed living syntax background */}
      <ScrollBackground />

      {/* Scan line overlay */}
      <div className="scan-line" />

      {/* z-9999: custom cursor */}
      <CustomCursor />

      {/* z-50: navbar */}
      <Navbar />

      {/* z-10: page sections */}
      <main style={{ position: "relative", zIndex: 10 }}>
        <HeroSection />
        <AboutSection />
        <TechStack />
        <BentoGrid />
        <ProjectsSection />
        <CertsSection />
        <ContactSection />
        <Footer />
      </main>
      <AiChat />
      <CursorTrail />
      <ActivityFeed />
    </>
  );
}
