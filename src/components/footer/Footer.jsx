import './Footer.css';
import instagram from '../../assets/instagram.png';
import mail from '../../assets/mail.png';
import telephone from '../../assets/telephone.png';

const Footer = () => {
    return (
        <div id="footer-container">
            <div id='footer-contact-text'>
                <p><img src={mail} alt="mail logo" /><a href="mailto:martyc1812@gmail.com" className="contact-button">martyc1812@gmail.com</a></p>
                <p><img src={telephone} alt="mail logo" />07 80 45 51 92</p>
                <p><img src={instagram} alt="mail logo" />clarence_marty</p>
            </div>
            <p>© 2024 Clarence Marty. Tous droits réservés.</p>
        </div>
    );
};
export default Footer;