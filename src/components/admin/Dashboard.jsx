import './Admin.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import eiko_bg from '../../assets/projects/eiko_bg.png';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


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
};

const project = {
preview: {
    title: "Ekiö",
    subtitle: "2024 MTB Range",
    description:
    "Entre deux manches de coupe du monde, j'ai réalisé une publicité pour la gamme de vêtements VTT gravity 2024 de la marque Ekoï, à destination de leurs réseaux sociaux.",
    background: eiko_bg,
    video: "/videos/EKOI.mp4",
},
stats:{
    views: 1245,
    archived: false
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
stats:{
    views: 3695,
    archived: true
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
};



const projects = [project, project2];

const Dashboard = () => {




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
                <Col className='projects_list'>
                    <table>
                        <thead>

                        </thead>
                        <tbody>
                            {projects.map((project,index)=>(
                                <tr>
                                    <td>{index}</td>
                                    <td>{project.preview.title}</td>
                                    <td>{project.preview.subtitle}</td>
                                    <td>{project.stats.views} views</td>
                                    <td><span className={`${project.stats.archived?"archived":"online"}`}>{project.stats.archived?"Archivé":"En ligne"}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                <Col className='preview'>
                </Col>
            </Row>
        </div>
    </>
)
};

export default Dashboard;