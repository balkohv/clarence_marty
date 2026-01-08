import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import About from './components/about-me/About-me.jsx';
import Projects from './components/projects/Projects.jsx';
import { Col,Row } from "react-bootstrap";
import Footer from "./components/footer/Footer"
import React, { use, useEffect, useState } from "react";
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/admin/Dashboard.jsx';
import Login from './components/users/login.jsx';
import ForgotPassword from './components/users/Forgot_password.jsx';
import $ from "jquery";

function App() {

  const [modalIsActive,setModalIsActive] = React.useState(false);
  const [loading,setLoading]=React.useState("idle");
  const [message,setMessage]=React.useState(null);
  const [error,setError]=React.useState(null);
  
  const api_url = import.meta.env.VITE_API_URL;

  

  const handleSubmit=(e)=> {
      e.preventDefault();
      setLoading("loading");
      setMessage(null);
      setError(null);
      $.ajax({
          url: ''+api_url+'site_api.php',
          method: 'POST',
          data: {
              action:"send_report",
              email: e.target[0].value,
              phone: e.target[1].value,
              desc: e.target[2].value,
          },
          success: function(data) {
              setLoading("success");
              setMessage("Message envoyé avec succès");
              setTimeout(() =>{ setLoading("idle");show_modal();}, 1500);
              
          },
          error: function(err) {
              setLoading("error");
              setError("Erreur lors de l'envoi du message");
              setTimeout(() => setLoading("idle"), 2000);
          }
      });
  }


  const show_modal = () => {
    setModalIsActive(!modalIsActive);
  };
  
  return (
    <>
    <Navbar page="projects" show_modal={show_modal}></Navbar>
      <BrowserRouter>
        <Routes>
          { <Route path="/" element={<About isServices={0} />} /> }
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
              <Row>
                <form onSubmit={handleSubmit} className="contact-content">
                  <div>
                    <input type="text" placeholder="Adresse Email" />
                    <input type="text" placeholder="Numéro de téléphone"/>
                  </div>
                  <textarea placeholder="Parlez moi de vos envies, attentes ou questions"></textarea>
                  <div className='btn-container'>
                    <button className="btn submit">Envoyer</button>
                  </div>
                </form>
                {loading !== "idle" && (
                  <div className={`saving-overlay ${loading}`}>
                    
                    {loading === "loading" && (
                      <>
                        <div className="loader"></div>
                        <p>envoi en cours…</p>
                      </>
                    )}

                    {loading === "success" && (
                      <>
                        <div className="icon success">✓</div>
                        <p>Envoyé !</p>
                      </>
                    )}

                    {loading === "error" && (
                      <>
                        <div className="icon error">✕</div>
                        <p>Erreur de sauvegarde</p>
                      </>
                    )}

                  </div>
                )}
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
