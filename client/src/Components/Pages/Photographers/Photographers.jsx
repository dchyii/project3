import React from "react";
import PhotographerCard from "../../Subcomponents/PhotographerCard";

const Photographers = (props) => {
  return (
    <div>
      <PhotographerCard photo={props.photos} />
    </div>
  );
};

export default Photographers;
