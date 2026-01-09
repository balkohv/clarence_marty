import "./About-me.css";
import { use, useEffect } from "react";
import {useState} from 'react';
import React from "react";
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer';
import { Col, Row } from 'react-bootstrap';
import clarence_forest from '../../assets/clarence_forest.png';
import clarence from '../../assets/clarence.png';
import Instagram from '../../assets/SVG/instagram.svg?react';
import Mail from '../../assets/SVG/email.svg?react';
import Telephone from '../../assets/SVG/telephone.svg?react';
import Downarrow from '../../assets/SVG/Downarrow.svg?react';
import $ from 'jquery';

const AboutMe = ({isServices}) => {
    const servicesRef = React.useRef(null);
    const AboutRef = React.useRef(null);
    const api_url = import.meta.env.VITE_API_URL;
    const [logos, setLogos] = React.useState([]);

    useEffect(() => {
        if (localStorage.getItem('firstVisite') == null){
            $.ajax({
                url: api_url+'site_api.php',
                method: 'GET',
                data:{
                    action: "add_view"
                },
                success: (response) => {localStorage.setItem('firstVisite', 'true'); },
                error: (err) => { console.log(err); }
            });
        }
        $.ajax({
            url: ''+api_url+'site_api.php',
            method: 'GET',
            data: {
                action: "get_logos"
            },
            success: (response) => {
                if(response.status_code === 200) {
                    setLogos(response.data);
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }, []);

    const scrollToServices = () => {
        servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToAbout = () => {
        AboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        if (isServices) {
        scrollToServices();
        }
    }, [isServices]); 

    useEffect(() => {
        const video = document.querySelector(".background-video");
        const handleVisibility = () => {
        if (document.hidden) video.pause();
        else video.play();
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    return (
    <>
        <div className="video-section">
            <video autoPlay muted loop playsInline preload="none" className="background-video">
            <source src="/videos/video_about_me_bg.mp4" type="video/mp4" />
            </video>


            <div className="video-title">
            <h1>CLARENCE MARTY</h1>
            <h2>Vidéaste Freelance</h2>

            </div>
            <Downarrow className="down-arrow" onClick={scrollToAbout} />
        </div>
        <div className="about-me_container">
            <Row className="about-me-section" ref={AboutRef}>
            <Col xs={3} className="about-me-text">
                <h1>À propos</h1>
                <p>
                Basé dans le sud de la France, près de Toulouse, mais disponible partout dans le monde, j'accompagne les entreprises et les marques dans le développement de leur image et de leur présence en ligne grâce à des productions audiovisuelles soignées et créatives.<br/><br/>
                Passionné de VTT et de sports de plein air, cette énergie se reflète dans mes productions dynamiques. Grand amateur de cinéma et de musique, je puise également mon inspiration dans ces univers.<br/><br/>
                Mon expérience dans le monde du VTT m'a permis de développer une capacité à filmer dans toutes les conditions et à m'adapter rapidement.<br/><br/>
                </p>
            </Col>
            <Col x={8} className="about-me-image">
                <img src={clarence_forest} alt="Clarence Marty" />
            </Col>
            </Row>
            <Row ref={servicesRef} className='services-section'>
            <h1>Services</h1>
            <Row className='table-services'>
                <table>
                <tbody>
                    <tr>
                        <td><h2>Pré-production</h2></td>
                        <td>Capturer l'émotion et l'instant avec des vidéos dynamiques et cinématographiques, parfaites pour valoriser votre projet, votre marque ou votre événement.</td>
                    </tr>
                    <tr>
                        <td><h2>Tournage</h2></td>
                        <td>Des images qui marquent les esprits : portraits, reportages, produits ou événements, chaque cliché raconte une histoire unique.</td>
                    </tr>
                    <tr>
                        <td><h2>Post-Production</h2></td>
                        <td>Des vidéos qui captivent et donnent du rythme. Clips, interviews, reportages ou publicités, chaque montage sublime vos images et transmet un message fort.</td>
                    </tr>
                </tbody>
            </table>
            </Row>
            </Row>
            <Row className='logo-wall-section'>
            <h1>Ils m'ont fait confiance</h1>
                <div className="logo-wall">
                    {logos.map((logo_item, index) => (
                        <img key={index} src={api_url+"uploads/"+logo_item.logo} alt={logo_item.logo} />
                    ))}{/* 
                    <img src={logo.logo1} alt="Red Bull" />
                    <img src={logo.logo2} alt="GoPro" />
                    <img src={logo.logo3} alt="Specialized" />
                    <img src={logo.logo4} alt="Trek" />
                    <img src={logo.logo5} alt="Fox Racing" />
                    <img src={logo.logo6} alt="Shimano" />
                    <img src={logo.logo7} alt="Continental" />
                    <img src={logo.logo8} alt="Oakley" />
                    <img src={logo.logo9} alt="Monster Energy" /> */}
                </div>
            </Row>
            <Row className='contact-section'>
            <Col xs={4} className="contact-text">
                <h1>Contact</h1>

                <p>Une envie, une idée</p>
                <p>Contactez moi pour en discuter et donner vie a votre projet !</p>
                <p><Mail/><a href="mailto:martyc1812@gmail.com" className="contact-button">martyc1812@gmail.com</a></p>
                <p><Telephone/>07 80 45 51 92</p>
                <p><Instagram/>clarence_marty</p>
            </Col>
            <Col xs={8} className="contact-img">
                <img src={clarence} alt="Clarence marty" />
            </Col>
            </Row>
        </div>
        <Footer />
    </>

    );
    
};
export default AboutMe;
