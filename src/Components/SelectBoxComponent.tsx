import React from "react";
import styled from "styled-components";
import { FormControl } from "react-bootstrap";

interface SelectBoxProps {
  label: string;
  inputType: string;
  name?: any;
  onChange?: (e: any) => any;
}
const SelectBox = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 8px 0;
    font-size: 14px;
    margin-bottom: 20px;
  }

  label {
    position: absolute;
    top: 0;
    left: 5px;
    padding: 10px 0;
    font-size: 14px;
    color: gray;
    pointer-events: none;
    transition: 0.2s;
  }
  input:focus ~ label,
  input:valid ~ label {
    top: -23px;
    left: 0;
    color: navy;
    font-size: 12px;
    font-weight: 700;
  }
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
`;
//쓸땐 form 태그 안에 넣자
const SelectBoxComponent = ({
  label,
  inputType,
  name,
  onChange,
}: SelectBoxProps) => {
  return (
    <SelectBox>
      <form>
        <FormControl type={inputType} name={name} onChange={onChange} />
        <label>{label}</label>
      </form>
    </SelectBox>
  );
};
