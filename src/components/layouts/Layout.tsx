import React, { ReactNode } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideHeader = false }) => {
  return (
    <div
      className="min-h-screen flex flex-col bg-black"
      style={{
        backgroundImage: "url(/rb.jpg)",
        backgroundSize: "cover", // 이미지가 div에 맞게 크기 조정
        backgroundPosition: "center", // 이미지의 중심을 div의 중심과 맞춤
        backgroundRepeat: "no-repeat", // 이미지 반복 방지
      }}
    >
      {!hideHeader && <Header />}
      <Content>{children}</Content>
      {/* <Footer> 추가 필요 시 활성화 */}
    </div>
  );
};

export default Layout;
