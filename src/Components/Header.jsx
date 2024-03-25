import React, { useState } from "react";
import { Toolbar, Box } from "@mui/material";
import LogoutButton from "./LogoutButton";
import '../assets/css/Header/Header.css';

const Header = () => {
  const [keycloak] = useState(null);

  return (
    <React.Fragment>
      <Toolbar> 
        <Box className="Header-box">
          <Box className="navbar">
            <img className="Header-image"
              src={require('../assets/img/smartcell.png')} 
              alt="smartcell" 
            />
            <ul className="Header-list">
              <li className="nav-link" >
                <a href="/">Acceuil</a>
              </li>
              <li className="nav-link">
                <a href="/">Services</a>
              </li>
              <li className="nav-link">
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
