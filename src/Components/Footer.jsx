import React from 'react';
import '../assets/css/Footer/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
       <img  className="logofod"
              src={require('../assets/img/logofod.png')} 
              alt="logofod" 
            />
      <div className="project-name">
         <span className="highlight">SmartCell 2024</span>
      </div>
       Freedom Of Dev Services (FOD)
    </div>
  );
};

export default Footer;