import React from "react";

const GPButton: React.FC<{
  onClick: () => void;
  children: string;
  className?: string;
}> = ({ onClick, children, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

export default GPButton;
