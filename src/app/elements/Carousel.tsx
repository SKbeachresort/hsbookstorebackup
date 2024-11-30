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
import { motion } from "framer-motion";

interface CarouselProps {
  slides: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalSlides = slides.length;
  const slidesPerView = 6;

  const updateProgress = (swiper: SwiperClass) => {
    const isBeginning = swiper.isBeginning;
    const isEnd = swiper.isEnd;

    // Calculate progress based on the visible slides
    const currentSlideIndex = swiper.realIndex + 1;
    const visibleSlides = Math.min(slidesPerView, totalSlides);
    const progress =
      (currentSlideIndex / (totalSlides - visibleSlides + 1)) * 100;

    setProgress(progress);
    setIsAtStart(isBeginning);
    setIsAtEnd(isEnd);
  };

  useEffect(() => {
    if (swiperRef.current) {
      updateProgress(swiperRef.current);
    }
  }, [slides]);

  const handleSlideChange = (swiper: SwiperClass) => {
    updateProgress(swiper);
  };

  return (
    <div className="relative">
      {/* Previous Button */}
      <div
        className={`absolute top-[34%] translate-y-1/2 z-30 -left-[2%] custom-prev bg-white border-2 border-textgray shadow-xl rounded-full p-4 ${
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
      <div className="relative hidden lg:block w-full h-1 bg-gray-200 mt-4">
        <motion.div
          className="absolute top-0 left-0 h-full bg-secondary"
          animate={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Carousel;
