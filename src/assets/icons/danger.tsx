import React from 'react';

export const DangerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" {...props}>
    <circle cx="12" cy="12" r="10" fill={props.fill} />
    <path
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4m0 4h.01"
    />
  </svg>
);
