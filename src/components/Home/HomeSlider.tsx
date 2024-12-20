"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Image,{StaticImageData} from "next/image";

// Import modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import FadeIn from "../Animated/FadeIn";

// Static Images
import slider1 from "../../../public/slider1.png";
import slider2 from "../../../public/slider2.png";
import slider3 from "../../../public/slider3.png";
import herosectionImg from "../../../public/herosectionImg.png";


const carouselItems = [
  { id: 1, imageUrl: slider1 },
  { id: 2, imageUrl: slider2 },
  { id: 3, imageUrl: slider3 },
];

export const HomeSlider = () => {
  return (
    <div className="relative">

      <FadeIn>
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
      </FadeIn>

      {/* Responsiveness for Mobile Specific */}
      <div className="md:hidden flex flex-col justify-center items-center my-3">
        <h1 className="text-md font-medium my-4 text-textgray">
          NEUROANATOMY BOOKS
        </h1>
        <h1 className="w-[90%] mx-auto text-lg font-medium text-center">
          A PIONEERING INTERACTIVE APPROACH TO THE TEACHING OF NEUROANATOMY
        </h1>
        <button className="text-white px-4 py-1 my-3 rounded-full font-semibold text-sm bg-secondary">
          SHOP NOW
        </button>

        <Image
          src={herosectionImg}
          alt="hero-sectionImg"
          width={1920}
          height={600}
        />
      </div>
    </div>
  );
};
