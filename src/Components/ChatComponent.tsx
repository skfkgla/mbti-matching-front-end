import * as React from "react";
import { Button, Input } from "antd";
import { message } from "../pages/ChatPage";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
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

// const theme = createTheme({});

// type ChatComponentProps = {
//   contexts: Array<message>;
//   message: string;
//   email: string;
//   roomId: string;
//   setRoomId: Function;
//   setMessage: Function;
//   setEmail: Function;
//   handleEnter: Function;
// };

// export const ChatComponent = ({
//   contexts,
//   message,
//   email,
//   roomId,
//   setRoomId,
//   setMessage,
//   setEmail,
//   handleEnter,
// }: ChatComponentProps) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <div className={"chat-box"}>
//         <Box sx={{ fontFamily: "NanumSquareRoundR", fontSize: 25 }}>
//           유저이름
//         </Box>
//         <FormControl
//           sx={{ mt: 1 }}
//           variant="outlined"
//           fullWidth
//           required
//           color="success"
//         >
//           <InputLabel sx={{ fontSize: 13 }}>이메일</InputLabel>
//           <OutlinedInput
//             type="text"
//             sx={{ fontSize: 14 }}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             label="이메일"
//           />
//         </FormControl>
//         <FormControl
//           sx={{ mt: 1 }}
//           variant="outlined"
//           fullWidth
//           required
//           color="success"
//         >
//           <InputLabel sx={{ fontSize: 13 }}>방 아이디</InputLabel>
//           <OutlinedInput
//             type="text"
//             sx={{ fontSize: 14 }}
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             label="방 아이디"
//           />
//         </FormControl>
//       </div>
//       <FormControl>
//         <div className={"contexts"}>
//           {contexts.map((message) => (
//             <div>
//               {message.roomId} : {message.context}
//             </div>
//           ))}
//         </div>
//       </FormControl>
//       <div>
//         <Input.Search
//           placeholder="input your messages..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onSearch={(value) => handleEnter(roomId, value)}
//           enterButton={"Enter"}
//         />
//       </div>
//     </ThemeProvider>
//   );
// };
