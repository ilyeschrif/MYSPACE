import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import '../assets/css/LogoutButton.css';


const keycloakInitOptions = {
  url: 'http://localhost:8080/',
  realm: 'demo',
  clientId: 'react-client',
};

const AppHeader = () => {
  const [keycloak, setKeycloak] = useState();

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloakInstance = Keycloak(keycloakInitOptions);
      try {
        await keycloakInstance.init({
          checkLoginIframe: true,
          pkceMethod: 'S256'
        });
        setKeycloak(keycloakInstance);
      } catch (error) {
        console.error("Authentication Failed", error);
      }
    };

    initKeycloak();
  }, []);

  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout({ redirectUri: 'http://localhost:3000' });
    }
  };

  return (
    keycloak && (
      <button className="button" onClick= {handleLogout}  >Se Déconnecter</button>

    )

  );
};

export default AppHeader;
