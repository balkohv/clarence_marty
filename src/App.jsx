import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import About from './components/about-me/about-me.jsx';
import Projects from './components/projects/Projects.jsx';
import { Col,Row } from "react-bootstrap";
import Footer from "./components/footer/Footer"
import React from 'react';
import Navbar from './components/navbar/Navbar';

function App() {

  const [modalIsActive,setModalIsActive] = React.useState(false);

  const show_modal = () => {
    setModalIsActive(!modalIsActive);
  };

  return (
    <>
    <Navbar page="projects" show_modal={show_modal}></Navbar>
      <BrowserRouter>
        <Routes>
          { <Route path="/" element={<About isServices={0}/>} /> }
          { <Route path="/services" element={<About isServices={1}/>} /> }
          { <Route path="/projects" element={<Projects />} /> }
          {/* <Route path="/cv" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
      <Col className={`filter ${modalIsActive?"active":""}`} onClick={show_modal}>
          <Col className="contact-modal"  onClick={(e) => e.stopPropagation()}>
              <Row className="contact-header">
                  <h4>Décrivez moi le projet de vos rêves</h4>
                  <h5>Je m'occupe du reste</h5>
              </Row>
              <Row className="contact-content">
                <div>
                  <input type="text" placeholder="Adresse Email" />
                  <input type="text" placeholder="Numéro de téléphone"/>
                </div>
                <textarea placeholder="Parlez moi de vos envies, attentes ou questions"></textarea>
                <div className='btn-container'>
                  <button className="btn submit">Envoyer</button>
                </div>
              </Row>
              <Row className="contact-footer">
                  <Footer/>
              </Row>
          </Col>
      </Col>
    </>
  )
}

export default App
