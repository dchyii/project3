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

const FeaturedPhotographers = () => {
  return (
    <div className="Featured">
      <p className="FeaturedP font-extrabold text-2xl">
        Featured Photographers
      </p>
      <div className="w-full text-right px-10">
        <Link to={`/photographers`}>Show All</Link>
      </div>
      <div className="w-full">
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
          keyboard={{ enabled: false }}
          mousewheel={true}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
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

export default FeaturedPhotographers;
