import './Navbar.css';

const Navbar = ({ page }) => {
  return (
    <div id="navbar-container">
      <div id="logo-container">
        <h1 id="logo">CLARENCE MARTY</h1>
      </div>

      <div id="tabs-container">
        <a
          id="about"
          className={`tab ${page === "about" ? "active" : ""}`}
          href="#about"
        >
          A propos
        </a>
        <a
          id="services"
          className={`tab ${page === "services" ? "active" : ""}`}
          href="#services"
        >
          Services
        </a>
        <a
          id="projects"
          className={`tab ${page === "projects" ? "active" : ""}`}
          href="#projects"
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
