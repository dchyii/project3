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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";

const Top10 = (props) => {
  const [groupSize, setGroupSize] = useState(1);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setGroupSize(1);
    } else {
      setGroupSize(3);
    }
  }, []);
  // console.log(props?.photos);
  // const sortedPhotos = props?.photos.sort((a, b) => {
  //   return a.imageLikes.length - b.imageLikes.length;
  // });
  const swiperRow = props.photos.map((photo, index) => {
    return (
      <SwiperSlide key={index}>
        <a href={`/${photo.username}/posts/${photo._id}`}>
          {/* update image author to username */}
          <img
            src={photo.imgPath}
            alt={photo.description}
            className="object-fill h-5/6 aspect-auto box-border"
          />
        </a>
      </SwiperSlide>
    );
  });

  return (
    <div className="Top10 h-full border border-red-500">
      <p className="T10 font-extrabold text-2xl absolute w-full">
        Top 10 Photos
      </p>
      <div className="w-full text-right px-10 absolute mt-7">
        <Link to={`/photos`}>Show All</Link>
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
          keyboard={{ enabled: true }}
          mousewheel={true}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="h-full"
        >
          {swiperRow}
          {/* <SwiperSlide>
            <img
              src={props?.photos[0]?.imgPath}
              alt="sample"
              className="object-fill h-5/6 aspect-auto box-border"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={props?.photos[3]?.imgPath}
              alt="sample"
              className="object-fill h-5/6 aspect-auto box-border"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={props?.photos[2]?.imgPath}
              alt="sample"
              className="object-fill h-5/6 aspect-auto box-border"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={props?.photos[3]?.imgPath}
              alt="sample"
              className="object-fill h-5/6 aspect-auto box-border"
            />
          </SwiperSlide> */}
          {/* <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
          <SwiperSlide>Slide 10</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default Top10;
