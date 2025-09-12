import React from 'react';

interface SRADigitalBadgeProps {
  /**
   * Maximum width of the badge container
   * @default "275px"
   */
  maxWidth?: string;
  /**
   * Maximum height of the badge container  
   * @default "163px"
   */
  maxHeight?: string;
  /**
   * Custom CSS classes for the outer container
   */
  className?: string;
}

const SRADigitalBadge: React.FC<SRADigitalBadgeProps> = ({
  maxWidth = "275px",
  maxHeight = "163px", 
  className = ""
}) => {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ maxWidth, maxHeight }}
    >
      {/* Responsive container with 59.1% aspect ratio */}
      <div className="relative w-full h-0 overflow-hidden" style={{ paddingBottom: '59.1%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0 m-0 p-0 bg-transparent"
          frameBorder="0"
          scrolling="no"
          allowTransparency={true}
          src="https://cdn.yoshki.com/iframe/55845r.html"
          title="SRA Digital Badge"
        />
      </div>
    </div>
  );
};

export default SRADigitalBadge;