import React from 'react';
import "../assets/css/Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="logo-and-text">
                <img
                    src={require('../assets/img/logofod.png')}
                    alt="logofod"
                    style={{ maxWidth: "65px", maxHeight: "65px", marginRight: "5em" }}
                />
                <div className="project-name">
                    <span className="highlight">SmartCell 2024</span>
                </div>
            </div>
            <div className="fod-text">
                Freedom Of Dev Services (FOD)
            </div>
        </div>
    );
};

export default Footer;
