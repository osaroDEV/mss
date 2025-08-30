import type React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client } from '@/lib/sanity';
import type { Metadata } from 'next';
import { urlFor } from '@/lib/sanity-image';

// Define the types for our Sanity data
interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  shortDescription: string;
  detailedDescription: any[]; // Rich text blocks from Sanity
  icon: string;
  features: string[];
  benefits?: string[];
  processSteps?: ProcessStep[];
  featured: boolean;
  order: number;
  category?: string; // Added for breadcrumb
}

// Create a proper icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Building2: LucideIcons.Building2,
  Users: LucideIcons.Users,
  Home: LucideIcons.Home,
  Skull: LucideIcons.Skull,
  Heart: LucideIcons.Heart,
  FileText: LucideIcons.FileText,
  Briefcase: LucideIcons.Briefcase,
  Scale: LucideIcons.Scale,
  Plane: LucideIcons.Plane,
  UsersRound: LucideIcons.UsersRound,
  Wrench: LucideIcons.Wrench,
  Globe: LucideIcons.Globe,
  Shield: LucideIcons.Shield,
  Gavel: LucideIcons.Gavel,
  BookOpen: LucideIcons.BookOpen,
  Banknote: LucideIcons.Banknote,
  TrendingUp: LucideIcons.TrendingUp,
};

// Function to get the Lucide icon component by name
function getIconComponent(iconName: string) {
  if (!iconName) {
    return LucideIcons.Briefcase;
  }
  if (iconMap[iconName]) {
    return iconMap[iconName];
  }
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent && typeof IconComponent === 'function') {
    return IconComponent;
  }
  return LucideIcons.Briefcase;
}

// Portable Text components for rich text rendering
const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className='text-2xl md:text-3xl font-bold text-primary-800 mt-8 mb-4'>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className='text-xl md:text-2xl font-semibold text-primary-700 mt-6 mb-3'>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className='text-lg md:text-xl font-semibold text-primary-700 mt-4 mb-2'>
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className='text-neutral-600 mb-4 leading-relaxed'>{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className='border-l-4 border-gold-500 pl-4 italic text-neutral-700 my-6 bg-neutral-50 py-2'>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className='list-disc list-inside space-y-2 mb-4 text-neutral-600'>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className='list-decimal list-inside space-y-2 mb-4 text-neutral-600'>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className='ml-2'>{children}</li>,
    number: ({ children }: any) => <li className='ml-2'>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className='font-semibold text-primary-800'>{children}</strong>
    ),
    em: ({ children }: any) => <em className='italic'>{children}</em>,
    code: ({ children }: any) => (
      <code className='bg-neutral-100 text-primary-700 px-1 py-0.5 rounded text-sm font-mono'>
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className='text-primary-700 hover:text-primary-800 underline transition-colors'
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    ),
  },
};

