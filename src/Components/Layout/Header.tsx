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
    background-color: white;
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
    font-size: 25pt;
    background: linear-gradient(to right top, #861657, #ffa69e);
    color: transparent;
    -webkit-background-clip: text;
    font-family: "OKDDUNG";
  }
`;

const Header = () => {
  return (
    <Menu>
      <header className="header">
        <div className="contents">
          <a href="/">
            <div className="logo_font">MBTI</div>
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
