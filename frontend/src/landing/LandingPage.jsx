import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problems from "@/components/Problems";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import ContentGrid from "@/components/ContentGrid";
import LeadMagnet from "@/components/LeadMagnet";
import Offer from "@/components/Offer";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -76 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="bg-paper text-ink overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Problems />
        <Solution />
        <HowItWorks />
        <ContentGrid />
        <LeadMagnet />
        <Offer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
