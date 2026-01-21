import './Footer.css';
import instagram from '../../assets/instagram.png';
import mail from '../../assets/mail.png';
import telephone from '../../assets/telephone.png';

const Footer = () => {
    return (
        <div id="footer-container">
            <div id='footer-contact-text'>
                <p><img src={mail} alt="mail logo" /><a href="mailto:contact@clarencemarty.com" className="contact-button">contact@clarencemarty.com</a></p>
                <p><img src={telephone} alt="mail logo" />07 80 45 51 92</p>
                <p><a href="https://www.instagram.com/clarence_marty/" target="_blank"><img src={instagram} alt="mail logo" />clarence_marty</a></p>
            </div>
            <p>© {new Date().getFullYear()} Clarence Marty. Tous droits réservés. <a href="/privacy">Mentions légales</a></p>
        </div>
    );
};
export default Footer;