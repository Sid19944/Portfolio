import React from "react";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

function BackToDashboard() {
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-end mb-3">
      <Button variant="contained" onClick={back}>
        <DashboardIcon /> <ArrowBackIcon />
        Back to Dashboard
      </Button>
    </div>
  );
}

export default BackToDashboard;
