import React from "react";

interface ExploreSpecialistsProps {
  name: string;
  imageUrl: string;
}

export const HomeExploreSpecialists = () => {
  const exploreSpecialists: ExploreSpecialistsProps[] = [
    {
      name: "Dermatology",
      imageUrl: "/speciality/dermatology.png",
    },
    {
      name: "Surgery",
      imageUrl: "/speciality/surgery.png",
    },
    {
      name: "Pediatrics",
      imageUrl: "/speciality/periodtics.png",
    },
    {
      name: "Neurology",
      imageUrl: "/speciality/neurology.png",
    },
    {
      name: "10% OFF",
      imageUrl: "/speciality/10off.png",
    },
    {
      name: "Medical Devices",
      imageUrl: "/speciality/medicaldevices.png",
    },
    {
      name: "Scrubs and Tops",
      imageUrl: "/speciality/scrubstops.png",
    },
    {
      name: "USMILE Step 1",
      imageUrl: "/speciality/usmile.png",
    },
  ];

  return (
    <div className="my-[5vh]">
      <h1 className="text-[2.3vh] md:text-[3vh] text-center font-semibold">
        Explore more Specialists
      </h1>

      <div className="">
        <div className="flex flex-row flex-wrap gap-y-[2vh] justify-between ">
          {exploreSpecialists.map((specialist, index) => (
            <div
              key={index}
              className="bg-white rounded-md w-[47%] flex flex-col items-center md:w-[23%]"
            >
              <img
                src={specialist.imageUrl}
                alt={specialist.name}
                className="card-hover w-full object-cover"
              />
              <h2 className="text-[1.8vh] font-medium text-center mt-2">
                {specialist.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
