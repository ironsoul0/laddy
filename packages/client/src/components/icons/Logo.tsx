import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <svg
    className={className}
    width="59"
    height="36"
    viewBox="0 0 82 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="4.67432"
      y="44.6696"
      width="71.7283"
      height="25.5396"
      rx="12.7698"
      fill="#F6BC45"
      fillOpacity="0.8"
    />
    <rect
      y="62.1185"
      width="71.7283"
      height="25.5396"
      rx="12.7698"
      transform="rotate(-60 0 62.1185)"
      fill="#5598D0"
      fillOpacity="0.8"
    />
    <rect
      x="45.4482"
      y="0.111633"
      width="71.7283"
      height="25.5396"
      rx="12.7698"
      transform="rotate(60 45.4482 0.111633)"
      fill="#D24245"
      fillOpacity="0.8"
    />
  </svg>
);

export default Logo;
