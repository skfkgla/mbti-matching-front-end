import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import axios from "axios";
import InputBoxComponent from "../components/InputBoxComponent";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Home = (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        textAlign="center"
        sx={{
          p: 2,
          fontSize: "5rem",
          fontFamily: "JejuGothic",
        }}
      >
        MBTI를 미리 알고 사람과<br></br>
        대화를 해보면 어떨까?
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 20 }}
          minHeight={160}
          justifyContent="center"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          sx={{ fontSize: "16px" }}
        >
          <Grid display="flex" justifyContent="center" alignItems="center">
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              type="button"
            >
              랜덤 매칭
            </Button>
          </Grid>
          <Grid display="flex" justifyContent="center" alignItems="center">
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              type="button"
            >
              선택 매칭
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
