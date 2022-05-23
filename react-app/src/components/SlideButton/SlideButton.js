import React from "react";
import { FiArrowLeftCircle, FiArrowRightCircle} from 'react-icons/fi'

import './SlideButton.css'

function SlideButton({ direction, moveSlide, toggle, untoggle }) {

  

  return (
    <button
      onClick={moveSlide}
      
      // onMouseUp={toggle}
     
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
        <div className="iconButton">
      {direction === "next" ? <FiArrowRightCircle/> : <FiArrowLeftCircle/>}
        </div>
    </button>
  );
}

export default SlideButton