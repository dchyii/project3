import React from "react";
import Cards from "../../Subcomponents/Cards";

const Photos = (props) => {
  return (
    <div>
      <Cards photos={props.photos} />
    </div>
  );
};

export default Photos;
