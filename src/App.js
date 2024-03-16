import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import CellVisualisation2 from './Components/CellVisualisation2';
import CellVisualisation from './Components/CellVisualisation';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import Keycloak from 'keycloak-js';
import SearchBar from './Components/SearchBar';

/*
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

  } else {
    // Handle the authenticated state if needed
  }
}).catch(() => {
  console.error("Authentication Failed");
});
*/
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //const response = await axios.get('http://localhost:5051/cells/all');
      //const fetchedData = response.data;
      const fetchedData = [

        {
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
          "label": "encrage",
          "purpose": "Objectif de la cellule déléguante",
          "core_buisness": "Activité principale de la cellule déléguante",
          "type": "Normal",
          "delegatedCells": [],
          "id": "09a47f9f-04a6-4188-9bbf-753b1a663b13"
        }

      ]

      //const newData = fetchedData.map(item => ({ r: 20, label: item.label, children: item.delegatedCells }));
      const newData = walk(fetchedData)
      console.log(newData)
      function walk(arr) {
        if (arr.length == 0) { return null }
        const acc = []
        const elt = arr.splice(0, 1)[0];
        acc.push({
          label: elt.label,
          children: elt.delegatedCells ? walk(elt.delegatedCells) : null
        });
        const res = walk(arr)
        return acc.concat(res == null ? [] : res);
      }
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addCircleInside = (rootCell, label) => {
    const circleIndex = data.findIndex(circle => circle.label === rootCell);
    if (circleIndex == -1) { return }

    const newCircleSize = Math.random() * 10 + 5;
    const newCircle = { r: newCircleSize, label, color: '#f17300' };

    setData(prevData => {
      const newData = [...prevData];
      if (!newData[circleIndex].children) {
        newData[circleIndex].children = [];
      }
      newData[circleIndex].children.push(newCircle);
      return newData;
    });

  };

  window.add = addCircleInside;

  return (
    <div className="App">
      <Header />
      <div style={{ padding: '20px', color: 'blue' }}>
        <br></br><br></br>
        <SearchBar /><br></br><br></br><br></br>
        <CellVisualisation2 width={1400} height={500} data={data} />
        <CellVisualisation width={1400} height={500} data={data} />
        <button onClick={() => addCircleInside('YourLabel')}>Add Circle</button>

      </div>
    </div>
  );
};

export default App;
