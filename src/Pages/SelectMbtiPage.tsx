import React, { useState, useCallback } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Menu, MenuItem } from "@mui/material";
//비밀번호 확인부터 하면 될 듯
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "2.5rem",
          width: 200,
          padding: 1,
          margin: 5,
          height: 50,
          borderRadius: 0,
          backgroundColor: "#2E7D32",
        },
      },
    },
  },
  typography: {
    fontFamily: ["JejuGothic"].join(","),
  },
});

const SelectMbti = (props: any) => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [gender, setGender] = useState("");
  const [mbti, setMbti] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [nickname, setNickName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //오류 메시지
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>(
    ""
  );
  const [emailMessage, setemailMessage] = useState<string>("");
  //유효성 검사
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false);
  const [isemail, setIsemail] = useState<boolean>(false);
  const mbtis = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    //외교형
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    //관리자형
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    //탐험가형
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ];
  const mbtiList = mbtis.map(function(mbti) {
    return (
      <MenuItem value={mbti} sx={{ fontSize: 14 }}>
        {mbti}
      </MenuItem>
    );
  });

  const onClickCheckId = () => {
    axios
      .get("http://localhost:8080/check/" + email)
      .then((response: any) => {
        // 성공 핸들링
        alert("사용할 수 있는 아이디입니다.");
        console.log(response.data);
      })
      .catch((error) => {
        // 에러 핸들링
        if (email.length == 0) {
          alert("아이디를 입력해주세요");
        } else {
          alert("중복된 아이디입니다.");
        }
      })
      .then(() => {
        //항상 실행되는 영역
      });
  };
  const onClickRegister = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:8080/register",
        {
          email: email,
          password: password,
          gender: gender,
          mbti: mbti,
          birth: birth,
          nickname: nickname,
        }, //나중에 Date 어떤식으로 요청할지 고민해서 birth추가하기
        { headers: { "Content-Type": "application/json" } }
      )

      .then((response: any) => {
        setLoading(false);
        navigate("/user/login", { replace: true });
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
            alert("중복된 아이디 입니다.");
          }
        } else if (error.request) {
          console.log(error.request);
          alert("요청이 이루어졌으나 응답을 받지 못했습니다");
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
        error.preventDefault();
      });
  };

  const handleChangeMbti = (e: SelectChangeEvent) => {
    setMbti(e.target.value as string);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" justify-content="center">
        <Box
          textAlign="center"
          sx={{
            p: 2,
            fontSize: "4rem",
            fontFamily: "JejuGothic",
          }}
        >
          대화해보고 싶은 MBTI를 선택해 주세요<br></br>
          <FormControl
            sx={{ mt: 2 }}
            variant="outlined"
            fullWidth
            required
            color="success"
          >
            <InputLabel id="MBTI" sx={{ fontSize: 13 }}>
              MBTI
            </InputLabel>
            <Select
              labelId="MBTI"
              id="MBTI"
              value={mbti}
              label="MBTI"
              onChange={handleChangeMbti}
              fullWidth
              sx={{ fontSize: 14 }}
            >
              {mbtiList}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            size="large"
            type="button"
          >
            선택 매칭 시작
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SelectMbti;