async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  heroImage {
    asset,
    alt
  },
  shortDescription,
  detailedDescription,
  icon,
  features,
  benefits,
  processSteps[] {
    step,
    title,
    description
  },
  featured,
  order,
  category
}`;
  try {
    const service = await client.fetch(query, { slug });
    return service || null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }
  return {
    title: `${service.title} | Legal Services`,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      type: 'website',
    },
  };
}

// Generate static params for all services
export async function generateStaticParams() {
  const query = `*[_type == "service"] {
    "slug": slug.current
  }`;
  try {
    const services = await client.fetch(query);
    return services.map((service: { slug: string }) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Helper function to split title for two-tone effect
function splitTitle(title: string): { firstPart: string; secondPart: string } {
  const words = title.split(' ');
  if (words.length <= 2) {
    return { firstPart: words[0] || '', secondPart: words.slice(1).join(' ') };
  }
  const midPoint = Math.ceil(words.length / 2);
  return {
    firstPart: words.slice(0, midPoint).join(' '),
    secondPart: words.slice(midPoint).join(' '),
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const IconComponent = getIconComponent(service.icon);
  const { firstPart, secondPart } = splitTitle(service.title);

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section with Background Image */}
      <div className='relative min-h-[60vh] lg:min-h-[70vh] flex items-center'>
        {/* Background Image */}
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: service.heroImage
              ? `url(${urlFor(service.heroImage)
                  .width(1920)
                  .height(1080)
                  .url()})`
              : `url('/placeholder.svg?height=800&width=1200')`,
          }}
        >
          {/* Dark Overlay */}
          <div className='absolute inset-0 bg-black/60'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
          {/* Breadcrumb Navigation */}
          <nav className='flex items-center space-x-2 text-sm mb-8'>
            <Link
              href='/'
              className='text-white/80 hover:text-white transition-colors'
            >
              Home
            </Link>
            <ChevronRight className='h-4 w-4 text-white/60' />
            <Link
              href='/services'
              className='text-white/80 hover:text-white transition-colors'
            >
              Services
            </Link>
          </nav>

          {/* Hero Content */}
          <div className='max-w-4xl'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-tight mb-6'>
              {service.title}
            </h1>

            <p className='text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mb-8'>
              {service.shortDescription}
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                href='/contact'
                className='inline-flex items-center justify-center bg-gold-600 hover:bg-gold-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 group'
              >
                Get Expert Advice
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Link>
              <Link
                href='#details'
                className='inline-flex items-center justify-center border-2 border-white/30 hover:border-white/50 text-white font-semibold py-4 px-8 rounded-lg transition-colors backdrop-blur-sm'
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        id='details'
        className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'
      >
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Main Content Column */}
          <div className='lg:col-span-2'>
            {/* Service Icon and Title */}
            <div className='flex items-center gap-4 mb-8'>
              {/* <div className='bg-primary-100 rounded-xl p-3 flex-shrink-0'>
                <IconComponent className='h-8 w-8 text-primary-700' />
              </div> */}
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Service Overview
                </h2>
                {service.featured && (
                  <span className='inline-block bg-gold-500 text-white text-xs font-semibold px-2 py-1 rounded-full mt-1'>
                    Featured Service
                  </span>
                )}
              </div>
            </div>

            {/* Detailed Description */}
            {service.detailedDescription &&
              service.detailedDescription.length > 0 && (
                <div className='prose prose-lg max-w-none mb-12 text-lg md:text-2xl'>
                  <PortableText
                    value={service.detailedDescription}
                    components={portableTextComponents}
                  />
                </div>
              )}

            {/* Process Steps */}
            {service.processSteps && service.processSteps.length > 0 && (
              <div className='mb-12'>
                <h2 className='text-2xl md:text-3xl font-bold text-primary-800 mb-8'>
                  Our Process
                </h2>
                <div className='space-y-6'>
                  {service.processSteps
                    .sort((a, b) => a.step - b.step)
                    .map((step, index) => (
                      <div key={index} className='flex gap-4'>
                        <div className='flex-shrink-0'>
                          <div className='w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-semibold'>
                            {step.step}
                          </div>
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-lg font-semibold text-primary-800 mb-2'>
                            {step.title}
                          </h3>
                          <p className='text-neutral-600 leading-relaxed'>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8 space-y-8'>
              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <div className='bg-neutral-50 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-primary-800 mb-4'>
                    We assist with
                  </h3>
                  <ul className='space-y-3'>
                    {service.features.map((feature, index) => (
                      <li key={index} className='flex items-start gap-3'>
                        <CheckCircle className='h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5' />
                        <span className='text-neutral-600'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className='bg-teal-50 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-primary-800 mb-4'>
                    Benefits
                  </h3>
                  <ul className='space-y-3'>
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className='flex items-start gap-3'>
                        <ArrowRight className='h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5' />
                        <span className='text-neutral-600'>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact CTA  */}
              <div className='bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200 rounded-lg p-6'>
                <h3 className='text-lg font-semibold text-primary-800 mb-3'>
                  Need Expert Advice?
                </h3>
                <p className='text-neutral-600 mb-4'>
                  Contact our experienced team of solicitors for a consultation about your{' '}
                  {service.title.toLowerCase()} needs.
                </p>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center w-full bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-4 rounded-lg transition-colors'
                >
                  Get In Touch
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
