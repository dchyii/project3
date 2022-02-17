import React from "react";
import Cards from "../../Subcomponents/Cards";

const Photos = (props) => {
  const cardPhoto = props.photos.map((photo, key) => {
    return <Cards photos={photo} key={key} />;
  });
  return <div>{cardPhoto}</div>;
};

export default Photos;
