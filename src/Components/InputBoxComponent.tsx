import React from "react";
import styled from "styled-components";

interface InputBoxProps {
  label: string;
  inputType: string;
  name?: any;
  onChange?: (e: any) => any;
}
const InputBox = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: balck;
    margin-bottom: 30px;
    border: none;
    box-shadow: 2px 2px 2px 2px gray inset;
    border-radius: 2pt;
    outline: none;
    background: white;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: black;
    pointer-events: none;
    transition: 0.2s;
  }
  input:focus ~ label,
  input:valid ~ label {
    top: -20px;
    left: 0;
    color: navy;
    font-size: 12px;
    font-weight: 700;
  }
`;

//쓸땐 form 태그 안에 넣자
const InputBoxComponent = ({
  label,
  inputType,
  name,
  onChange,
}: InputBoxProps) => {
  return (
    <InputBox>
      <input type={inputType} name={name} required onChange={onChange} />
      <label>{label}</label>
    </InputBox>
  );
};

export default InputBoxComponent;
