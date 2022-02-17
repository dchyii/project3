import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/bundle";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import { useEffect, useState } from "react";

const FeaturedPhotographers = (props) => {
  const [groupSize, setGroupSize] = useState(1);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setGroupSize(1);
    } else {
      setGroupSize(3);
    }
  }, []);

  const filterNoProfilePhoto = props?.users?.filter(
    (user) => user.profilePhoto
  );

  const filterNoPost = filterNoProfilePhoto?.filter((user) => {
    return (
      props.photos.findIndex((post) => post.imageAuthor === user.userid) !== -1
    );
  });

  let featuredPhotographers = [];
  for (let i = 0; i < Math.min(10, filterNoPost?.length); i++) {
    featuredPhotographers?.push(filterNoPost[i]);
  }

  const swiperRow = featuredPhotographers.map((user, index) => {
    return (
      <SwiperSlide key={index}>
        <a href={`/${user.username}/posts`}>
          <img
            src={user.profilePhoto}
            alt={user.username}
            className="object-fill h-5/6 aspect-auto box-border"
          />
        </a>
      </SwiperSlide>
    );
  });

  return (
    <div className="Featured h-full">
      <p className="FeaturedP font-extrabold text-2xl absolute w-full">
        Featured Photographers
      </p>
      <div className="w-full text-right px-10 absolute mt-7">
        <Link to={`/photographers`}>Show All</Link>
      </div>
      <div className="w-full h-full pt-20">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Keyboard,
            Mousewheel,
            Autoplay,
          ]}
          slidesPerView={groupSize}
          spaceBetween={30}
          slidesPerGroup={1}
          autoplay={{
            delay: 300000,
            disableOnInteraction: false,
          }}
          loop={true}
          loopFillGroupWithBlank={false}
          keyboard={{ enabled: false }}
          mousewheel={true}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="h-full"
        >
          {swiperRow}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedPhotographers;
