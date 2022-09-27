import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});

interface State {
  email: string;
  password: string;
  loading: boolean;
  showPassword: boolean;
}

const Login = (props: any) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    showPassword: false,
  });

  const onClickLogin = () => {
    setValues({ ...values, loading: true });
    axios
      .post(
        "https://localhost:8080/user/login",
        { email: values.email, password: values.password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response: any) => {
        setValues({ ...values, loading: false });
        const accessToken = response.data.list.accessToken;
        const refreshToken = response.data.list.refreshToken;
        const userInfo = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        props.history.push("/");
      })
      .catch((error) => {
        if (error.response) {
          setValues({ ...values, loading: false });
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
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
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
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="text"
                sx={{ fontSize: 14 }}
                value={values.email}
                onChange={handleChange("email")}
                label="email"
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
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                sx={{ fontSize: 14 }}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ m: 0.1 }}
                    >
                      {values.showPassword ? (
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
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              style={{ fontSize: "2rem" }}
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickLogin}
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
