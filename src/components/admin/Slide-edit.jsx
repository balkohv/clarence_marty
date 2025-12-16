import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import $ from 'jquery';
import Add_image from "../../assets/add_image.png";

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carroussel",
  VIDEO: "video",
  PREVIEW: "preview"
};

const loc = {
  LEFT:"left",
  RIGHT:"right"
}

const api_url = "http://192.168.1.59/clarence/";

const SlideEdit = ({ slide, projectId, editSlide, editImage, deleteSlide }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: slide.slide_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  
  const deleteImageApi = (imageId) => {
    return $.ajax({
      url: api_url + 'image_api.php',
      method: 'DELETE',
      data: JSON.stringify({ id: imageId }),
    });
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
        <div className="form-data">
          <label htmlFor="type">Type de diapositive</label>
          <select
            name="type"
            value={slide.type}
            onChange={e => editSlide(projectId, slide.slide_id, { type: e.target.value })}
          >
            <option value={type_slide.IMAGE}>Image</option>
            <option value={type_slide.VIDEO}>Vidéo</option>
            <option value={type_slide.CARROUSSEL}>Carroussel</option>
          </select>
        </div>

        {slide.type === type_slide.IMAGE && (
          <>
            <div className="form-data">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                value={slide.text}
                name="description"
                placeholder="Texte"
                onChange={e => editSlide(projectId, slide.slide_id, { text: e.target.value })}
              />
            </div>
            <div className="form-data">
              <label htmlFor="text_loc">Position du texte</label>
              <select name="text_loc" id="text_loc" value={slide.text_loc} onChange={(e) => editSlide(projectId, slide.slide_id, { text_loc: e.target.value })}>
                <option value={loc.LEFT}>Gauche</option>
                <option value={loc.RIGHT}>Droite</option>
              </select>
              {/* <input
                type="text"
                value={slide.text_loc}
                name="text_loc"
                placeholder="Position du texte"
                onChange={(e) => editSlide(projectId, slide.slide_id, { text_loc: e.target.value })}
              /> */}
            </div>
            <div className="media-container">
              <div className="media">
                <button onClick={() => document.getElementById("image-background-slide-"+slide.slide_id).click()}>
                  Choisir un fond
                </button>
                <input id={"image-background-slide-"+slide.slide_id} type="file" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const previewURL = URL.createObjectURL(file);
                    editSlide(projectId, slide.slide_id, {
                      background_file: file,
                      background: file.name,
                      background_preview: previewURL
                    });
                  }
                }} /> 
                <img src={slide.background_preview?slide.background_preview : api_url + "/uploads/" + slide.background} alt="" />
              </div>
            </div>
             
          </>
        )}
        {slide.type === type_slide.VIDEO && (
          <>
            <div className="media-container">
              <div className="media">
                <button onClick={() => document.getElementById("video-slide-"+slide.slide_id).click()}>
                  Choisir une vidéo
                </button>
                <input id={"video-slide-"+slide.slide_id}  type="file" onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                      editSlide(projectId, slide.slide_id, { 
                        video_file: file, 
                        video: file.name,
                        video_preview: URL.createObjectURL(file) } );
                  }
                }} />
                <video key={slide.video_preview || slide.video} autoPlay muted loop playsInline controls preload="none">
                  <source src={slide.video_preview?slide.video_preview : api_url + "/uploads/" + slide.video} type="video/mp4" />
                </video>
              </div>
            </div>
          </>
        )}
        {slide.type === type_slide.CARROUSSEL && (
          <>
            <div className="media-container">
              <div className="media">
                <button onClick={() => document.getElementById("carroussel-background-slide-"+slide.slide_id).click()}>
                  Choisir un fond
                </button>
                <img src={slide.background_preview?slide.background_preview : api_url + "/uploads/" + slide.background} alt="" />
                <input id={"carroussel-background-slide-"+slide.slide_id}  type="file" onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                      editSlide(projectId, slide.slide_id, { 
                        background_file: file, 
                        background: file.name,
                        background_preview: URL.createObjectURL(file) } );
                  }
                }} />
              </div>
              <div className="carroussel-images-editor">
                {Array.isArray(slide.images) && slide.images.map((image, idx) => (
                  <div key={idx} className="carroussel-image-editor">
                    <button onClick={() => document.getElementById("carroussel-image-"+ image.image_id).click()}>
                      Choisir une image
                    </button>
                    <input id={"carroussel-image-"+ image.image_id}  type="file" onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                          editImage(projectId, slide.slide_id, image.image_id, { 
                            image_file: file, 
                            image: file.name,
                            image_preview: URL.createObjectURL(file) } );
                      }
                    } }/>
                    <div className="carroussel-image-container">
                      <img src={image.image_preview?image.image_preview:api_url+"/uploads/"+image.image} alt="" />
                      <div className="delete-image" onClick={() => {deleteImageApi(image.image_id);editImage(projectId, slide.slide_id, image.image_id, { archived: 1 });}} title="Supprimer l'image">
                        X
                      </div>
                    </div>
                  </div>
                ))}
                {Array.isArray(slide.images) && slide.images.length < 3 && (
                <div className="carroussel-image-editor ">
                  <button onClick={() => document.getElementById("carroussel-image-new").click()}>
                    Choisir une image
                  </button>
                  <div className="carroussel-image-container">
                    <img src={Add_image} alt="" />
                    <input id={"carroussel-image-new"}  type="file" onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                          editImage(projectId, slide.slide_id, "new", { 
                            image_file: file, 
                            image: file.name,
                            image_preview: URL.createObjectURL(file) } );
                      }
                    } }/>
                  </div>
                </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SlideEdit;
