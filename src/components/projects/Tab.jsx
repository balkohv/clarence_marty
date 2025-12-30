import Item from './Item.jsx';
import React from 'react';
import $ from 'jquery';

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carrousel",
  VIDEO: "video",
};

const api_url = import.meta.env.VITE_API_URL;

const Tab = ({ category, position, isActive, projects }) => {
  
  const [active_slide, setActive_slide] = React.useState(null);

  const handleSlideChange = ( slide,project_id) => {
      if(slide == active_slide){
        setActive_slide(null);
      }else{
        setActive_slide(slide);
        $.ajax({
          url: ''+api_url+'project_api.php',
          method: 'GET',
          data: {
            action:"view",
            project_id:project_id
          }
        });
      }
  }

  const close_item=()=>{
    setActive_slide(null);
  }

  return (
    <div className={`tab-container ${position} ${isActive ? "active" : ""}`} id={category}>
      <div className="tab-info">
        <h2>Mes projets dans l’univers du {category}</h2>
        <h3>Découvrez ma passion</h3>
      </div>
      <div className="items-container">
        {projects.map((project, index) => (
          <Item key={index} project={project} project_index={index} isSlideActive={active_slide} onClick={() => handleSlideChange(index,project.id)} close_item={() => close_item()} isAdmion={false}/>
        ))}
      </div>
    </div>
  );
};

export default Tab;
