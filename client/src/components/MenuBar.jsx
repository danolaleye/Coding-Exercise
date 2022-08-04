import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["Overview", "Traffic", "Site Performance"];

const MenuBar = ({ onClick, activeTab }) => {
  const handleClick = (event) => {
    onClick(event.currentTarget.value);
  };

  return (
    <AppBar color="secondary" position="static">
      <Container maxWidth="xl">
        <Toolbar spacing={2}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignContent: "flex-start",
            }}
          >
            {pages.map((page) => (
              <Button
                variant="contained"
                color={activeTab === page ? "primary" : "button"}
                key={page}
                value={page}
                onClick={handleClick}
                sx={{
                  mr: 1.4,
                  mb: -3.4,
                  color: "white",
                  display: "block",
                  alignItems: "flex-end",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuBar;
