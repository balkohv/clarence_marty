import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const type_slide = {
  IMAGE: "image",
  CARROUSSEL: "carrousel",
  VIDEO: "video",
  PREVIEW: "preview"
};
const SlideEdit = ({ slide,index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: slide.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}key={slide.id}  className='slides-edit'>
        <h2>{slide.type}</h2>
        <div className='slide-editor'>
            {slide.type === type_slide.IMAGE && (
                <>
                    <input type="text" defaultValue={slide.text} />
                    <input defaultValue={slide.textLoc} />
                    <input type="file" id={`slide_image_${index}_${slide.id}`} hidden/>
                    <img src={slide.background} alt="" />
                </>
            )}
            {slide.type === type_slide.VIDEO && (
                <>
                    <input type='file' id={`slide_video_${index}_${slide.id}`} hidden/>
                    <video autoPlay muted loop playsInline preload="none" >
                        <source src={slide.video} type="video/mp4" />
                    </video>
                </>
            )}
            {slide.type === type_slide.CARROUSSEL && (
                <>
                    <div className='carrousel-editor'>
                        <input type="file" id={`slide_carrousel_bg_${index}_${slide.id}`} hidden/>
                        <img src={slide.background} alt="" />
                        <div className='carrousel-images-editor'>
                            {slide.images.map((image,img_index)=>(
                                <div key={img_index} className='carrousel-image-editor'>
                                    <input type="file" id={`slide_carrousel_image_${index}_${slide.id}_${img_index}`} hidden/>
                                    <img src={image} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    </div>
  );
};
export default SlideEdit;
