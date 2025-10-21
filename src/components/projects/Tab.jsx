import Item from './Item.jsx';
import eiko_bg from '../../assets/projects/eiko_bg.png';

const Tab = (category) => {

    const project = { //TODO: remplacer par un fetch json
        "preview": {
            "title": "test - a changer",
            "subtitle": "test - a changer",
            "description": "test - a changer",
            "background": eiko_bg,
            "video": "/videos/EKOI.mp4"
        },
        "slides": [
            {
                "type": "image", //image, video, carousel, text 
                "background": "/path/to/slide1.jpg"
            }
        ]
    };

    const projects = [project, project, project, project, project, project]; //TODO: remplacer par un fetch json

    return (
        <div className="tab-container">
            <div className="tab-info">
                <h2>test - a changer</h2>
                <h3>test - a changer</h3>
            </div>
            <div className="items-container">
                {projects.map((project, index) => (
                    <Item key={index} project={project} />
                ))}
            </div>
        </div>
    );
};
export default Tab;