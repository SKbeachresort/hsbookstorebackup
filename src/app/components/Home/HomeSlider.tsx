"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Image from "next/image";

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
      <Image
        src="/servicebanner.png"
        width={1920}
        height={80}
        alt="service-banner"
        className="hidden md:block"
      />
      <Image
        src="/mobileservicebanner.png"
        width={1920}
        height={80}
        alt="service-banner"
        className="md:hidden"
      />

      <div className="hidden md:block my-1">
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
          className="mySwiper"
        >
          {carouselItems.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center"
            >
              <div className="w-full h-full flex flex-col items-center rounded-lg overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={`Slide ${item.id}`}
                  width={1920}
                  height={600}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Responsiveness for Mobile Specific */}
      <div className="md:hidden flex flex-col justify-center items-center my-[2vh]">
        
        <h1 className="text-[2.2vh] font-medium my-[2vh] text-textgray">
          NEUROANATOMY BOOKS
        </h1>
        <h1 className="w-[90%] mx-auto text-[2.7vh] font-medium text-center">
          A PIONEERING INTERACTIVE APPROACH TO THE TEACHING OF NEUROANATOMY
        </h1>
        <button className="text-white px-[4vh] py-[0.5vh] my-[2vh] rounded-full font-semibold text-[1.8vh] bg-secondary">
          SHOP NOW
        </button>

        <Image
          src="/herosectionImg.png"
          alt="hero-sectionImg"
          // className="w-[90%] mx-auto my-[2vh]"
          width={1920}
          height={600}
        />

      </div>
    </div>
  );
};
