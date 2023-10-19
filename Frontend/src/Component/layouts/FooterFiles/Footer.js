import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      {/* <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src="" alt="playstore" />
        <img src="" alt="Appstore" />
      </div> */}

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; mohammedshahid</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a
          href="https://www.instagram.com/mohammedshahid096"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://github.com/mohammedshahid096"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mohammed-shahid-9aa61222a"
          target="_blank"
          rel="noreferrer"
        >
          Linkedin
        </a>
      </div>
    </footer>
  );
};

export default Footer;
