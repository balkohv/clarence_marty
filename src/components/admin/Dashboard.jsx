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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carrousel",
  VIDEO: "video",
  PREVIEW: "preview"
};

const Dashboard = () => {
  const [projects, setProjectsList] = React.useState([]);
  const [item, setItem] = React.useState(null);
  const [editor, setEditor] = React.useState(null);

  React.useEffect(() => {
    // Initial mock data
    const project = { 
        id:"p1", 
        preview: 
        { 
            title: 'Ekiö', 
            subtitle: '2024 MTB Range', 
            description: 'Entre deux manches de coupe du monde, j\'ai réalisé une publicité pour la gamme de vêtements VTT gravity 2024 de la marque Ekoï, à destination de leurs réseaux sociaux.', 
            background: eiko_bg, 
            video: '/videos/EKOI.mp4', 
        }, 
        stats:
        { 
            views: 1245, 
            archived: false 
        }, 
        slides:[ 
            { 
                id: "p1-0", 
                type: type_slide.VIDEO, 
                video: '/videos/EKOI.mp4',
                background: '', 
                text: '', 
                textLoc: '', 
                images: [] 
            }, 
            { 
                id: "p1-1", 
                type: type_slide.CARROUSSEL, 
                video: '', 
                background: '/projects/ekoi_2.png', 
                text: '', 
                textLoc: '', 
                images: 
                [ 
                    '/projects/ekoi_21.png', 
                    '/projects/ekoi_22.png', 
                    '/projects/ekoi_23.png', 
                ] 
            }, 
            { 
                id: "p1-2", 
                type: type_slide.IMAGE, 
                video: '', 
                background: '/projects/ekoi_3.png', 
                text: 'J\'ai réalisé le lancement du team GasGas Factory racing sur les réseaux sociaux.\n\nAu programme :\n- réalisation d\'une vidéo Youtube présentant les 3 pilotes\n- réalisation d\'un reel instagram pour chaque pilote\n- photos pour une utilisation sur site web et réseaux sociaux', 
                textLoc: 'right', 
                images: [] 
            } 
        ], 
    }; 
    
    const project2 = 
    { 
        id:"p2", 
        preview: 
        { 
            title: 'HUSQVARNA BICYCLES', 
            subtitle: 'JOSH CARLSON \"ONE AND DONE\"', 
            description: 'Entre deux manches de coupe du monde, j\'ai réalisé une publicité pour la gamme de vêtements VTT gravity 2024 de la marque Ekoï, à destination de leurs réseaux sociaux.', 
            background: '/projects/husqvarna_bg.png', 
            video: '/videos/husqvarna.mp4', 
        }, 
        stats:
        { 
            views: 3695, 
            archived: true 
        }, 
        slides: 
        [ 
            { 
                id: "p2-0", 
                type: type_slide.VIDEO,
                video: '/videos/husqvarna.mp4',
                background: '',
                text: '', 
                textLoc: '', 
                images: [] 
            }, 
            { 
                id: "p2-1", 
                type: type_slide.IMAGE, 
                video: '', 
                background: '/projects/husqvarna_bg2.png', 
                text: 'Lors des championnats du monde d\'enduro & e-enduro 2024 à Val di Fassa, j\'ai suivi Josh Carlson, un des pionniers de la discipline, afin de réaliser un mini-documentaire sur sa dernière course en tant que professionnel.', 
                textLoc: 'right', 
                images: [] 
            } 
        ], 
    };

    setProjectsList([project, project2]);
    setItem(project);
  }, []);

  const preview_project = (project) => {
    setEditor(prev => prev === project.id ? null : project.id);
    setItem(project);
  };

    const editSlide = (projectId, slideId, updatedFields) => {
    setProjectsList(prevProjects =>
        prevProjects.map(project => {
        if (project.id !== projectId) return project;

        if (slideId === "preview") {
            return {
            ...project,
            preview: { ...project.preview, ...updatedFields }
            };
        }
        return {
            ...project,
            slides: project.slides.map(slide =>
            slide.id === slideId ? { ...slide, ...updatedFields } : slide
            )
        };
        })
    );
    setItem(prev => {
        if (prev.id !== projectId) return prev;

        if (slideId === "preview") {
        return { ...prev, preview: { ...prev.preview, ...updatedFields } };
        }

        return {
        ...prev,
        slides: prev.slides.map(slide =>
            slide.id === slideId ? { ...slide, ...updatedFields } : slide
        )
        };
    });
    };

    const newSlide = (projectId) => () => {
    setProjectsList(prevProjects =>
        prevProjects.map(project => {
        if (project.id !== projectId) return project;
        const newSlide = {
            id: `${projectId}-${project.slides.length}`,
            type: type_slide.IMAGE,
            video: '',
            background: '',
            text: '',
            textLoc: '',
            images: []
        };
        return {
            ...project,
            slides: [...project.slides, newSlide]
        };
        })
    );
    setItem(prev => {
        if (prev.id !== projectId) return prev;
        const newSlide = {
        id: `${projectId}-${prev.slides.length}`,
        type: type_slide.IMAGE,
        video: '',
        background: '',
        text: '',
        textLoc: '',
        images: []
        };
        return {
        ...prev,
        slides: [...prev.slides, newSlide]
        };
    });
    };

    const deleteSlide = (projectId, slideId) => {
    setProjectsList(prevProjects =>
        prevProjects.map(project => {
        if (project.id !== projectId) return project;

        return {
            ...project,
            slides: project.slides.filter(slide => slide.id !== slideId)
        };
        })
    );
    setItem(prev => {
        if (prev.id !== projectId) return prev;

        return {   
        ...prev,
        slides: prev.slides.filter(slide => slide.id !== slideId)
        };
    });
    };




  return (
    <div className='admin_container'>
      <Row className='stats'>
        <h1>VISITES</h1>
        <Col className='graph'>
          <ResponsiveContainer>
            <LineChart data={[{date:"janvier-2025",visites:10},{date:"février-2025",visites:30},{date:"mars-2025",visites:20},{date:"avril-2025",visites:50},{date:"mai-2025",visites:40}]}>
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
            <table><tbody>
              {projects.map((project, index) => (
                <React.Fragment key={project.id}>
                  <tr className="project" onClick={() => preview_project(project)}>
                    <td>{index}</td>
                    <td>{project.preview.title}</td>
                    <td>{project.preview.subtitle}</td>
                    <td>{project.stats.views} views</td>
                    <td><span className={project.stats.archived ? "archived" : "online"}>{project.stats.archived ? "Archivé" : "En ligne"}</span></td>
                  </tr>

                  <tr className={`editor ${editor === project.id ? "active" : ""}`}>
                    {editor === project.id && item && (
                      <div className='slide-editor-container'>
                        <h2>Preview</h2>

                        <div className='preview-editor slide-editor'>
                            <input type="text" value={project.preview.title} onChange={e => editSlide(project.id, "preview", { title: e.target.value })}/>
                            <input type="text" value={item.preview.subtitle || ""} />
                            <textarea value={project.preview.description} onChange={e => editSlide(project.id, "preview", { description: e.target.value })}/>
                            <video autoPlay muted loop playsInline preload="none">
                                <source src={item.preview.video} type="video/mp4" />
                            </video>
                            <img src={item.preview.background} alt="" />
                        </div>

                        <DndContext
                          collisionDetection={closestCenter}
                          onDragEnd={({ active, over }) => {
                            if (!over || active.id === over.id) return;

                            setProjectsList(prev => {
                              const updated = prev.map(p => {
                                if (p.id !== item.id) return p;

                                const oldIndex = p.slides.findIndex(s => s.id === active.id);
                                const newIndex = p.slides.findIndex(s => s.id === over.id);

                                return {
                                  ...p,
                                  slides: arrayMove(p.slides, oldIndex, newIndex)
                                };
                              });

                              setItem(updated.find(p => p.id === item.id));
                              return updated;
                            });
                          }}>

                          <SortableContext items={item.slides.map(s => s.id)} strategy={verticalListSortingStrategy}>
                            {item.slides.map(slide => (
                              <SlideEdit key={slide.id} slide={item.slides.find(s => s.id === slide.id) || slide} projectId={project.id} editSlide={editSlide} deleteSlide={deleteSlide} />
                            ))}
                          </SortableContext>
                        </DndContext>

                        <div className='new-slide'>
                          <input type="button" value="+ Ajouter une slide" onClick={newSlide(project.id)}/>
                        </div>
                      </div>
                    )}
                  </tr>
                </React.Fragment>
              ))}
            </tbody></table>
          </Col>

          <Col className='preview' lg={5} md={12}>
            {item && <Item project={item} isAdmin={true} />}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Dashboard;
