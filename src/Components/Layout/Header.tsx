import React, { useState, useEffect } from "react";
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
    font-family: "NanumSquareRoundR";
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

const Header = (props: any) => {
  const [login, setLogin] = useState("");
  const [loginLink, setLoginLink] = useState("");

  useEffect(() => {
    const sessionObj = window.sessionStorage.getItem("userInfo");
    let userInfo = sessionObj ? JSON.parse(sessionObj) : null;
    if (userInfo.accessToken === null) {
      setLogin("로그아웃");
      setLoginLink("/user/logout");
    } else {
      setLogin("로그인");
      setLoginLink("/user/login");
    }
  }, []);
  return (
    <Menu>
      <header className="header">
        <div className="contents">
          <a href="/">
            <div className="logo_font">MBTI</div>
          </a>
          <nav className="navigation">
            <ul className="menu">
              <li>
                <a href={loginLink}>{login}</a>
              </li>
              <li>
                <a href="/user/register">회원가입</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </Menu>
  );
};

export default Header;
