import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carrousel",
  VIDEO: "video",
  PREVIEW: "preview"
};

const SlideEdit = ({ slide, projectId, editSlide, deleteSlide }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: slide.slide_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="slides-edit">

      <h2>{slide.type}</h2>

      <div className="slide-editor">
      <div className="drag-handle" {...attributes} {...listeners} aria-label="drag handle" title="Déplacer">
        ☰
      </div>
      <div className="delete-slide" onClick={() => deleteSlide(projectId, slide.slide_id)} title="Supprimer la diapositive">
        x
      </div>
        <select
          value={slide.type}
          onChange={e => editSlide(projectId, slide.slide_id, { type: e.target.value })}
        >
          <option value={type_slide.IMAGE}>Image</option>
          <option value={type_slide.VIDEO}>Vidéo</option>
          <option value={type_slide.CARROUSSEL}>Carrousel</option>
        </select>

        {slide.type === type_slide.IMAGE && (
          <>
            <input
              type="text"
              value={slide.text}
              placeholder="Texte"
              onChange={e => editSlide(projectId, slide.slide_id, { text: e.target.value })}
            />

            <input
              type="text"
              value={slide.text_loc}
              placeholder="Position du texte"
              onChange={e => editSlide(projectId, slide.slide_id, { text_loc: e.target.value })}
            />

            <img src={slide.background!=""?slide.background:null} alt="" />
          </>
        )}
        {slide.type === type_slide.VIDEO && (
          <>
            <video autoPlay muted loop playsInline preload="none">
              <source src={slide.video} type="video/mp4" />
            </video>
          </>
        )}
        {slide.type === type_slide.CARROUSSEL && (
          <>
            <img src={slide.background || ""} alt="" />

            <div className="carrousel-images-editor">
              {Array.isArray(slide.images) && slide.images.map((image, idx) => (
                <div key={idx} className="carrousel-image-editor">
                  <img src={image} alt="" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SlideEdit;
