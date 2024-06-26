import React from "react";
import UpdateProfileForm from "./components/UpdateProfileForm";
import { checkAuth } from "@/services/auth/checkAuth";
import { redirect } from "next/navigation";
import Address from "./components/Address";
import UpdateProfilePic from "./components/UpdateProfilePic";
import { fetchAddress } from "@/services/profile";
import ChangePassword from "./components/ChangePassword";

export default async function page() {
  const user = await checkAuth();

  const addressList = await fetchAddress();

  if (!user) {
    redirect("/?login=true&redirect=/profile");
  }

  return (
    <div className="p-4">
      <div className="max-w-screen-xl mx-auto bg-blue-gray-50 shadow-lg rounded-md p-4 mt-44 md:mt-20">
        <div className="h-full">
          <div className="h-full border border-black border-opacity-15 rounded-md p-4">
            <div className="flex flex-col md:flex-row gap-4 h-full">
              <div className="flex-1">
                <UpdateProfilePic />

                <div className="w-full my-4">
                  <UpdateProfileForm user={user} />
                </div>
              </div>
              <div className="border-l border-black border-opacity-15 h-full ml-3"></div>
              <div className="flex-1">
                <Address addressList={addressList} />

                <hr className="hidden md:block border-1 border-blue-gray-100 w-full mt-6" />

                <h4 className="mons font-semibold mt-3">Change Password</h4>

                <ChangePassword />

                {/* <div className="hidden md:flex flex-col items-center justify-center h-[200px] bg-gray-100 rounded-md mt-6">
                  <h4 className="mons font-semibold text-lg text-gray-800">
                    Comming Soon
                  </h4>
                  <small
                    className="
                    text-sm
                    font-medium
                    mons
                    text-gray-800
                    mb-1
                    mt-2
                  "
                  >
                    Working on this feature. It will be available soon.
                  </small>
                </div>  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
