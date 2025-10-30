import './Projects.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Tabs from './Tab.jsx';
import { useState } from 'react';

const Projects = () => {
  const categories = ["Sport", "Événementiel", "Restauration", "Corporate", "Documentaire"];
  const [activeCategory, setActiveCategory] = useState(0);
  const [prevCategory, setPrevCategory] = useState(0);

  const categories_click = (tab) => {
    if (tab === activeCategory) return;
    setPrevCategory(activeCategory);
    setActiveCategory(tab);
  };

  return (
    <>

      <div id="categories">
        {categories.map((category, tab) => (
          <div
            key={tab}
            className={`category-card ${activeCategory === tab ? "category-active" : ""}`}
            onClick={() => categories_click(tab)}
          >
            <h2>{category}</h2>
          </div>
        ))}
      </div>

      <div className="tabs-wrapper">
        {categories.map((category, index) => {
          const position =
            index === activeCategory
              ? "active"
              : index < activeCategory
              ? "left"
              : "right";

          return (
            <Tabs
              key={index}
              category={category}
              position={position}
              isActive={index === activeCategory}
            />
          );
        })}
      </div>

      <Footer />
    </>
  );
};

export default Projects;
