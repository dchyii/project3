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

const Top10 = () => {
  return (
    <div className="Top10 border border-orange-500 h-full">
      <p className="T10 font-extrabold text-2xl">Top 10 Photos</p>
      <div className="w-full text-right px-10">
        <Link to={`/photos`}>Show All</Link>
      </div>

      <div className="w-full h-full border border-green-500">
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
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
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
        >
          <SwiperSlide>
            {/* <p className="border border-red-500">Slide 1</p> */}
            <img
              src={
                "https://cdn.pixabay.com/photo/2016/11/21/00/47/view-1844110_1280.jpg"
              }
              alt="sample"
              className="border border-red-500"
            />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
          <SwiperSlide>Slide 10</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Top10;
