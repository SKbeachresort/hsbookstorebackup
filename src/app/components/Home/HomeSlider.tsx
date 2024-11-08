"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const carouselItems = [
  { id: 1, imageUrl: "/slider1.png" },
  { id: 2, imageUrl: "/slider2.png" },
  { id: 3, imageUrl: "/slider3.png" },
];

export const HomeSlider = () => {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={false}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper md:w-[90%] my-[2vh] h-[25vh] md:h-[34vh]"
      >
        {carouselItems.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex items-center justify-center"
          >
            <div className="w-full h-full flex flex-col items-center rounded-lg overflow-hidden">
              <img
                src={item.imageUrl}
                alt={`Slide ${item.id}`}
                className="w-full h-full object-cover shadow-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};
