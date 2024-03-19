import React, { useState } from "react";
import { Toolbar, Box } from "@mui/material";
import LogoutButton from "./LogoutButton";
import '../assets/css/Header.css';

const Header = () => {
  const [keycloak] = useState(null);

  return (
    <React.Fragment>
      <Toolbar style={{ backgroundColor: "#d7d7d7" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img 
              src={require('../assets/img/logo.png')} 
              alt="logofod" 
              style={{ maxWidth: "150px", maxHeight: "150px", marginRight: "5em" }} 
            />
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex" }}>
              <li className="nav-link" style={{ marginRight: "2em" }}>
                <a href="/">Acceuil</a>
              </li>
              <li className="nav-link" style={{ marginRight: "2em" }}>
                <a href="/">Services</a>
              </li>
              <li className="nav-link" style={{ marginRight: "2em" }}>
                <a href="/">Nouveautés</a>
              </li>
              <li className="nav-link">
                <a href="/">Réunions</a>
              </li>
            </ul>
          </Box>
          <Box>
            <LogoutButton keycloak={keycloak} />
          </Box>
        </Box>
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
