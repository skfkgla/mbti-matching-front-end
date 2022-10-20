import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import InputBoxComponent from "../components/InputBoxComponent";
import styled from "styled-components";

const UserHome = (props: any) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <Box sx={{ fontFamily: "NanumSquareRoundR", fontSize: 25 }}>USER HOME</Box>
  );
};

export default UserHome;
