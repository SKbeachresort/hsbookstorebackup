import React from "react";

export const HomeDermatologySection = () => {
  return (
    <div className="">
      <img
        src="/dermatologybook.png"
        className="w-full mx-auto hidden md:block"
      />

      <div className="md:hidden bg-[#E3F2F5] flex flex-col justify-center items-center my-[2vh]">
        <h1 className="text-[2vh] font-medium my-[2vh] text-textgray">
          DERMATOLOGY BOOK
        </h1>
        <h1 className="w-[90%] mx-auto text-[2.4vh] font-medium text-center">
          THE LEADING REFERENCE FOR UNDERSTANDING, DIAGNOSING, AND TREATING THE
          FULL SPECTRUM OF SKIN DISEASE
        </h1>
        <button className="text-white px-[4vh] py-[0.5vh] my-[2vh] rounded-full font-semibold text-[1.8vh] bg-secondary">
          SHOP NOW
        </button>

        <img
          src="/dermatologybookMob.png"
          alt="hero-sectionImg"
          className="w-[90%] mx-auto my-[2vh]"
        />
      </div>
    </div>
  );
};
