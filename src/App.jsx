import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import About from './components/about-me/about-me.jsx';
import Projects from './components/projects/Projects.jsx';
import { Col,Row } from "react-bootstrap";
import Footer from "./components/footer/Footer"
import React, { useEffect, useState } from "react";
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/admin/dashboard.jsx';
import Login from './components/users/login.jsx';
import ForgotPassword from './components/users/forgot_password.jsx';

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
          { <Route path="/admin" element={<Dashboard />} />}
          { <Route path="/login" element={<Login />} />}
          { <Route path="/reset_password" element={<ForgotPassword />} />}
        </Routes>
      </BrowserRouter>
      <Col className={`filter ${modalIsActive?"active":""}`} onClick={show_modal}>
          <Col className="contact-modal"  onClick={(e) => e.stopPropagation()}>
              <Row className="contact-header">
                  <h4>Une envie, une idée ?</h4>
                  <h4>Contactez moi pour en discuter et donner vie à votre projet !</h4>
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
