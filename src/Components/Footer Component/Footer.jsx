import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>Contact us: cocktailkungen@kungen.se</p>
      </div>

      <div className="footer-right">
        <p>Follow us:</p>
        <div className="social-icons">
          {/* ALTERNATIVE */}
          {[faFacebook, faTiktok, faInstagram].map((icon, index) => (
            <FontAwesomeIcon key={index} icon={icon} />
          ))}
          {/* <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTiktok} />
          <FontAwesomeIcon icon={faInstagram} /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
