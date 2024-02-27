// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-center py-3"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      &copy; {new Date().getFullYear()} 🧩ScribbleSpace
    </footer>
  );
};

export default Footer;
