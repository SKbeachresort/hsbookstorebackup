import Image from "next/image";
import { HomeSlider } from "./components/Home/HomeSlider";
import { HomeExplore } from "./components/Home/HomeExplore";
import { HomeCategory } from "./components/Home/HomeCategory";
import { HomeExploreSpecialists } from "./components/Home/HomeExploreSpecialists";
import { HomeDermatologySection } from "./components/Home/HomeDermatologySection";
import { RecentlyAdded } from "./components/Home/RecentlyAdded";
import { ProductsRecommendations } from "./components/Home/ProductsRecommendations";

export default function Home() {
  return (
    <div className="">
      <HomeSlider />
      <HomeCategory />
      <RecentlyAdded />
      <HomeExplore />
      <HomeExploreSpecialists />
      <ProductsRecommendations />
      <HomeDermatologySection />
    </div>
  );
}
