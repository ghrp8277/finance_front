import React from "react";

type FooterProps = {
  children?: React.ReactNode;
};

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="p-1 bg-gray-300 text-white">
      <div className="container mx-auto">{children}</div>
    </footer>
  );
};

export default Footer;
