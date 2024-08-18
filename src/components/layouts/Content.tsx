import React from "react";

type ContentProps = {
  children?: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="mt-[60px] overflow-hidden">
      <div className="container mx-auto">{children}</div>
    </main>
  );
};

export default Content;
