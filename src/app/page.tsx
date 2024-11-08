import Image from "next/image";
import { HomeSlider } from "./components/Home/HomeSlider";
import { HomeCategory } from "./components/Home/HomeCategory";

export default function Home() {
  return (
    <div className="md:h-[150vh]">
      <HomeSlider />
      <HomeCategory />
    </div>
  );
}
