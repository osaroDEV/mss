import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import { getSiteSettings } from '@/lib/sanity';

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  
  return {
    title: siteSettings?.seo?.metaTitle || siteSettings?.title || "Michael Stevens Solicitors - Expert Legal Services in London",
    description: siteSettings?.seo?.metaDescription || siteSettings?.description || "Professional legal services in immigration law, employment law, family law, wills and probate law, and family law.",
    openGraph: {
      title: siteSettings?.seo?.metaTitle || siteSettings?.title || "Michael Stevens Solicitors",
      description: siteSettings?.seo?.metaDescription || siteSettings?.description,
      url: '/',
      type: 'website',
    },
    alternates: {
      canonical: '/',
    },
  }
}

export default async function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Testimonials />
    </>
  );
}
