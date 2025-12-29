import './Projects.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Tabs from './Tab.jsx';
import { useState,useEffect } from 'react';
import $, { type } from 'jquery';

const Projects = () => {
  //const categories = ["Sport", "Événementiel", "Restauration", "Corporate", "Documentaire"];
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [prevCategory, setPrevCategory] = useState(0);
  const [projects, setProjectsList] = useState([]);
const api_url = import.meta.env.VITE_API_URL;

  const categories_click = (tab) => {
    if (tab === activeCategory) return;
    setPrevCategory(activeCategory);
    setActiveCategory(tab);
  };


  useEffect(() => {
    // Initial mock data
    if (projects.length > 0) return;
    $.ajax({
      url: ''+api_url+'project_api.php',
      method: 'GET',
      data: {
        action:"getAll"
      },
      success: function(data) {
          for (const raw_project of data.data.projects) {
            let project={
              id: raw_project.project_id,
              type: raw_project.type,
              preview:
              {
                  title: raw_project.title,
                  subtitle: raw_project.subTitle,
                  description: raw_project.description,
                  background: raw_project.background,
                  video: raw_project.video,
              },
              stats:
              {
                  views: raw_project.views,
                  archived: raw_project.archived === "1" ? true : false,
              },
              slides: raw_project.slides,
            }
            setProjectsList(prev => [...prev, project]);
          }
          for (const type of data.data.types) {
            setCategories(prev => [...prev, type.type]);
          }
        
      },
      error: function(err) {
        console.error('Error fetching projects:', err);
      }
    });
  }, []);

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
              projects={projects.filter(project => project.type === category)}
            />
          );
        })}
      </div>

      <Footer />
    </>
  );
};

export default Projects;
