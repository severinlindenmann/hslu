import React from "react";
import { Paper } from "@mui/material";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

const WelcomePage = () => {
  return (
    <>
      <StyledPaper>
        <h1>Welcome Page</h1>
        <p>You can use the menu left to check out some projects</p>
      </StyledPaper>
      <Alert severity="info">
        most of the sides are not mobil optimized, try to check it out on a
        bigger screen
      </Alert>
    </>
  );
};

export default WelcomePage;
