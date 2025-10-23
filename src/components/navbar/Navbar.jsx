import './Navbar.css';
import { useEffect, useState } from 'react';

const Navbar = ({ page }) => {

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div id="navbar-container" className={`navbar-${visible ? "visible" : "hidden"}`}>
      <div id="logo-container">
        <h1 id="logo">CLARENCE MARTY</h1>
      </div>

      <div id="tabs-container">
        <a
          id="about"
          className={`tab ${page === "about" ? "active-tab" : ""}`}
          href="/"
        >
          A propos
        </a>
        <a
          id="services"
          className={`tab ${page === "services" ? "active-tab" : ""}`}
          href="/services"
        >
          Services
        </a>
        <a
          id="projects"
          className={`tab ${page === "projects" ? "active-tab" : ""}`}
          href="/projects"
        >
          Mes réalisations
        </a>
        <a
          id="contact"
          className={`tab ${page === "contact" ? "active" : ""}`}
          href="#contact"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default Navbar;
