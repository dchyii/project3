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
  // console.log(props?.photos[0]);

  return (
    <div className="Featured h-full border border-green-500">
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
          <SwiperSlide>
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
          </SwiperSlide>
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

export default FeaturedPhotographers;
