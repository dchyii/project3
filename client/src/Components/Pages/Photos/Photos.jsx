import React from "react";
import Cards from "../../Subcomponents/Cards";

const Photos = (props) => {
  const cardPhoto = props.photos.map((photo, key) => {
    return <Cards photos={photo} key={key} />;
  });
  return (
    <div>
      {/* <Cards photos={props.photos} /> */}
      {cardPhoto}
    </div>
  );
};

export default Photos;

//     <div className="relative text-black w-1/2 p-2 inline-block" key={key}>
//       <div className=" bg-white w-full">
//         <p className="p-6 text-xs font-medium leading-3 absolute top-0 right-0">
//           Date Uploaded
//         </p>
//       </div>
//       <div className=" w-full">
//         <div className="absolute bottom-0 p-4 text-left w-3/4">
//           <h2 className="text-xl font-semibold 5">Description</h2>
//         </div>

//         <div className=" absolute bottom-0 right-0 p-3 text-white">
//           <LikeButton />
//         </div>

//         <img
//           className="object-fill aspect-auto "
//           src={photo.imgPath}
//           alt={photo.description}
//         />
//       </div>
//     </div>
//   );
// });
