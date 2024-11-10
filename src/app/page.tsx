import Image from "next/image";
import { HomeSlider } from "./components/Home/HomeSlider";
import { HomeExplore } from "./components/Home/HomeExplore";
import { HomeCategory } from "./components/Home/HomeCategory";
import { HomeExploreSpecialists } from "./components/Home/HomeExploreSpecialists";
import { HomeDermatologySection } from "./components/Home/HomeDermatologySection";
import { RecentlyAdded } from "./components/Home/RecentlyAdded";

export default function Home() {
  return (
    <div className="">
      <HomeSlider />
      <RecentlyAdded />
      <HomeCategory />
      <HomeExplore />
      <HomeExploreSpecialists />
      <HomeDermatologySection />
    </div>
  );
}
