import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
// import ContactForm from '@/components/ContactForm';
import { getSiteSettings } from '@/lib/sanity';
import { Phone, Mail } from 'lucide-react';

export default async function Home() {
  const siteSettings = await getSiteSettings();
  const contactInfo = siteSettings?.contactInfo;
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Testimonials />
    </>
  );
}
