import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const LayoutStyle = styled.div`
  .main {
    min-height: calc(100vh - 180px);
    background-color: "f4f4f4";
  }
`;

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <LayoutStyle>
      <div className="layout">
        <Header />
        <main className="main">{props.children}</main>
        <Footer />
      </div>
    </LayoutStyle>
  );
};

export default Layout;
