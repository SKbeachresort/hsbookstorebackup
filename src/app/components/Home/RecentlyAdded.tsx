"use client";
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/app/data/Products";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const RecentlyAdded = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <div className="w-[95%] mx-auto my-[7vh] md:w-[75%] relative">
      <div className="flex flex-row justify-between items-center my-[2vh]">
        <h1 className="text-[2.3vh] md:text-[2.6vh] font-medium">
          Recently Added
        </h1>
        <p className="text-[2vh] md:text-[2.3vh] font-semibold text-secondary underline">
          See all
        </p>
      </div>

      <div className="relative px-[2vh]">
        <div className="absolute top-[45%] z-40 left-0 custom-prev bg-disableGray shadow-xl rounded-full p-[0.5vh] ">
          <FiChevronLeft size={30} className="text-white" />
        </div>
        <div className="custom-next top-[45%] z-40 right-0 absolute custom-prev bg-disableGray shadow-lg rounded-full p-[0.5vh] ">
          <FiChevronRight size={30} className="text-white" />
        </div>

        <Swiper
          pagination={{ clickable: true }}
          autoplay={false}
          breakpoints={{
            1: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
          loop={true}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper my-[2vh]"
        >
          {products.map((product, index) => {
            const slug = product.name.replace(/\s+/g, "-").toLowerCase();
            return (
              <SwiperSlide key={index} className="flex-shrink-0">
                <ProductCard
                  name={product.name}
                  image={product.image}
                  currency={product.currency}
                  currencySymbol="$"
                  price={product.price}
                  cuttedPrice={product.cuttedPrice}
                  ratings={product.ratings}
                  navigate={slug}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
