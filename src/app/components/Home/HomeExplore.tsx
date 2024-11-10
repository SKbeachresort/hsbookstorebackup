import React from 'react';

interface ExploreProps {
    name: string;
    imageUrl: string;
}

export const HomeExplore = () => {

  const exploreSection:ExploreProps[] = [
    {
        name:'Blood Pressure Monitors',
        imageUrl:'/medicaldress.png'
    },
    {
        name:'Stethoscopes',
        imageUrl:'/sthethoscope.png'
    },
    {
        name:'Suturing Kits',
        imageUrl:'/suits.png'
    },
    {
        name:'Hydration Bottles',
        imageUrl:'/bottomkit.png'
    }
  ]  
  return (
    <div>
        <div className="w-[90%] md:w-[75%] mx-auto my-[5vh]">
        <div className="flex flex-row flex-wrap gap-y-[2vh] justify-between ">
          {exploreSection.map((explore, index) => (
            <div
              key={index}
              className="bg-white rounded-md w-[47%] md:w-[23%] flex flex-col items-center"
            >
              <img
                src={explore.imageUrl}
                alt={explore.name}
                className="w-full object-cover"
              />
              <h2 className="text-[2vh] font-medium text-center mt-2">
                {explore.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
