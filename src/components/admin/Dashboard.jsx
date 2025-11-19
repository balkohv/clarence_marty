import './Admin.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import eiko_bg from '../../assets/projects/eiko_bg.png';
import Item from '../projects/Item-edit.jsx';
import SlideEdit from './slide-edit.jsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {CSS} from "@dnd-kit/utilities";


const visitsData = [
  { date: "2025-10-01", visites: 42 },
  { date: "2025-10-02", visites: 68 },
  { date: "2025-10-03", visites: 55 },
  { date: "2025-10-04", visites: 74 },
  { date: "2025-10-05", visites: 91 },
];

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carrousel",
  VIDEO: "video",
  PREVIEW: "preview"
};

const project = {
id:"p1",
preview: {
    title: 'Ekiö',
    subtitle: '2024 MTB Range',
    description:
    'Entre deux manches de coupe du monde, j\'ai réalisé une publicité pour la gamme de vêtements VTT gravity 2024 de la marque Ekoï, à destination de leurs réseaux sociaux.',
    background: eiko_bg,
    video: '/videos/EKOI.mp4',
},
stats:{
    views: 1245,
    archived: false
},
slides: [
    {
    id: "p1-0",
    type: type_slide.VIDEO,
    video: '/videos/EKOI.mp4'
    },
    {
    id: "p1-1",
    type: type_slide.CARROUSSEL,
    background: '/projects/ekoi_2.png',
    images: [
        '/projects/ekoi_21.png',
        '/projects/ekoi_22.png',
        '/projects/ekoi_23.png',
    ]
    },
    {
    id: "p1-2",
    type: type_slide.IMAGE,
    background: '/projects/ekoi_3.png',
    text: 'J\'ai réalisé le lancement du team GasGas Factory racing sur les réseaux sociaux.\n\nAu programme :\n- réalisation d\'une vidéo Youtube présentant les 3 pilotes\n- réalisation d\'un reel instagram pour chaque pilote\n- photos pour une utilisation sur site web et réseaux sociaux',
    textLoc: 'right'
    }
],
};

const project2 = {
id:"p2",
preview: {
    title: 'HUSQVARNA BICYCLES',
    subtitle: 'JOSH CARLSON \"ONE AND DONE\"',
    description:
    'Entre deux manches de coupe du monde, j\'ai réalisé une publicité pour la gamme de vêtements VTT gravity 2024 de la marque Ekoï, à destination de leurs réseaux sociaux.',
    background: '/projects/husqvarna_bg.png',
    video: '/videos/husqvarna.mp4',
},
stats:{
    views: 3695,
    archived: true
},
slides: [
    {
    id: "p2-0",
    type: type_slide.VIDEO,
    video: '/videos/husqvarna.mp4'
    },
    {
    id: "p2-1",
    type: type_slide.IMAGE,
    background: '/projects/husqvarna_bg2.png',
    text: 'Lors des championnats du monde d\'enduro & e-enduro 2024 à Val di Fassa, j\'ai suivi Josh Carlson, un des pionniers de la discipline, afin de réaliser un mini-documentaire sur sa dernière course en tant que professionnel.',
    textLoc: 'right'
    }
],
};




const Dashboard = () => {


const [projects, setProjectsList] = React.useState([project, project2]);
const [item, setItem] = React.useState(projects[0]);
const [editor, setEditor] = React.useState(projects[0].id);

const preview_project = (project) => {
    if(editor === project.id){
        setEditor(null);
    } else {
        setEditor(project.id);
    }
    setItem(project);
}


return(
    <>
        <div className='admin_container'>
            <Row className='stats'>
                <h1> VISITES</h1>
                <Col className='graph'>
                    <ResponsiveContainer>
                        <LineChart data={visitsData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="visites" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <Row className='projects'>
                <h1>MES PROJETS</h1>
                <Row className='projects_container'>
                    <Col className='projects_list'>
                        <table>
                            <thead>

                            </thead>
                            <tbody>
                                {projects.map((project,index)=>(
                                    <React.Fragment key={project.id}>
                                        <tr className="project" onClick={()=>preview_project(project)}>
                                            <td>{index}</td>
                                            <td>{project.preview.title}</td>
                                            <td>{project.preview.subtitle}</td>
                                            <td>{project.stats.views} views</td>
                                            <td><span className={`${project.stats.archived?"archived":"online"}`}>{project.stats.archived?"Archivé":"En ligne"}</span></td>
                                        </tr>
                                        <tr className={`editor ${editor === project.id ? "active" : ""}`}>
                                            <div className='slide-editor-container'>
                                                <h2>Preview</h2>
                                                <div className='preview-editor slide-editor'>
                                                    <input type="text" defaultValue={project.preview.title} />
                                                    <input type="text" defaultValue={project.preview.subtitle} />
                                                    <textarea defaultValue={project.preview.description}></textarea>
                                                    <input type='file' id={`preview_video_${index}`} hidden/>
                                                    <video autoPlay muted loop playsInline preload="none" >
                                                        <source src={project.preview.video} type="video/mp4" />
                                                    </video>
                                                    <input type="file" id={`preview_bg_${index}`} hidden />
                                                    <img src={project.preview.background} alt="" />
                                                </div>
                                                <DndContext collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
                                                    if (!over || active.id === over.id) return;

                                                    setProjectsList(prevProjects => {
                                                    // On crée un nouveau tableau de projets avec les slides réordonnées
                                                    const newProjects = prevProjects.map(p => {
                                                        if (p.id !== project.id) return p; // pas le projet en cours

                                                        const oldIndex = p.slides.findIndex(s => s.id === active.id);
                                                        const newIndex = p.slides.findIndex(s => s.id === over.id);

                                                        const newSlides = arrayMove([...p.slides], oldIndex, newIndex);

                                                        return { ...p, slides: newSlides }; // nouvelle référence du projet
                                                    });

                                                    // Mettre à jour le preview avec la version fraîche
                                                    const updatedProject = newProjects.find(p => p.id === project.id);
                                                    setItem(updatedProject);

                                                    return newProjects;
                                                    });
                                                }}
                                                >
                                                <SortableContext
                                                    items={project.slides.map(s => s.id)}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    {project.slides.map(slide => (
                                                    <SlideEdit key={slide.id} slide={slide} index={index}/>
                                                    ))}
                                                </SortableContext>
                                                </DndContext>
                                            </div>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                    <Col className='preview' lg={5} md={12}>
                        <Item project={item} project_index={0} isSlideActive={0} onClick={null} close_item={null} isAdmin={true}/>
                    </Col>
                </Row>
            </Row>
        </div>
    </>
)
};

export default Dashboard;