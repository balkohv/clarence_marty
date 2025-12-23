import './Admin.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Item from '../projects/Item-edit.jsx';
import SlideEdit from './slide-edit.jsx';
import { useState, useEffect } from 'react';
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
  CARROUSSEL: "carroussel",
  VIDEO: "video",
  PREVIEW: "preview"
};

const api_url = "http://192.168.1.59/clarence/";

const Dashboard = () => {
  const [projects, setProjectsList] = React.useState([]);
  const [selProject, setSelProject] = React.useState(null);
  const [editor, setEditor] = React.useState(null);
  const [pendingSave, setPendingSave] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [types, setTypes] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);


  React.useEffect(() => {
    // Initial mock data
    if (projects.length > 0) return;
    $.ajax({
      url: ''+api_url+'project_api.php',
      method: 'GET',
      dataType: 'json',
      data: {
        isAdmin: 1,
        action:"getAll"
      },
      contentType: 'application/json',
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
            setSelProject(project);
          }
        for (const type of data.data.types) {
          setTypes(prev => [...prev, type.type]);
        }
      },
      error: function(err) {
        console.error('Error fetching projects:', err);
      }
    });
  }, []);

  useEffect(() => {
    if (!pendingSave) return;

    save_changes(pendingSave);
    setPendingSave(null);
  }, [projects]);


  const save_changes = (project_id) => {
    setSaveStatus("loading");
    let project=projects.find(p => p.id === project_id);
    let slides = JSON.parse(JSON.stringify(project.slides));
    const formData = new FormData();
    formData.append("id",project_id);
    formData.append("type",project.type);
    formData.append("title",project.preview.title);
    formData.append("subTitle",project.preview.subtitle);
    formData.append("description",project.preview.description);
    formData.append("background",project.preview.background);
    formData.append("background_file",project.preview.background_file);
    formData.append("video",project.preview.video);
    formData.append("video_file",project.preview.video_file);
    formData.append("archived",project.stats.archived);
    project.slides.forEach((slide, index)=> {
      formData.append("background-"+slide.slide_id,slide.background);
      formData.append("background_file-"+slide.slide_id,slide.background_file);
      formData.append("index_slide-"+slide.slide_id,slide.index_slide);
      formData.append("project_id-"+slide.slide_id,slide.project_id);
      formData.append("text-"+slide.slide_id,slide.text);
      formData.append("text_loc-"+slide.slide_id,slide.text_loc);
      formData.append("type-"+slide.slide_id,slide.type);
      formData.append("video-"+slide.slide_id,slide.video);
      formData.append("video_file-"+slide.slide_id,slide.video_file);
      formData.append("archived-"+slide.slide_id,slide.archived);
      formData.append("slide_id-"+slide.slide_id,slide.slide_id);
      slide.images.forEach((image,index)=>{
        const imageKey = image.image_id.toString().startsWith("new-")? "new_" + index: image.image_id;
        formData.append("image_id-"+slide.slide_id+"-"+imageKey,image.image_id);
        formData.append("slide_id-"+slide.slide_id+"-"+imageKey,slide.slide_id);
        formData.append("image-"+slide.slide_id+"-"+imageKey,image.image);
        formData.append("image_file-"+slide.slide_id+"-"+imageKey,image.image_file);
        formData.append("archived-"+slide.slide_id+"-"+imageKey,image.archived);
      })
    });
    $.ajax({
      url: ''+api_url+'project_api.php',
      method: 'POST',
      data: formData,
      processData: false, 
      contentType: false,
      success: function(data) {
          console.log('Project saved successfully:', data);
          setSaveStatus("success");
          setTimeout(() => setSaveStatus("idle"), 1500);
      },
      error: function(err) {
        console.error('Error saving project:', err);
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    });
  };

  const preview_project = (project) => {
    setEditor(prev => prev === project.id ? null : project.id);
    setSelProject(project);
  };


  const editImage = (projectId, slideId, imageId, updatedFields) => {
    const update = (project) => ({
      ...project,
      slides: project.slides.map(slide => {
        if (slide.slide_id !== slideId) return slide;

        if (imageId === "new") {
          return {
            ...slide,
            images: [
              ...slide.images,
              {
                image_id: "new-" + Date.now(),
                archived: 0,
                ...updatedFields,
              },
            ],
          };
        }

        if (updatedFields.archived === 1) {
          return {
            ...slide,
            images: slide.images.filter(img => img.image_id !== imageId),
          };
        }

        return {
          ...slide,
          images: slide.images.map(img =>
            img.image_id === imageId ? { ...img, ...updatedFields } : img
          ),
        };
      }),
    });

    setProjectsList(prev => prev.map(p => p.id === projectId ? update(p) : p));
    setSelProject(prev => prev?.id === projectId ? update(prev) : prev);
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

        if (slideId === "archived") {
            return {
            ...project,
            stats: { ...project.stats, ...updatedFields }
            };
        }

        if (slideId === "projet") {
          return {
            ...project,
            ...updatedFields
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
    if (slideId === "projet") {
      setPendingSave(projectId);
    }
  };

  const newSlide = (projectId) => () => {
    setProjectsList(prevProjects =>
        prevProjects.map(project => {
        if (project.id !== projectId) return project;
        const newSlide = {
            slide_id: `${projectId}-${project.slides.length}`,
            type: type_slide.IMAGE,
            index_slide: project.slides.length+1,
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

  const add_project= () =>{
    const new_project = {
      id: "",
      preview:
      {
          title: "",
          subtitle: "",
          description: "",
          background: "",
          video: "",
      },
      stats:
      {
          views: 0,
          archived: 0,
      },
      slides: [],
    };
    setProjectsList(prev => [...prev, new_project]);
  }



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
            <button onClick={()=>add_project()}>+ Nouveau projet</button>
            <table><tbody>
              {projects.map((project, index) => (
                <React.Fragment key={project.id}>
                  <tr className="project" onClick={() => preview_project(project)}>
                    <td>{index}</td>
                    <td>{project.preview.title}</td>
                    <td>{project.type}</td>
                    <td>{project.preview.subtitle}</td>
                    <td>{project.stats.views} views</td>
                    <td><span className={project.stats.archived ? "archived" : "online"}>{project.stats.archived ? "Archivé" : "En ligne"}</span></td>
                  </tr>

                  <tr className={`editor ${editor === project.id ? "active" : ""}`}>
                    {editor === project.id && (
                      <div className='slide-editor-container'>
                        <div>
                          <h2>Édition du projet : {project.preview.title}</h2>
                          <label className="switch">
                            <input 
                              type="checkbox" 
                              id="archived" 
                              checked={!project.stats.archived} 
                              onChange={e => editSlide(project.id, "archived", { archived: !e.target.checked})}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                        <div className='slides-edit'>
                        <div className='preview-editor slide-editor'>
                            <div className='form-data'>
                              <label htmlFor="title">Titre</label>
                              <input type="text" id="title" value={project.preview.title} onChange={e => editSlide(project.id, "preview", { title: e.target.value })}/>
                            </div>
                            <div className='form-data categories'>
                              <label htmlFor="type"><p>Catégorie</p><span onClick={() => setShowModal(true)}>+</span></label>
                              <select id="type" value={project.type} onChange={e => editSlide(project.id, "projet", { type: e.target.value })}>
                                {types.map((type, index) => (
                                  <option key={index} value={type}>{type}</option>
                                ))}
                              </select>
                            </div>
                            <div className='form-data'>
                              <label htmlFor="subtitle">Sous-titre</label>
                              <input type="text" id="subtitle" value={project.preview.subtitle} onChange={e => editSlide(project.id, "preview", { subtitle: e.target.value })}/>
                            </div>
                            <div className='form-data'>
                              <label htmlFor="description">Description</label>
                              <textarea id="description" value={project.preview.description} onChange={e => editSlide(project.id, "preview", { description: e.target.value })}/>
                            </div>
                            <div className='media-container'>
                              <div className='media'>
                                <button onClick={() => document.getElementById("preview-video").click()}>
                                  Choisir une video
                                </button>
                                <input type="file" id='preview-video' onChange={e => {
                                  const file = e.target.files[0];
                                  if (file) {
                                      editSlide(project.id, "preview", { video: file, video_preview: URL.createObjectURL(file) });
                                  }
                                }} />
                                <video key={project.preview.video_preview || project.preview.video} controls autoPlay muted loop playsInline preload="none">
                                    <source src={project.preview.video_preview?project.preview.video_preview : api_url + "/uploads/" + project.preview.video} type="video/mp4" />
                                </video>
                              </div>
                              <div className='media'>
                                <button onClick={() => document.getElementById("preview-background").click()}>
                                  Choisir un fond
                                </button>
                                <input type="file" id='preview-background' onChange={e => {
                                  const file = e.target.files[0];
                                  if (file) {
                                      editSlide(project.id, "preview", { background: file,background_preview: URL.createObjectURL(file) });
                                  }
                                }} />
                                <img src={project.preview.background_preview?project.preview.background_preview : api_url + "/uploads/" + project.preview.background} alt="" />
                              </div> 
                            </div>
                        </div>

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
                              <SlideEdit key={project.id+""+slide.slide_id} slide={slide} projectId={project.id} editSlide={editSlide} editImage={editImage} deleteSlide={deleteSlide} />
                            ))}
                          </SortableContext>
                        </DndContext>

                        <div className='bottom-buttons'>
                          <button onClick={newSlide(project.id)}>+ Ajouter une slide</button>
                          <button onClick={() =>save_changes(project.id)}>Sauvegarder les modifications</button>
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
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            
            <h2>Ajouter une catégorie</h2>
            <input type="text" id="new-category" placeholder="Nom de la catégorie" />
              <button onClick={() => {
                const newCategory = document.getElementById("new-category").value;
                if (newCategory && !types.includes(newCategory)) {
                  setTypes(prev => [...prev, newCategory]);
                  setShowModal(false);
                }
              }}>Ajouter</button>
          </div>
        </div>
      )}
      {saveStatus !== "idle" && (
        <div className={`saving-overlay ${saveStatus}`}>
          
          {saveStatus === "loading" && (
            <>
              <div className="loader"></div>
              <p>Sauvegarde en cours…</p>
            </>
          )}

          {saveStatus === "success" && (
            <>
              <div className="icon success">✓</div>
              <p>Sauvegardé</p>
            </>
          )}

          {saveStatus === "error" && (
            <>
              <div className="icon error">✕</div>
              <p>Erreur de sauvegarde</p>
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default Dashboard;
