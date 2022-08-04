import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import logo from "../assets/BNM_Logo_White.png";

export default function MetricAppBar() {
  return (
    <Box>
      <AppBar position="static" sx={{ p: 1.5 }}>
        <Box sx={{ textAlign: "center" }}>
          <img
            src={logo}
            alt={""}
            style={{
              width: "250px",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Box>
      </AppBar>
    </Box>
  );
}
