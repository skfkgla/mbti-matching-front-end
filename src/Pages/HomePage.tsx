import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import InputBoxComponent from "../Components/InputBoxComponent";
import styled from "styled-components";

const Home = (props: any) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return <Box sx={{ fontFamily: "NanumSquareRoundR", fontSize: 25 }}>HOME</Box>;
};

export default Home;
