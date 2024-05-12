import React from "react";
import Heading from "../shared/Heading";
import { checkAuth } from "@/services/auth/checkAuth";
import { redirect } from "next/navigation";
import Container from "./Container";

async function page() {
  const user = await checkAuth();

  if (!user) {
    return redirect("/?login=true&redirect=/profile");
  }

  return (
    <div className="p-4 max-w-[1400px] mx-auto">
      <div className="max-w-full mt-36 md:mt-20">
        <Heading children={`Your Wishlist`} />
        <aside className="flex flex-wrap gap-6">
          <Container user={user} />
        </aside>
      </div>
    </div>
  );
}

export default page;
