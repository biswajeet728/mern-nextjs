import Hero from "./components/Hero";
import Downlist from "./components/Downlist";
import NewArrival from "./components/NewArrival";
import BestSelling from "./components/BestSelling";
import HomeBanner from "./components/HomeBanner";
import { getAllProducts } from "@/services/products";

export default async function Home() {
  const res = await getAllProducts();

  // find best selling products
  const bestSelling = res.products.filter((product) => product.isBestSelling);

  // find new arrival products
  const featuredProducts = res.products.filter((product) => product.isFeatured);

  return (
    <div className="w-full mons min-h-screen">
      <main>
        <Hero />
        <Downlist />
        <BestSelling products={bestSelling} />
        <NewArrival products={featuredProducts} />
        <HomeBanner />
      </main>
    </div>
  );
}
