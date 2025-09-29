import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const logoUrl = 'https://ik.imagekit.io/to9u5y1ao/logo%20oficial%20Risk%20Manager%20X%20-%20Copia.png?updatedAt=1758933521787';

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" aria-label="RiskManagerX Home">
      <img 
        src={logoUrl} 
        alt="RiskManagerX Logo" 
        className={`h-9 w-auto ${className}`}
      />
    </Link>
  );
};
