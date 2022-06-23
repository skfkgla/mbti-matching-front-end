import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBoxComponent from "../Components/InputBoxComponent";
import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TotalWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  vertical-align: center;
  justify-content: center;
  align-items: center;
  .box-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .box-wrapper span {
    color: black;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 10px;
  }
  .box-inner {
    background-color: #fff480;
    width: 450px;
    height: 500px;
    border-radius: 10px;
    padding: 20px;
  }
`;
const RegisterButton = styled.button`
  background-color: #354076;
  color: white;
  width: 100%;
  height: 30px;
  border-radius: 10px;
`;

const Register = (props: any) => {
  let navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const onClickRegister = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:8080/user/register",
        { userId: userId, password: password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response: any) => {
        setLoading(false);
        navigate("/", { replace: true });
      })

      .catch((error) => {
        if (error.response) {
          setLoading(false);
          // 요청을 했지만 응답코드가 200대를 벗어남
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === 400) {
            alert("정보를 입력해주세요");
          }
          if (error.response.status === 403) {
            alert("잘못된 요청");
          }
        } else if (error.request) {
          console.log(error.request);
          alert("요청이 이루어졌으나 응답을 받지 못했습니다");
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
      });
  };
  return (
    <TotalWrapper>
      <div className="box-wrapper">
        <span>회원가입</span>
        <div className="box-inner">
          <InputBoxComponent
            label="userId"
            inputType="text"
            name="userId"
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
          <InputBoxComponent
            label="password"
            inputType="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <RegisterButton onClick={onClickRegister}>
            {loading ? <AiOutlineLoading3Quarters /> : "등록"}
          </RegisterButton>
        </div>
      </div>
    </TotalWrapper>
  );
};

export default Register;
