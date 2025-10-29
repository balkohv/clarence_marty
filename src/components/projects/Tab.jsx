import Item from './Item.jsx';
import eiko_bg from '../../assets/projects/eiko_bg.png';
import React from 'react';

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carrousel",
  VIDEO: "video",
};

var prev_slide = null;

const Tab = ({ category, position, isActive }) => {
  const project = {
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
        background: "/path/to/slide2.jpg",
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
        text: "J'ai réalisé le lancement du team GasGas Factory racing sur les réseaux sociaux.\n\nAu programme :\n- réalisation d'une vidéo Youtube présentant les 3 pilotes\n- réalisation d'un reel instagram pour chaque pilote\n- photos pour une utilisation sur site web et réseaux sociaux"
      }
    ],
  };

  
  const [active_slide, setActive_slide] = React.useState(null);

  const handleSlideChange = ( slide) => {
      console.log(slide,prev_slide);
      if(slide == prev_slide){
        setActive_slide(null);
        prev_slide=null;
      }else{
        setActive_slide(slide);
        prev_slide = slide;
      }
  }

  const projects = [project, project, project, project, project, project];

  return (
    <div className={`tab-container ${position} ${isActive ? "active" : ""}`} id={category}>
      <div className="tab-info">
        <h2>Mes projets dans l’univers du {category}</h2>
        <h3>Découvrez ma passion</h3>
      </div>
      <div className="items-container">
        {projects.map((project, index) => (
          <Item key={index} project={project} isSlideActive={active_slide==index} onClick={() => handleSlideChange(index)}/>
        ))}
      </div>
    </div>
  );
};

export default Tab;
