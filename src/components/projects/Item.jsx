import { Col, Row } from 'react-bootstrap';
import { useRef } from "react";
const Item = ({project, isSlideActive, onClick}) => {

    const projectRef = useRef(null);

    const scrollToproject = () => {
        if(!isSlideActive && 1==0){// FIXME: au scroll sur le première item items-container remonte avec. 
            const el = projectRef.current;
            setTimeout(() => {
                projectRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 1000);
        }
    };


    const slides_render = (slide, index) => {
        switch (slide.type) {
            case "image":
                return (
                    <Row key={index} xs="12" className={`slide-item image-slide ${slide.textLoc}`}>
                        <img src={slide.background} alt={`Slide ${index + 1}`} />
                        <p>{slide.text}</p>
                    </Row>
                );

            case "carrousel":
                return (
                    <Row key={index} xs="12" className='slide-item carrousel-slide' style={{ backgroundImage: `url(${slide.background})` }}>
                        <div className="carrousel">
                            {slide.images.map((image, imgIndex) => (
                                <img key={imgIndex} src={image} alt={`Carrousel Image ${imgIndex + 1}`} />
                            ))}
                        </div>
                    </Row>
                );

            case "video":
                return (
                    <Row key={index} xs="12" className='slide-item video-slide'>
                        <video controls autoPlay muted loop playsInline>
                            <source src={slide.video} type="video/mp4" />
                        </video>
                    </Row>
                );
                
            default:
                return null;
        }
    };

    const slides = project.slides.map((slide, index) => slides_render(slide, index));

    return (
        <div className="item-card">
            <div className="preview-item" onClick={() => { onClick();scrollToproject(); }}>
                <img src={project.preview.background} alt="Project Preview" />
                <Col xs="6" className='video-container'>
                    <video autoPlay muted loop playsInline preload="none" >
                        <source src={project.preview.video} type="video/mp4" />
                    </video>
                </Col>
                <Col xs="6" className="preview-text">
                    <h2><i>{project.preview.title}</i></h2>
                    <h3>{project.preview.subtitle}</h3>
                    <p>{project.preview.description}</p>
                </Col>
            </div>
            <Row className={`slides-container ${isSlideActive ? 'active-slide' : ''}`} ref={projectRef}>
                {slides}
            </Row>
        </div>
    );
}
export default Item;