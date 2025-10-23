import Item from './Item.jsx';
import eiko_bg from '../../assets/projects/eiko_bg.png';

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
        type: "image",
        background: "/path/to/slide1.jpg",
      },
    ],
  };

  const projects = [project, project, project, project, project, project];

  return (
    <div className={`tab-container ${position} ${isActive ? "active" : ""}`} id={category}>
      <div className="tab-info">
        <h2>Mes projets dans l’univers du {category}</h2>
        <h3>Découvrez ma passion</h3>
      </div>
      <div className="items-container">
        {projects.map((project, index) => (
          <Item key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Tab;
