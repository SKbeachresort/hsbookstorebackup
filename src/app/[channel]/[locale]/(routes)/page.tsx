import Image from "next/image";
import { HomeSlider } from "@/components/Home/HomeSlider";
import { HomeExplore } from "@/components/Home/HomeExplore";
import { HomeCategory } from "@/components/Home/HomeCategory";
import { HomeExploreSpecialists } from "@/components/Home/HomeExploreSpecialists";
import { HomeDermatologySection } from "@/components/Home/HomeDermatologySection";
import { ProductsRecommendations } from "@/components/Home/ProductsRecommendations";
import { RecentlyAdded } from "@/components/Home/RecentlyAdded";
import { VisitOurBlogSection } from "@/components/Home/VisitOurBlogSection";
import { PagesProps } from "./layout";

export default async function Home(props: PagesProps) {
  
  const params = await props.params;

  const {
    locale,
    channel
  } = params;

  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto sm:px-10 lg:px-12">
      <HomeSlider />
      <HomeCategory />
      <RecentlyAdded channel={channel} />
      <HomeExplore />
      <HomeExploreSpecialists />
      <ProductsRecommendations channel={channel} />
      <HomeDermatologySection />
      <VisitOurBlogSection />
    </div>
  );
}
