import React from "react";


import './SwipeLikeButtons.css'

function SwipeLikeButton({ direction, likePersonUser }) {
  console.log(direction, likePersonUser);
  return (
    <button
      onClick={likePersonUser}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
    </button>
  );
}

export default SwipeLikeButton