import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carrousel",
  VIDEO: "video",
  PREVIEW: "preview"
};


const api_url = "http://192.168.1.59/clarence/";

const SlideEdit = ({ slide, projectId, editSlide, deleteSlide }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: slide.slide_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="slides-edit">
      <div className="slide-editor">
        <div className="logo">
          <div className="drag-handle" {...attributes} {...listeners} aria-label="drag handle" title="Déplacer">
            ☰
          </div>
          <div className="delete-slide" onClick={() => deleteSlide(projectId, slide.slide_id)} title="Supprimer la diapositive">
            x
          </div>
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
              onChange={(e) => editSlide(projectId, slide.slide_id, { text_loc: e.target.value })}
            />
            <input type="file" onChange={e => {
              const file = e.target.files[0];
              if (file) {
                  editSlide(projectId, slide.slide_id, { background: file });
              }
            }} />
            <img src={api_url+"/uploads/"+(slide.background!=""?slide.background:null)} alt="" />
          </>
        )}
        {slide.type === type_slide.VIDEO && (
          <>
            <input type="file" onChange={e => {
              const file = e.target.files[0];
              if (file) {
                  editSlide(projectId, slide.slide_id, { video: file });
              }
            }} />
            <video autoPlay muted loop playsInline cotrols preload="none">
              <source src={api_url+"/uploads/"+slide.video} type="video/mp4" />
            </video>
          </>
        )}
        {slide.type === type_slide.CARROUSSEL && (
          <>
            <img src={api_url+"/uploads/"+(slide.background || "")} alt="" />
            <input type="file" onChange={e => {
              const file = e.target.files[0];
              if (file) {
                  editSlide(projectId, slide.slide_id, { background: file });
              }
            }} />

            <div className="carrousel-images-editor">
              {Array.isArray(slide.images) && slide.images.map((image, idx) => (
                <div key={idx} className="carrousel-image-editor">
                  <img src={api_url+"/uploads/"+image} alt="" />
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
