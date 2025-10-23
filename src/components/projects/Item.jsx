import { Col, Row } from 'react-bootstrap';
const Item = ({project}) => {
    return (
        <div className="item-card">
            <div className="preview-item">
                <img src={project.preview.background} alt="Project Preview" />
                <Col xs="6" className='video-container'>
                    <video autoPlay muted loop playsInline preload="none" >
                        <source src={project.preview.video} type="video/mp4" />
                    </video>
                </Col>
                <Col xs="6" className='preview-text'>
                    <h2><i>{project.preview.title}</i></h2>
                    <h3>{project.preview.subtitle}</h3>
                    <p>{project.preview.description}</p>
                </Col>
            </div>
        </div>
    );
}
export default Item;