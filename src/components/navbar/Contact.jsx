import { Col,Row } from "react-bootstrap";
import Footer from "../footer/Footer"
import $ from "jquery";

const Contact = ({}) => {
    const [loading,setLoading]=React.useState(false);
    const [message,setMessage]=React.useState(null);
    const [error,setError]=React.useState(null);
    
    const api_url = import.meta.env.VITE_API_URL;

    const handleSubmint=(e)=> {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);
        $.ajax({
            url: ''+api_url+'site_api.php',
            method: 'POST',
            data: {
                action:"send_report",
                email: e.target[0].value,
                phone: e.target[1].value,
                message: e.target[2].value,
            },
            success: function(data) {
                setLoading(false);
                setMessage("Message envoyé avec succès");
            },
            error: function(err) {
                setLoading(false);
                setError("Erreur lors de l'envoi du message");
            }
        });
    }

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
                    <textarea placeholder="Parlez moi de vos envies, attentes ou questions"></textarea>
                    {loading && <p>Envoi en cours...</p>}
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </Row>
                <Row className="btn-container">
                    <button className="btn submit" onClick={handleSubmint}>Envoyer</button>
                </Row>
                <Row className="contact-footer">
                    <Footer/>
                </Row>
            </Col>
        </Col>
    );
}

export default Contact;