
const Item = ({project}) => {
    return (
        <div className="item-card">
            <div className="preview-item">
                <img src={project.preview.background} alt="Project Preview" />
                <video autoPlay muted loop playsInline preload="none" >
                    <source src={project.preview.video} type="video/mp4" />
                </video>
                <div>
                    <h2>{project.preview.title}</h2>
                    <h3>{project.preview.subtitle}</h3>
                </div>
            </div>
        </div>
    );
}
export default Item;