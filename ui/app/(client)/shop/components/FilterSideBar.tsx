import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import FilterBox from "../shared/FilterBox";

export default function FilterSideBar() {
  return (
    <aside className="flex-[0.4] h-full p-2 bg-white border border-blue-gray-100 static md:sticky md:top-4">
      <div className="h-full bg-blue-gray-50 p-2 mt-2">
        <div className="flex items-center gap-2">
          <LuLayoutDashboard className="text-2xl text-blue-gray-500" />
          <h1 className="text-xl font-bold mons">Filters</h1>
        </div>
      </div>
      <FilterBox />
    </aside>
  );
}
