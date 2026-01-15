import { Col, Row } from 'react-bootstrap';
import { useRef } from "react";


const api_url = import.meta.env.VITE_API_URL;
const Item = ({project,project_index, isSlideActive, onClick,close_item,isAdmin}) => {

    
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
                    <Row key={index} xs="12" className={`slide-item image-slide ${slide.text_loc}`}>
                        <img src={api_url+"/uploads/"+(slide.background!=""?slide.background:null)} alt={`Slide ${index + 1}`} />
                        <p>{slide.text}</p>
                    </Row>
                );

            case "carroussel":
                return (
                    <Row key={index} xs="12" className='slide-item carrousel-slide' >
                        <img src={api_url+"/uploads/"+(slide.background!=""?slide.background:null)} alt={`Carrousel Background`} className="carrousel-background" />
                        <div className="carrousel">
                            {slide.images.map((image, imgIndex) => (
                                image.image && image.image.toLowerCase().endsWith('.mp4') ? (
                                    <video key={image.image_id} autoPlay muted loop playsInline>
                                        <source src={api_url+"/uploads/"+(image.image!=""?image.image:null)}type="video/mp4" />
                                    </video>
                                ) : (
                                    <img key={imgIndex} src={api_url+"/uploads/"+(image.image!=""?image.image:null)} alt={`Carrousel Image ${imgIndex + 1}`} />
                                )
                            ))}
                        </div>
                    </Row>
                );

            case "video":
                return (
                    <Row key={index} xs="12" className='slide-item video-slide'>
                        <video controls autoPlay muted loop playsInline>
                            <source src={api_url+"/uploads/"+(slide.video!=""?slide.video:null)} type="video/mp4" />
                        </video>
                    </Row>
                );
                
            default:
                return null;
        }
    };

    const slides = project.slides.map((slide, index) => slides_render(slide, index));
    return (
        <div className={`item-card ${isSlideActive==project_index?"":isSlideActive===null ? '' : 'disabled'}`}>
            <div className='filter' onClick={() => { close_item() }}>
            </div>
            <div className="preview-item" onClick={() => { onClick();scrollToproject(); }}>
                <img src={api_url+"/uploads/"+project.preview.background} alt="Project Preview" />
                <Col xs="6" className='video-container'>
                    <video autoPlay muted loop playsInline preload="none" >
                        <source src={api_url+"/uploads/"+(project.preview.video)} type="video/mp4" />
                    </video>
                </Col>
                <Col xs="6" className="preview-text">
                    <h2><i>{project.preview.title}</i></h2>
                    <h3>{project.preview.subtitle}</h3>
                    <p>{project.preview.description}</p>
                </Col>
                <Row className='down'><span>^</span></Row>
            </div>
            <Row className={`slides-container ${isSlideActive==project_index ? 'active-slide' : ''}`} ref={projectRef}>
                {slides}
            </Row>
        </div>
    );
}
export default Item;