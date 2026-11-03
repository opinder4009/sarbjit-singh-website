import Hero from '@/components/Hero';
import About from '@/components/About';
import StatTicker from '@/components/StatTicker';
import CloseProcess from '@/components/CloseProcess';
import Specialties from '@/components/Specialties';
import LoyaltyProgram from '@/components/LoyaltyProgram';
import Faq from '@/components/Faq';
import Reviews from '@/components/Reviews';
import PullQuote from '@/components/PullQuote';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <StatTicker />
      <CloseProcess />
      <Specialties />
      <LoyaltyProgram />
      <Faq />
      <Reviews />
      <PullQuote />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
