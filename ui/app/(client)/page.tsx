import Hero from "./components/Hero";
import Downlist from "./components/Downlist";
import NewArrival from "./components/NewArrival";
import BestSelling from "./components/BestSelling";
import HomeBanner from "./components/HomeBanner";

export default async function Home() {
  return (
    <div className="w-full mons min-h-screen">
      <main>
        <Hero />
        <Downlist />
        <BestSelling />
        <NewArrival />
        <HomeBanner />
      </main>
    </div>
  );
}
