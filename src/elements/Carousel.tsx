"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper as SwiperClass } from "swiper/types";

interface CarouselProps {
  slides: React.ReactNode[];
};

const Carousel: React.FC<CarouselProps> = ({ slides }) => {

  const swiperRef = useRef<SwiperClass | null>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);

  const totalSlides = slides.length;
  const slidesPerView = 6;
  const totalPages = Math.ceil(totalSlides / slidesPerView);

  const updateProgress = (swiper: SwiperClass) => {
    const currentSlideIndex = swiper.realIndex + 1;
    const progress = (currentSlideIndex / totalSlides) * 100;
    setProgress(progress);
    setCurrentPage(currentSlideIndex);
    setIsAtStart(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };

  useEffect(() => {
    if (swiperRef.current) {
      updateProgress(swiperRef.current);
    };
  }, []);

  const handleSlideChange = (swiper: SwiperClass) => {
    updateProgress(swiper);
  };

  return (
    <div className="">
      {/* Previous Button */}
      <div
        className={`absolute top-[34%] z-30 -left-[2%] custom-prev bg-white border-2 border-textgray shadow-xl rounded-full p-4 ${
          isAtStart ? "opacity-0" : "opacity-100 cursor-pointer"
        }`}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FiChevronLeft size={20} className="text-textgray" />
      </div>

      {/* Next Button */}
      <div
        className={`absolute top-[34%] translate-y-1/2 z-30 right-0 custom-next bg-white border-2 border-textgray shadow-lg rounded-full p-4 ${
          isAtEnd ? "opacity-0" : "opacity-100 cursor-pointer"
        }`}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FiChevronRight size={20} className="text-textgray" />
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        pagination={false}
        autoplay={false}
        loop={false}
        modules={[Pagination, Autoplay, Navigation]}
        breakpoints={{
          1: { slidesPerView: 2, slidesPerGroup: 2 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          768: { slidesPerView: 4, slidesPerGroup: 4 },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
        }}
        className="mySwiper my-4 mx-4"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex-shrink-0">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-gray-200 mt-4">
        <div
          className="absolute top-0 left-0 h-full bg-secondary"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
    </div>
  );
};

export default Carousel;