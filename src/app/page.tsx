import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Stats from "@/components/home/Stats";
import AppShowcase from "@/components/home/AppShowcase";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import ProcessSteps from "@/components/home/ProcessSteps";
import Audiences from "@/components/home/Audiences";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";
import Reveal from "@/components/home/Reveal";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        {/* Hero stays static (above the fold) — sections below reveal on scroll */}
        <Hero />
        <Reveal>
          <TrustBar />
        </Reveal>
        <Reveal>
          <Stats />
        </Reveal>
        <Reveal>
          <AppShowcase />
        </Reveal>
        <Reveal>
          <PlatformFeatures />
        </Reveal>
        <Reveal>
          <ProcessSteps />
        </Reveal>
        <Reveal>
          <Audiences />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <CTABanner />
        </Reveal>
        <Reveal>
          <FAQ />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
