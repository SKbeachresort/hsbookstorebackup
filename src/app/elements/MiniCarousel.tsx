import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper as SwiperClass } from "swiper/types";

interface MiniCarouselProps {
  slides: React.ReactNode[];
};

const MiniCarousel: React.FC<MiniCarouselProps> = ({ slides }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);

  const totalSlides = slides.length;
  const slidesPerView = 6;
  const totalPages = Math.ceil(totalSlides / slidesPerView);

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
        className={`absolute top-[34%] z-30 -left-[2%] custom-prev bg-white border-2 border-textgray shadow-xl rounded-full p-4 ${
          isAtStart ? "hidden" : "opacity-100 cursor-pointer"
        }`}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FiChevronLeft size={20} className="text-textgray" />
      </div>

      {/* Next Button */}
      <div
        className={`absolute top-[34%] z-30 right-0 custom-next bg-white border-2 border-textgray shadow-lg rounded-full p-4 ${
          isAtEnd ? "hidden" : "opacity-100 cursor-pointer"
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
          768: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex-shrink-0">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MiniCarousel;
