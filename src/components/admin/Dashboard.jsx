import './Admin.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import eiko_bg from '../../assets/projects/eiko_bg.png';
import Item from '../projects/Item-edit.jsx';
import SlideEdit from './slide-edit.jsx';
import $ from 'jquery';
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

const api_url = "http://192.168.1.59/clarence/";

const Dashboard = () => {
  const [projects, setProjectsList] = React.useState([]);
  const [selProject, setSelProject] = React.useState(null);
  const [editor, setEditor] = React.useState(null);

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

  const save_changes = (project_id) => {
    let project=projects.find(p => p.id === project_id);
    let slides = JSON.parse(JSON.stringify(project.slides));
    $.ajax({
      url: ''+api_url+'project_api.php',
      method: 'PATCH',
      data: JSON.stringify({ 
        id: project_id,
        title: project.preview.title,
        subTitle: project.preview.subtitle,
        description: project.preview.description,
        background: project.preview.background,
        video: project.preview.video,
        slides: slides

      }),
      contentType: 'application/json',
      success: function(data) {
          console.log('Project saved successfully:', data);
      },
      error: function(err) {
        console.error('Error saving project:', err);
      }
    });
  };

  const preview_project = (project) => {
    setEditor(prev => prev === project.id ? null : project.id);
    setSelProject(project);
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
            slide.slide_id === slideId ? { ...slide, ...updatedFields } : slide
            )
        };
        })
    );
    setSelProject(prev => {
        if (prev.id !== projectId) return prev;

        if (slideId === "preview") {
        return { ...prev, preview: { ...prev.preview, ...updatedFields } };
        }

        return {
        ...prev,
        slides: prev.slides.map(slide =>
            slide.slide_id === slideId ? { ...slide, ...updatedFields } : slide
        )
        };
    });
    };

    const newSlide = (projectId) => () => {
    setProjectsList(prevProjects =>
        prevProjects.map(project => {
        if (project.id !== projectId) return project;
        const newSlide = {
            slide_id: `${projectId}-${project.slides.length}`,
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
    setSelProject(prev => {
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
              slides: project.slides.filter(slide => slide.slide_id !== slideId)
          };
          })
      );
      setSelProject(prev => {
          if (prev.id !== projectId) return prev;

          return {   
          ...prev,
          slides: prev.slides.filter(slide => slide.slide_id !== slideId)
          };
      });
      $.ajax({
        url: ''+api_url+'slide_api.php',
        method: 'DELETE',
        data: JSON.stringify({ 
          id: slideId,
        }),
        error: function(err) {
          console.error('Error fetching projects:', err);
        }
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
                    {editor === project.id && (
                      <div className='slide-editor-container'>
                        <h2>Preview</h2>

                        <div className='preview-editor slide-editor'>
                            <input type="text" value={project.preview.title} onChange={e => editSlide(project.id, "preview", { title: e.target.value })}/>
                            <input type="text" value={project.preview.subtitle} onChange={e => editSlide(project.id, "preview", { title: e.target.value })}/>
                            <textarea value={project.preview.description} onChange={e => editSlide(project.id, "preview", { description: e.target.value })}/>
                            <video autoPlay muted loop playsInline preload="none">
                                <source src={project.preview.video} type="video/mp4" />
                            </video>
                            <img src={project.preview.background} alt="" />
                        </div>

                        <DndContext
                          collisionDetection={closestCenter}
                          onDragEnd={({ active, over }) => {
                            if (!over || active.id === over.id) return;

                            setProjectsList(prev => {
                              const updated = prev.map(p => {
                                if (p.id !== project.id) return p;
                                
                                const oldIndex = p.slides.findIndex(s => s.slide_id === active.id);
                                const newIndex = p.slides.findIndex(s => s.slide_id === over.id);
                                const movedSlides = arrayMove(p.slides, oldIndex, newIndex);
                                const reIndexedSlides = movedSlides.map((slide, index) => ({
                                  ...slide,
                                  index_slide: index
                                }));
                                return {
                                  ...p,
                                  slides: reIndexedSlides
                                };
                              });

                              setSelProject(updated.find(p => p.id === project.id));
                              return updated;
                            });
                          }}>

                          <SortableContext items={project.slides.map(s => s.slide_id)} strategy={verticalListSortingStrategy}>
                            {project.slides.map(slide => (
                              <SlideEdit key={project.id+""+slide.slide_id} slide={slide} projectId={project.id} editSlide={editSlide} deleteSlide={deleteSlide} />
                            ))}
                          </SortableContext>
                        </DndContext>

                        <div className='new-slide'>
                          <input type="button" value="+ Ajouter une slide" onClick={newSlide(project.id)}/>
                        </div>
                        <div className='save-changes'>
                          <input type="button" value="Sauvegarder les modifications" onClick={() =>save_changes(project.id)}/>
                        </div>
                      </div>
                    )}
                  </tr>
                </React.Fragment>
              ))}
            </tbody></table>
          </Col>

          <Col className='preview' lg={5} md={12}>
            {selProject && <Item project={selProject} isAdmin={true} />}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Dashboard;
