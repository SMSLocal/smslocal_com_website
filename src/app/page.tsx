import TopBar from "@/components/home/TopBar";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Stats from "@/components/home/Stats";
import FeatureShowcase from "@/components/home/FeatureShowcase";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import ProcessSteps from "@/components/home/ProcessSteps";
import Audiences from "@/components/home/Audiences";
import Testimonials from "@/components/home/Testimonials";
import PricingTeaser from "@/components/home/PricingTeaser";
import CTABanner from "@/components/home/CTABanner";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Stats />
        <FeatureShowcase />
        <PlatformFeatures />
        <ProcessSteps />
        <Audiences />
        <Testimonials />
        <PricingTeaser />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
