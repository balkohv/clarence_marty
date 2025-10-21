import './Projects.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Tabs from './Tab.jsx';
import { Col, Row, Tab } from 'react-bootstrap';
import { use, useState } from 'react';

const Projects = () => {

    let categories = ["Sport", "Événementiel", "Restauration", "Corporate", "Documentaire"];

    

    const [activeCategory, setActiveCategory] = useState(0);

    const categories_click = (index) => {
        setActiveCategory(index);
    };


    return (
        <>
        <Navbar page="projects" /> 
        <div id="categories">
            {categories.map((category, index) => (
                <div key={index} className={`category-card ${activeCategory === index ? "category-active" : ""}`} onClick={() => categories_click(index)}>
                    <h2>{category}</h2>
                </div>
            ))}
        </div>
        {categories.map((category, index) => (
            <Tabs key={index} category={category} />
        ))}
        

        <Footer />

        </>
    );
};
export default Projects;