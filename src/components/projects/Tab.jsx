import Item from './Item.jsx';
import eiko_bg from '../../assets/projects/eiko_bg.png';
import React from 'react';
import $ from 'jquery';

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carrousel",
  VIDEO: "video",
};

var prev_slide = null;
const api_url = "http://192.168.1.59/clarence/";

const Tab = ({ category, position, isActive }) => {
  const [projects, setProjectsList] = React.useState([]);
  const [selProject, setSelProject] = React.useState(null);

  React.useEffect(() => {
    // Initial mock data
    if (projects.length > 0) return;
    $.ajax({
      url: ''+api_url+'project_api.php',
      method: 'GET',
      data: {
        action:"getAll"
      },
      success: function(data) {
          for (const raw_project of data.data) {
            let project={
              id: raw_project.project_id,
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
          setSelProject(project);
          }
        
      },
      error: function(err) {
        console.error('Error fetching projects:', err);
      }
    });
  }, []);
  
  const [active_slide, setActive_slide] = React.useState(null);

  const handleSlideChange = ( slide,project_id) => {
      if(slide == prev_slide){
        setActive_slide(null);
        prev_slide=null;
      }else{
        setActive_slide(slide);
        prev_slide = slide;
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
