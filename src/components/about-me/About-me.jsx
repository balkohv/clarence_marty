import "./About-me.css";
import { useEffect } from "react";
import { useRef } from "react";
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer';
import { Col, Row } from 'react-bootstrap';
import clarence_forest from '../../assets/clarence_forest.png';
import clarence from '../../assets/clarence.png';
import instagram from '../../assets/instagram.png';
import mail from '../../assets/mail.png';
import telephone from '../../assets/telephone.png';
import * as logo from '../../assets/logos';
import Downarrow from '../../assets/SVG/Downarrow.svg?react';

const AboutMe = ({isServices}) => {
    const servicesRef = useRef(null);
    const AboutRef = useRef(null);

    const scrollToServices = () => {
        servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToAbout = () => {
        AboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        if (isServices) {
        console.log("scroll to services");
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

            <Navbar page="about" />

            <div className="video-title">
            <h1>CLARENCE MARTY</h1>
            <h2>Vidéaste Freelance</h2>

            </div>
            <Downarrow className="down-arrow" onClick={scrollToAbout} />
        </div>
        <div>
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
            <h1>Il m'ont fait confiance</h1>
            <table>
                <tbody>
                <tr>
                    <td><img src={logo.logo2} alt="GoPro" /></td>
                    <td><img src={logo.logo3} alt="Specialized" /></td>
                    <td><img src={logo.logo4} alt="Trek" /></td>
                    <td><img src={logo.logo5} alt="Fox Racing" /></td>
                    <td><img src={logo.logo6} alt="Shimano" /></td>
                </tr>
                <tr>
                    <td><img src={logo.logo7} alt="Continental" /></td>
                    <td><img src={logo.logo8} alt="Oakley" /></td>
                    <td><img src={logo.logo9} alt="Monster Energy" /></td>
                </tr>
                </tbody>
            </table>
            </Row>
            <Row className='contact-section'>
            <Col xs={4} className="contact-text">
                <h1>Contact</h1>

                <p>Une Envie, une idée</p>
                <p>Contactez moi pour en discuter et donner vie a votre projet !</p>
                <p><img src={mail} alt="mail logo" /><a href="mailto:martyc1812@gmail.com" className="contact-button">martyc1812@gmail.com</a></p>
                <p><img src={telephone} alt="mail logo" />0780455192</p>
                <p><img src={instagram} alt="mail logo" />clarence_marty</p>
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
