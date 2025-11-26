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

  React.useEffect(() => {
    // Initial mock data
    if (projects.length > 0) return;
    $.ajax({
      url: ''+api_url+'project_api.php',
      method: 'GET',
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


 /*  const project = {
    preview: {
      title: "Ekiö",
      subtitle: "2024 MTB Range",
      description:
        "Entre deux manches de coupe du monde, j'ai réalisé une publicité pour la gamme de vêtements VTT gravity 2024 de la marque Ekoï, à destination de leurs réseaux sociaux.",
      background: eiko_bg,
      video: "/videos/EKOI.mp4",
    },
    slides: [
      {
        type: type_slide.VIDEO,
        video: "/videos/EKOI.mp4"
      },
      {
        type: type_slide.CARROUSSEL,
        background: "/projects/ekoi_2.png",
        images: [
          "/projects/ekoi_21.png",
          "/projects/ekoi_22.png",
          "/projects/ekoi_23.png",
        ]
      },
      {
        type: type_slide.IMAGE,
        background: "/projects/ekoi_3.png",
        text: "J'ai réalisé le lancement du team GasGas Factory racing sur les réseaux sociaux.\n\nAu programme :\n- réalisation d'une vidéo Youtube présentant les 3 pilotes\n- réalisation d'un reel instagram pour chaque pilote\n- photos pour une utilisation sur site web et réseaux sociaux",
        textLoc: 'right'
      }
    ],
  };

  const project2 = {
    preview: {
      title: "HUSQVARNA BICYCLES",
      subtitle: "JOSH CARLSON \"ONE AND DONE\"",
      description:
        "Entre deux manches de coupe du monde, j'ai réalisé une publicité pour la gamme de vêtements VTT gravity 2024 de la marque Ekoï, à destination de leurs réseaux sociaux.",
      background: "/projects/husqvarna_bg.png",
      video: "/videos/husqvarna.mp4",
    },
    slides: [
      {
        type: type_slide.VIDEO,
        video: "/videos/husqvarna.mp4"
      },
      {
        type: type_slide.IMAGE,
        background: "/projects/husqvarna_bg2.png",
        text: "Lors des championnats du monde d'enduro & e-enduro 2024 à Val di Fassa, j'ai suivi Josh Carlson, un des pionniers de la discipline, afin de réaliser un mini-documentaire sur sa dernière course en tant que professionnel.",
        textLoc: 'right'
      }
    ],
  }; */
  
  const [active_slide, setActive_slide] = React.useState(null);

  const handleSlideChange = ( slide) => {
      if(slide == prev_slide){
        setActive_slide(null);
        prev_slide=null;
      }else{
        setActive_slide(slide);
        prev_slide = slide;
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
          <Item key={index} project={project} project_index={index} isSlideActive={active_slide} onClick={() => handleSlideChange(index)} close_item={() => close_item()} isAdmion={false}/>
        ))}
      </div>
    </div>
  );
};

export default Tab;
