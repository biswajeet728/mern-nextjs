import React from "react";
import AvtarBox from "./components/AvtarBox";
import UpdateProfileForm from "./components/UpdateProfileForm";
import { checkAuth } from "@/services/auth/checkAuth";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await checkAuth();

  if (!user) {
    redirect("/?login=true&redirect=/profile");
  }

  return (
    <div className="p-4">
      <div className="max-w-screen-xl mx-auto bg-blue-gray-50 shadow-lg rounded-md p-4">
        <div className="h-[550px]">
          <div className="h-full border border-black border-opacity-15 rounded-md p-4">
            <div className="flex gap-4 h-full">
              <div className="flex-1">
                <AvtarBox />

                <div className="w-full my-4">
                  <UpdateProfileForm />
                </div>
              </div>
              <div className="border-l border-black border-opacity-15 h-full ml-3"></div>
              <div className="flex-1">
                <h4 className="mons font-semibold mb-4">Profile Management</h4>

                <div className="flex items-center justify-center h-[200px] bg-gray-100 rounded-md">
                  <h4 className="mons font-semibold text-lg text-gray-800">
                    Comming Soon
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
