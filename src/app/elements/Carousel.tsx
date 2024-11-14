"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CarouselProps {
  slides: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {

  const swiperRef = useRef<any>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);

  const totalSlides = slides.length;
  const slidesPerView = 6; 
  const totalPages = Math.ceil(totalSlides / slidesPerView);

  const updateProgress = (swiper: any) => {
    const currentSlideIndex = swiper.realIndex + 1; 
    const progress = (currentSlideIndex / totalSlides) * 100; 
    setProgress(progress); 
    setCurrentPage(currentSlideIndex);
    setIsAtStart(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };

  useEffect(() => {
    if (swiperRef.current) {
      updateProgress(swiperRef.current.swiper);
    }
  }, [swiperRef]);

  const handleSlideChange = (swiper: any) => {
    updateProgress(swiper);
  };
  return (
    <div className="relative">
      {/* Previous Button */}
      <div
        className={`absolute top-[45%] z-40 left-0 custom-prev bg-disableGray shadow-xl rounded-full p-1 ${
          isAtStart
            ? "opacity-0 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FiChevronLeft size={30} className="text-white" />
      </div>

      {/* Next Button */}
      <div
        className={`absolute top-[45%] z-40 right-0 custom-next bg-disableGray shadow-lg rounded-full p-1 ${
          isAtEnd
            ? "opacity-0 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FiChevronRight size={30} className="text-white" />
      </div>

      <Swiper
        ref={swiperRef}
        pagination={false}
        autoplay={false}
        loop={false}
        breakpoints={{
          1: { slidesPerView: 2, slidesPerGroup: 2 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          768: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
          1280: { slidesPerView: 5, slidesPerGroup: 5 },
          1920: { slidesPerView: 6, slidesPerGroup: 6 },
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        onSlideChange={handleSlideChange}
        modules={[Autoplay, Navigation]}
        className="mySwiper my-4"
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