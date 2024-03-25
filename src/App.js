import React, { useState, useEffect } from 'react';
import "./App.css"
import CellVisualisation from './Components/CellVisualisation.jsx';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Keycloak from 'keycloak-js';
import axios from 'axios';


const keycloakInitOptions = {
  url: 'http://localhost:8080/',
  realm: 'demo',
  clientId: 'react-client',
};

async function sendDataToBackend(profile) {
  try {
    const response = await axios.post('http://localhost:5051/cells/save', profile, {
    });
    console.log('Response from backend:', response.data);
  } catch (error) {
    console.error('Error sending data to backend:', error);
  }
};


const keycloak = new Keycloak(keycloakInitOptions);
console.log(keycloak)

keycloak.init({
  onLoad: 'login-required',
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((authenticated) => {

  keycloak.loadUserProfile().then((profile) => {
    console.log("User Profile:", profile);
    //   const profileDataJson = JSON.stringify(profile);
    //   sendDataToBackend(profileDataJson);
    // }).catch((error) => {
    //   console.error("Failed to load user profile", error);
  });

  const dataToSend =
  {
    "label": "Rec",
    "purpose": "Objectif de la cellule déléguante",
    "core_buisness": "Activité principale de la cellule déléguante",
    "type": "Normal",
    "delegatedCells": [],
  }
  sendDataToBackend(dataToSend)

}).catch(() => {
  toast.error("Authentication Failed");
});



const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {

    Data().then((rawData) => {
      const d3Data = rawData.map(rawToD3)
      setData({
        label: "Super cell",
        children: d3Data,
      });
    })
    function rawToD3({ label, delegatedCells }) {
      if (!delegatedCells || delegatedCells.length === 0) {
        return { label };
      }
      return {
        label,
        children: delegatedCells.map(rawToD3),
      };
    }
  }, []);



  const fetchData = async () => {
    let response = null;
    try {
      response = await axios.get('http://localhost:5051/cells/all');
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    return response.data;
  }









  const Data = async () => [{
    "label": "SuperCellule",
    "purpose": "Objectif de la cellule déléguante",
    "core_buisness": "Activité principale de la cellule déléguante",
    "type": "Normal",
    "delegatedCells": [{
      "label": "RH",
      "purpose": "Objectif de la cellule déléguante",
      "core_buisness": "Activité principale de la cellule déléguante",
      "type": "Normal",
      "delegatedCells": [
        {
          "label": "stage",
          "purpose": "Objectif de la cellule déléguante",
          "core_buisness": "Activité principale de la cellule déléguante",
          "type": "Normal",
          "delegatedCells": [

          ],
        },
        {
          "label": "Rec",
          "purpose": "Objectif de la cellule déléguante",
          "core_buisness": "Activité principale de la cellule déléguante",
          "type": "Normal",
          "delegatedCells": [],
        }
      ],
    },
    {
      "label": "enjoy",
      "purpose": "Objectif de la cellule déléguante",
      "core_buisness": "Activité principale de la cellule déléguante",
      "type": "Normal",
      "delegatedCells": [{
        "label": "test",
        "purpose": "Objectif de la cellule déléguante",
        "core_buisness": "Activité principale de la cellule déléguante",
        "type": "Normal",
        "delegatedCells": [],
        "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
      }, {
        "label": "test",
        "purpose": "Objectif de la cellule déléguante",
        "core_buisness": "Activité principale de la cellule déléguante",
        "type": "Normal",
        "delegatedCells": [],
        "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
      }, {
        "label": "test",
        "purpose": "Objectif de la cellule déléguante",
        "core_buisness": "Activité principale de la cellule déléguante",
        "type": "Normal",
        "delegatedCells": [],
        "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
      }, {
        "label": "test",
        "purpose": "Objectif de la cellule déléguante",
        "core_buisness": "Activité principale de la cellule déléguante",
        "type": "Normal",
        "delegatedCells": [],
        "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
      }, {
        "label": "test",
        "purpose": "Objectif de la cellule déléguante",
        "core_buisness": "Activité principale de la cellule déléguante",
        "type": "Normal",
        "delegatedCells": [],
        "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
      }, {
        "label": "COME",
        "purpose": "Objectif de la cellule déléguante",
        "core_buisness": "Activité principale de la cellule déléguante",
        "type": "Normal",
        "delegatedCells": [{
          "label": "test",
          "purpose": "Objectif de la cellule déléguante",
          "core_buisness": "Activité principale de la cellule déléguante",
          "type": "Normal",
          "delegatedCells": [],
          "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
        }],
        "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
      }],
      "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
    },
    {
      "label": "Com",
      "purpose": "Objectif de la cellule déléguante",
      "core_buisness": "Activité principale de la cellule déléguante",
      "type": "Normal",
      "delegatedCells": [],
    }],
    "id": "bf1d93a3-1f74-4323-9e48-d98f24a1f482"
  },
  {
    "label": "Ancrage",
    "purpose": "Objectif de la cellule déléguante",
    "core_buisness": "Activité principale de la cellule déléguante",
    "type": "Normal",
    "delegatedCells": [],
  }

  ]



  return (
    <div className="App">
      <Header />
      <div className='cell-container'>
        <div className='Tab'></div>


        {data == null
          ? <></>
          : <CellVisualisation data={data} width={500} height={500} />
        }

      </div>
      <Footer />

    </div>
  );
};

export default App