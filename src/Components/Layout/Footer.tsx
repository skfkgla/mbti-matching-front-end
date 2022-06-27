import React from "react";
import styled from "styled-components";

const FooterStyle = styled.div`
  .footer {
    height: 100px;
    margin-top: auto;
    background-color: white;
  }

  .contents {
    width: 96%;
    max-width: 1100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  .title {
    font-weight: 600;
    font-size: 20px;
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <footer className="footer">
        <div className="contents">
          <h2 className="styles.title">Do what you love</h2>
        </div>
      </footer>
    </FooterStyle>
  );
};

export default Footer;
