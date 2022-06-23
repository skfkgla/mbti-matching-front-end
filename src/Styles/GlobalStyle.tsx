import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import OKDDUNG from "./fonts/OKDDUNG.ttf";
import EarlyFontDiary from "./fonts/EarlyFontDiary.ttf";
import SDSamliphopangcheTTFOutline from "./fonts/SDSamliphopangcheTTFOutline.ttf";

//Styled-Components 초기설정
//reset으로 css 초기화,
//createGlobalStyle: styled-components에서 제공하는 모든 tag에 스타일을 적용할 수 있는 라이브러리
const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    html{
        font-size:10px; // rem사이즈 지정
        height: 100%;
        background: white;
    }
    body{
        background-color: #ffffff;
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        height: 100%;
    }
    #root {
        height: 100%;
    }
    a{
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
    input, button{
        background-color: transparent;
        border: none;
        outline: none;
    }
    h1,h2,h3,h4,h5,h6{
        font-family:"Maven Pro", sans-serif;
    }
    ol,ul,li{
        list-style: none;
    }
    img{
        display: block;
        width:100%;
        height:100%;
    }
    @font-face {
    font-family: 'OKDDUNG';
    src: url(${OKDDUNG}) format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'EarlyFontDiary';
    src: url(${EarlyFontDiary}) format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'SDSamliphopangche_Outline';
    src: url(${SDSamliphopangcheTTFOutline}) format('truetype');
    font-weight: normal;
    font-style: normal;
}
`;

export default GlobalStyle;
