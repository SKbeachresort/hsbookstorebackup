import Image from "next/image";
import { HomeSlider } from "./components/Home/HomeSlider";
import { HomeExplore } from "./components/Home/HomeExplore";
import { HomeCategory } from "./components/Home/HomeCategory";
import { HomeExploreSpecialists } from "./components/Home/HomeExploreSpecialists";
import { HomeDermatologySection } from "./components/Home/HomeDermatologySection";
import { ProductsRecommendations } from "./components/Home/ProductsRecommendations";
import { RecentlyAdded } from "./components/Home/RecentlyAdded";
import { VisitOurBlogSection } from "./components/Home/VisitOurBlogSection";

export default function Home() {
  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto sm:px-10 lg:px-12">
      <HomeSlider />
      <HomeCategory />
      <RecentlyAdded />
      <HomeExplore />
      <HomeExploreSpecialists />
      <ProductsRecommendations />
      <HomeDermatologySection />
      <VisitOurBlogSection />
    </div>
  );
}
