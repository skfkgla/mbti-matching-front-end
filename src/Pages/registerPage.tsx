import React, { useState, useCallback } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import axios from "axios";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
//비밀번호 확인부터 하면 될 듯
const theme = createTheme({});

const Register = (props: any) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
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
  const [confirmPasswordMessage, setConfirmPasswordMessage] =
    useState<string>("");
  const [userIdMessage, setUserIdMessage] = useState<string>("");
  //유효성 검사
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false);
  const [isUserId, setIsUserId] = useState<boolean>(false);
  const MbtiList = [
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
  const onClickRegister = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:8080/user/register",
        {
          userId: userId,
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

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요"
        );
        setIsPassword(false);
      } else {
        setPasswordMessage("안전한 비밀번호입니다.");
        setIsPassword(true);
      }
    },
    []
  );
  const onChangeUserId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const userIdRegex = /^[a-z]+[a-z0-9]{5,19}$/g;
      const userIdCurrent = e.target.value;
      setUserId(userIdCurrent);
      if (!userIdRegex.test(userIdCurrent)) {
        setUserIdMessage("영문자를 사용해주세요.");
        setIsPassword(false);
      } else {
        setUserIdMessage("");
        setIsPassword(true);
      }
    },
    []
  );
  const onChangeConfirmPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const ConfirmPasswordCurrent = e.target.value;
      setConfirmPassword(ConfirmPasswordCurrent);

      if (password === ConfirmPasswordCurrent) {
        setConfirmPasswordMessage("비밀번호가 같습니다");
        setIsConfirmPassword(true);
      } else {
        setConfirmPasswordMessage("비밀번호가 다릅니다");
        setIsConfirmPassword(false);
      }
    },
    [password]
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontFamily: "NanumSquareRoundR", fontSize: 25 }}>
            회원가입
          </Box>
          <Box component="form" sx={{ mt: 1 }}>
            <FormControl variant="outlined" fullWidth required color="success">
              <Stack direction="row">
                <Grid container spacing={1}>
                  <InputLabel
                    sx={{ fontSize: 13 }}
                    htmlFor="outlined-adornment-userId"
                  >
                    아이디
                  </InputLabel>
                  <Grid item xs={9}>
                    <OutlinedInput
                      id="outlined-adornment-userId"
                      type="text"
                      sx={{ fontSize: 14 }}
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      label="아이디"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 1, fontSize: 14, flexDirection: "row-reverse" }}
                      fullWidth
                    >
                      중복확인
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </FormControl>
            <FormControl
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              required
              color="success"
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ fontSize: 13 }}
              >
                비밀번호
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                sx={{ fontSize: 14 }}
                value={password}
                onChange={onChangePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ m: 0.1 }}
                    >
                      {showPassword ? (
                        <VisibilityOff style={{ fontSize: "3rem" }} />
                      ) : (
                        <Visibility style={{ fontSize: "3rem" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="비밀번호"
              />
              {password.length > 0 && (
                <span className={`message ${isPassword ? "success" : "error"}`}>
                  {passwordMessage}
                </span>
              )}
            </FormControl>
            <FormControl
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              required
              color="success"
            >
              <InputLabel
                htmlFor="outlined-adornment-confirm-password"
                sx={{ fontSize: 13 }}
              >
                비밀번호확인
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type="password"
                sx={{ fontSize: 14 }}
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                label="비밀번호확인"
              />
              {confirmPassword.length > 0 && (
                <span
                  className={`message ${
                    isConfirmPassword ? "success" : "error"
                  }`}
                >
                  {confirmPasswordMessage}
                </span>
              )}
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="success"
              style={{ fontSize: "2rem" }}
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickRegister}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
