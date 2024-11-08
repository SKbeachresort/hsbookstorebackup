import React from 'react'

export const HomeCategory = () => {

  const categorySection = [
    {id:1, name:'Shop for Books', imageUrl: "/category/medicalbooks.png"},
    {id:2, name:'Shop for Medical Devices', imageUrl: "/category/medicaldevices.png"},
    {id:3, name:'Shop for Stethoscopes', imageUrl: "/category/sthethoscope.png"},
    {id:4, name:'Shop for Scrubs', imageUrl: "/category/scrubs.png"},
    {id:5, name:'Shop for Clipboards', imageUrl: "/category/clipboard.png"},
    {id:6, name:'Shop for Stethoscopes', imageUrl: "/category/sthethoscope.png"},
  ]; 

  return (
    <div className=''>
        <h1 className='text-[2.6vh] font-medium text-center'>Explore Categories</h1>

        <div className='w-[90%] md:w-[80%] mx-auto my-[2vh]'>
            <div className='flex flex-row flex-wrap gap-y-[2vh] justify-between items-center'>
                {categorySection.map((category, index) => (
                <div key={index} className='bg-white shadow-md rounded-md w-[47%] h-[36vh] flex flex-col justify-center items-center md:w-[25vh]'>
                    <img src={category.imageUrl} alt={category.name} className='w-full md:w-[20vh] h-[20vh] object-cover' />
                    <h2 className='text-[2vh] font-semibold text-center mt-2'>{category.name}</h2>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
};

// https://myte-au.atlassian.net/browse/HSB-11