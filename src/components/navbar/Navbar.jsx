import './Navbar.css';
import { useEffect, useState } from 'react';
import Moon from '../../assets/SVG/Moon.svg?react';
import Sun from '../../assets/SVG/Sun.svg?react';


const Navbar = ({ show_modal}) => {

  const [page, setPage] = useState("");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const goToHome = () => {
    window.location.href = "/";
  }

  
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));


  useEffect(() => {
    setPage(window.location.pathname === "/" ? "about" : window.location.pathname.slice(1));
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);


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
        <h1 id="logo" onClick={goToHome}>CLARENCE MARTY</h1>
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
          Réalisations
        </a>
        <a
          id="contact"
          className={`tab ${page === "contact" ? "active-tab" : ""}`}
          onClick={show_modal}
        >
          Contact
        </a>
        <Moon id="moon" className={`${theme==="light"?"active":""}`} onClick={toggleTheme} aria-label="Toggle theme" />
        <Sun id="sun" className={`${theme==="dark"?"active":""}`} onClick={toggleTheme} aria-label="Toggle theme" />
      </div>
    </div>

  );
};

export default Navbar;
