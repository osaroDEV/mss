import Image from 'next/image';

interface SRADigitalBadgeProps {
  className?: string;
  badgeUrl?: string; // URL to the SRA badge image
  alt?: string;
}

export default function SRADigitalBadge({
  className = '',
  badgeUrl = 'https://cdn.yoshki.com/iframe/55845r.html', // Default path to your SRA badge image
  alt = 'SRA Digital Badge - Solicitors Regulation Authority',
}: SRADigitalBadgeProps) {
  return (
    <div className={`max-w-[275px] max-h-[163px] ${className}`}>
      <div className='relative pb-[59.1%] h-auto overflow-hidden'>
        <Image
          src={badgeUrl}
          alt={alt}
          fill
          className='object-contain'
          sizes='(max-width: 275px) 100vw, 275px'
        />
      </div>
    </div>
  );
}
