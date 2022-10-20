import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});

const Login = (props: any) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onClickLogin = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:8080/login",
        { email: email, password: password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response: any) => {
        setLoading(false);
        const accessToken = response.data.list.accessToken;
        const refreshToken = response.data.list.refreshToken;
        const userInfo = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        console.log(userInfo);
        window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(email + " " + password);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === 400) {
            alert("아이디 비밀번호를 입력해주세요");
          }
          if (error.response.status === 404) {
            alert("해당 계정이 없음");
          }
          if (error.response.status === 401) {
            alert("승인나지 않은 계정입니다.");
          }
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
          alert("요청이 이루어졌으나 응답을 받지 못했습니다");
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
      });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
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
            로그인
          </Box>
          <Box component="form" sx={{ mt: 1 }}>
            <FormControl
              sx={{ mt: 1 }}
              variant="outlined"
              fullWidth
              required
              color="success"
            >
              <InputLabel
                sx={{ fontSize: 13 }}
                htmlFor="outlined-adornment-email"
              >
                아이디
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="text"
                sx={{ fontSize: 14 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="아이디"
                onKeyDown={onKeyDown}
              />
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
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={onKeyDown}
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
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="success"
              style={{ fontSize: "2rem" }}
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickLogin}
              type="button"
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  아이디 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
