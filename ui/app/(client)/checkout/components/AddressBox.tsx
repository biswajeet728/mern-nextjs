"use client";

import React from "react";
import { GoPlus } from "react-icons/go";
import { Button, Checkbox } from "@material-tailwind/react";
import AddAdressModal from "../../components/AddAdressModal";

export default function AddressBox() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex-1 mt-14 md:mt-0">
      <div className="border border-gray-400 shadow-sm rounded-sm w-full p-2">
        <div className="flex flex-wrap gap-3">
          <div className="relative h-[250px] w-full md:w-[300px] bg-gray-100 shadow-sm border border-gray-200 p-2">
            <div>
              <p
                className="
                text-base font-bold mons
                text-gray-800
                mb-1
              "
              >
                22 Radhakrishna Road, <br />
              </p>
              <p
                className="
                text-base font-medium mons
                text-gray-800
                mb-1
              "
              >
                Bhubaneswar, Odisha 751001
              </p>
              <p
                className="
                text-base font-medium mons
                text-gray-800
                mb-1
              "
              >
                India
              </p>
              <p>+91 9247877674</p>
            </div>

            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center justify-between gap-3">
                <Button
                  placeholder={""}
                  className="flex items-center bg-white mons justify-center hover:!shadow-none"
                  color="green"
                  ripple
                  size="sm"
                  variant="outlined"
                >
                  <span className="text-sm capitalize mons">Edit</span>
                </Button>

                <Checkbox
                  crossOrigin=""
                  ripple
                  className="h-8 w-8 rounded-full border-gray-900/20 transition-all hover:scale-105 hover:before:opacity-0"
                  color="green"
                />
              </div>
            </div>
          </div>
          <div className="relative h-[250px] w-full md:w-[300px] bg-gray-100 shadow-sm border border-gray-200 p-2">
            <div>
              <p
                className="
                text-base font-bold mons
                text-gray-800
                mb-1
              "
              >
                22 Radhakrishna Road, <br />
              </p>
              <p
                className="
                text-base font-medium mons
                text-gray-800
                mb-1
              "
              >
                Bhubaneswar, Odisha 751001
              </p>
              <p
                className="
                text-base font-medium mons
                text-gray-800
                mb-1
              "
              >
                India
              </p>
              <p>+91 9247877674</p>
            </div>

            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center justify-between gap-3">
                <Button
                  placeholder={""}
                  className="flex items-center bg-white mons justify-center hover:!shadow-none"
                  color="green"
                  ripple
                  size="sm"
                  variant="outlined"
                >
                  <span className="text-sm capitalize mons">Edit</span>
                </Button>

                <Checkbox
                  crossOrigin=""
                  ripple
                  className="h-8 w-8 rounded-full border-gray-900/20 transition-all hover:scale-105 hover:before:opacity-0"
                  color="green"
                />
              </div>
            </div>
          </div>
          <Button
            placeholder={""}
            className="h-[250px] w-full md:w-[300px] bg-gray-100 shadow-none border border-gray-200 flex items-center justify-center hover:!shadow-none"
            color="gray"
            ripple
            size="lg"
            onClick={handleOpen}
          >
            <GoPlus className="text-5xl text-gray-300" />
          </Button>
        </div>
      </div>

      <AddAdressModal open={open} handleOpen={handleOpen} />
    </div>
  );
}
