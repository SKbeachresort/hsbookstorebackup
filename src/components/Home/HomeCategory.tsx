// "use client";
// import React from "react";
// import Link from "next/link";
// import Image, { StaticImageData } from "next/image";
// import ZoomInSlideUp from "../Animated/ZoomInSlideUp";

// // Static Images
// import medicalbooks from "../../../public/category/medicalbooks.png";
// import medicaldevices from "../../../public/category/medicaldevices.png";
// import sthethoscope from "../../../public/category/sthethoscope.png";
// import scrubs from "../../../public/category/scrubs.png";
// import clipboards from "../../../public/category/clipboard.png";
// import { useRegionUrl } from "@/hooks/useRegionUrl";
// import { useHomeFeaturedCategoryQuery } from "../../../gql/graphql";

// export const HomeCategory = () => {
  
//   const { getRegionUrl } = useRegionUrl();

//   const { data } = useHomeFeaturedCategoryQuery({
//     variables: {
//       key: "HomeFeatured",
//       value: "Y",
//     },
//   });

//   const categories = data?.categories?.edges || [];

//   return (
//     <div className="my-10">
//       <div className="">
//         <div className="flex flex-row flex-wrap gap-2 md:gap-0 justify-center md:justify-between">
//           {categories.map(({ node }) => {
//             const categoryUrl =
//               node.level === 1 && node.parent
//                 ? `category/${node.parent.slug}/${node.slug}`
//                 : `category/${node.slug}`;

//             return (
//               <div
//                 key={node.id}
//                 className="md:w-[18%] rounded-md overflow-hidden flex flex-col items-start"
//               >
//                 <div className="w-full h-full">
//                   <Link href={getRegionUrl(categoryUrl)}>
//                     <div className="">
//                       <Image
//                         src={node.backgroundImage?.url || ""}
//                         alt={node.name}
//                         width={150}
//                         height={150}
//                         className="md:w-[90%] rounded-lg bg-[#EEEEF0] object-contain aspect-square mx-auto 3xl:w-full hover:scale-110 transition-all duration-300"
//                       />
//                     </div>

//                     <h2 className="text-[0.5rem] md:text-xs 3xl:text-md font-semibold text-center mt-2">
//                       Shop for {node.name}
//                     </h2>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import React from "react";
import Link from "next/link";
import Image,{StaticImageData} from "next/image";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";

// Static Images
import medicalbooks from "../../../public/category/medicalbooks.png";
import medicaldevices from "../../../public/category/medicaldevices.png";
import sthethoscope from "../../../public/category/sthethoscope.png";
import scrubs from "../../../public/category/scrubs.png";
import clipboards from "../../../public/category/clipboard.png";
import { useRegionUrl } from "@/hooks/useRegionUrl";

interface CategoryProps {
  id: number;
  name: string;
  imageUrl: StaticImageData;
  slug: string;
};

export const HomeCategory = () => {
  const { getRegionUrl } = useRegionUrl();
  const categorySection: CategoryProps[] = [
    {
      id: 1,
      name: "Shop for Books",
      imageUrl: medicalbooks,
      slug: "books",
    },
    {
      id: 2,
      name: "Shop for Medical Devices",
      imageUrl: medicaldevices,
      slug: "medical-devices",
    },
    {
      id: 3,
      name: "Shop for Stethoscopes",
      imageUrl: sthethoscope,
      slug: "stethoscopes",
    },
    {
      id: 4,
      name: "Shop for Scrubs",
      imageUrl: scrubs,
      slug: "scrabs",
    },
    {
      id: 5,
      name: "Shop for Accessories",
      imageUrl: clipboards,
      slug: "accessories-2",
    },
  ];

  return (
    <div className="my-10">
      <div className="">
        <div className="flex flex-row flex-wrap gap-2 md:gap-0 justify-center md:justify-between">
          {categorySection.map((category, index) => (
            <div
              key={index}
              className="bg-white md:w-[18%] rounded-md flex justify-center flex-col items-center"
            >
              <ZoomInSlideUp>
                <Link href={getRegionUrl(`category/${category.slug}`)}>
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="md:w-[90%] mx-auto 3xl:w-full hover:scale-110 transition-all duration-300"
                  />
                  <h2 className="text-[0.6rem] md:text-xs 3xl:text-md font-semibold text-center mt-2">
                    {category.name}
                  </h2>
                </Link>
              </ZoomInSlideUp>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};