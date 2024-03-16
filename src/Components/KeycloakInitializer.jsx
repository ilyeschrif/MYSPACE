import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

const KeycloakInitializer = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const keycloakInitOptions = {
      url: 'http://localhost:8080/',
      realm: 'master',
      clientId: 'react-client',
    };
    
    const keycloak = new Keycloak(keycloakInitOptions);
    
    keycloak.init({
    onLoad: 'login-required',
      checkLoginIframe: true,
      pkceMethod: 'S256'
    }).then((authenticated) => {
      if (!authenticated) {
        console.error("Authentication Failed");
        setInitialized(true); // Set initialized to true even if authentication fails
      } else {
        setInitialized(true); // Set initialized to true if authentication succeeds
      }
    }).catch(() => {
      console.error("Keycloak Initialization Failed");
      setInitialized(true); // Set initialized to true if initialization fails
    });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  if (!initialized) {
    // Keycloak initialization is in progress, you might want to display a loading indicator here
    return null;
  }

  return <>{children}</>; // Render children after Keycloak initialization completes
};

export default KeycloakInitializer;
