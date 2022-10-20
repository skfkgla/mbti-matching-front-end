import React, { useEffect, useState, useCallback } from "react";
// import { ChatComponent } from "../components/ChatComponent";
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
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const theme = createTheme({});

export type message = {
  email: string;
  context: string;
  roomId: string;
};

let sockJS = new SockJS("http://localhost:8080/ws");
let stompClient = Stomp.over(sockJS);

stompClient.debug = () => {};

const Chat = (props: any) => {
  const [contexts, setContexts] = React.useState<message[]>([]);
  const [context, setContext] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [roomId, setRoomId] = React.useState("");

  const handleSubscribe = stompClient.connect({}, () => {
    console.log("/sub/client/" + roomId);
    stompClient.subscribe("/sub/client/" + roomId, (messageDto) => {
      const newMessage: message = JSON.parse(messageDto.body);
      addMessage(newMessage);
    });
  });

  const handleEnter = (email: string, context: string, roomId: string) => {
    const newMessage: message = {
      email,
      context,
      roomId,
    };
    stompClient.send(
      "/pub/room/" + newMessage.roomId,
      {},
      JSON.stringify(newMessage)
    );
  };
  const addMessage = (message: message) => {
    setContexts((prev) => [...prev, message]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            />
          </FormControl>
          <FormControl
            sx={{ mt: 1 }}
            variant="outlined"
            fullWidth
            required
            color="success"
          >
            <InputLabel
              sx={{ fontSize: 13 }}
              htmlFor="outlined-adornment-roomId"
            >
              방 번호
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-roomId"
              type="text"
              sx={{ fontSize: 14 }}
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              label="방 번호"
            />
          </FormControl>
          <FormControl
            sx={{ mt: 1 }}
            variant="outlined"
            fullWidth
            required
            color="success"
          >
            <InputLabel
              sx={{ fontSize: 13 }}
              htmlFor="outlined-adornment-context"
            >
              채팅 내용
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-context"
              type="text"
              sx={{ fontSize: 14 }}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              label="채팅 내용"
            />
          </FormControl>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="success"
          style={{ fontSize: "2rem" }}
          sx={{ mt: 3, mb: 2 }}
          onClick={() => handleSubscribe()}
          type="button"
        >
          구독하기
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="success"
          style={{ fontSize: "2rem" }}
          sx={{ mt: 3, mb: 2 }}
          onClick={() => handleEnter(email, context, roomId)}
          type="button"
        >
          보내기
        </Button>
        <div>
          {contexts.map((msg, index) => (
            <div key={index}>
              {msg.context} : {msg.email}
            </div>
          ))}
        </div>
      </Container>
    </ThemeProvider>
  );
};
export default Chat;
