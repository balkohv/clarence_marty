import { Col,Row } from "react-bootstrap";
import Footer from "../footer/Footer"

const Contact = ({}) => {


    return(
        <Col className="filter">
            <Col className="contact-modal">
                <Row className="contact-header">
                    <h4>Décrivez moi le projet de vos rêves</h4>
                    <h5>Je m'occupe du reste</h5>
                </Row>
                <Row className="contact-content">
                    <input type="text" placeholder="Adresse Email" />
                    <input type="text" placeholder="Numéro de téléphone"/>
                    <textearea placeholder="Parlez moi de vos envies, attentes ou questions"></textearea>
                    <button className="btn submit">Envoyer</button>
                </Row>
                <Row className="contact-footer">
                    <Footer/>
                </Row>
            </Col>
        </Col>
    );
}

export default Contact;