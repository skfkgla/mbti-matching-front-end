import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.div`
  .header {
    position: top;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #f4f4f4;
  }

  .contents {
    display: flex;
    width: 96%;
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
  }

  .navigation {
    ul {
      display: flex;
      list-style: none;

      li + li {
        margin-left: 30px;
      }
    }
  }
  .menu {
    font-size: 13pt;
    font-family: "EarlyFontDiary";
  }
  .logo_font {
    display: flex;
  }
  .logo_font1 {
    font-size: 25pt;
    color: red;
    font-family: "OKDDUNG";
  }
  .logo_font2 {
    font-size: 25pt;
    font-family: "OKDDUNG";
    color: blue;
  }
  .logo_font3 {
    font-size: 25pt;
    font-family: "OKDDUNG";
    color: green;
  }
  .logo_font4 {
    font-size: 25pt;
    font-family: "OKDDUNG";
    color: orange;
  }
`;

const Header = () => {
  return (
    <Menu>
      <header className="header">
        <div className="contents">
          <a href="/">
            <div className="logo_font">
              <div className="logo_font1">M</div>
              <div className="logo_font2">B</div>
              <div className="logo_font3">T</div>
              <div className="logo_font4">I</div>
            </div>
          </a>
          <nav className="navigation">
            <ul className="menu">
              <li>로그인</li>
              <li>회원가입</li>
            </ul>
          </nav>
        </div>
      </header>
    </Menu>
  );
};

export default Header;
