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

import "./Top10.css";

const Top10 = () => {
  return (
    <div className="Top10">
      <p className="T10">Top 10 Photos</p>
      <Link to={`/photos`} style={{ textAlign: "right" }}>
        Show All
      </Link>

      <div className="container">
        <br></br>
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
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          loopFillGroupWithBlank={false}
          keyboard={{ enabled: true }}
          mousewheel={true}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className="mySwiper"
        >
          <SwiperSlide></SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 2</SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 3</SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 4</SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 5</SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 6</SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 7</SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 8</SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 9</SwiperSlide>
          <br></br>
          <SwiperSlide>Slide 10</SwiperSlide>
          <br></br>
        </Swiper>
      </div>
    </div>
  );
};

export default Top10;
