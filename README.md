# Michael Stevens Solicitors Website

A professional law firm website built with Next.js, TypeScript, Tailwind CSS, and Sanity.io CMS.

## Features

- **Modern Design**: Professional, trustworthy design suitable for a law firm
- **Content Management**: Full Sanity.io CMS integration for easy content updates
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Built with Next.js for optimal performance and SEO
- **Accessibility**: WCAG compliant design with proper semantic HTML
- **Contact Forms**: Professional contact forms with validation
- **Practice Areas**: Comprehensive service pages for different legal specialties

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **State Management**: Zustand
- **Icons**: Lucide React
- **Deployment**: Static export ready

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd michael-stevens-solicitors
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Sanity.io**
   - Create a new Sanity project at [sanity.io](https://sanity.io)
   - Copy your project ID and dataset name
   - Create a `.env.local` file and add your Sanity credentials:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
     NEXT_PUBLIC_SANITY_DATASET=production
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Sanity CMS Setup

To manage content through Sanity CMS:

1. Set up your Sanity project with the appropriate schemas
2. Create content for services, team members, and blog posts
3. The website will automatically fetch and display your content

## Customization

- **Colors**: Modify the color scheme in `tailwind.config.ts`
- **Content**: Update content through Sanity CMS or modify components directly
- **Layout**: Customize components in the `/components` directory
- **Pages**: Add new pages in the `/app` directory

## Content Types

The website supports these content types through Sanity:

- **Services**: Practice areas and legal services
- **Team Members**: Lawyer profiles and information
- **Blog Posts**: News and legal updates
- **Page Content**: General page content and copy

## Deployment

This project is configured for static export:

```bash
npm run build
```

The built files will be in the `out` directory, ready for deployment to any static hosting service.

## License

© 2024 Michael Stevens Solicitors. All rights reserved.