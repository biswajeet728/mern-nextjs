import React from "react";
import QuantityBox from "./QuantityBox";
import ActionBox from "./ActionBox";

export default function CartTable() {
  return (
    <div className="flex-1 p-2 bg-gray-50 shadow-md rounded-md h-full w-full overflow-y-hidden md:overflow-y-scroll">
      <div className="hidden pb-2 w-full md:flex items-center gap-3 justify-between">
        <div className="w-full flex-1">Product</div>
        <div className="w-full flex-[0.5]">Price</div>
        <div className="w-full flex-[0.5]">Quantity</div>
        <div className="w-full flex-[0.5]">Actions</div>
      </div>
      <hr className="hidden md:block w-full border-1 border-gray-500 mb-2" />
      <div className="overflow-x-scroll md:overflow-x-hidden pb-2 md:pb-0">
        <div className="flex items-center w-full justify-between gap-3 mb-3">
          <div className="w-full flex-[0] md:flex-1">
            <div className="hidden md:block">
              <img
                src="https://via.placeholder.com/150"
                alt="product"
                className="w-24 h-24 md:w-28 md:h-28 object-cover self-center mb-2"
              />
              <span className="hidden md:block">Canon 24.5px Camera</span>

              {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
            </div>
          </div>
          <div className="w-full -ml-2 md:ml-0 md:flex-[0.5]">
            <span className="text-lg font-bold md:font-normal mons">
              Rs.2000
            </span>
          </div>
          <div className="w-full flex-[0.6]">
            <QuantityBox />
          </div>
          <div className="w-full flex-[0.5]">
            <ActionBox />
          </div>
        </div>
        <div className="block md:hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="product"
            className="w-28 h-28 object-cover self-center mb-2"
          />
          <span className="hidden md:block">Canon 24.5px Camera</span>

          {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
        </div>
        <span className="block text-base font-bold md:font-normal md:text-lg md:hidden">
          Canon 24.5px Camera
        </span>
      </div>
      <hr className="w-full border-1 border-gray-500 mb-5 md:mb-2 mt-3 md:mt-0" />
      <div className="overflow-x-scroll md:overflow-x-hidden pb-2 md:pb-0">
        <div className="flex items-center w-full justify-between gap-3 mb-3">
          <div className="w-full flex-[0] md:flex-1">
            <div className="hidden md:block">
              <img
                src="https://via.placeholder.com/150"
                alt="product"
                className="w-24 h-24 md:w-28 md:h-28 object-cover self-center mb-2"
              />
              <span className="hidden md:block">Canon 24.5px Camera</span>

              {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
            </div>
          </div>
          <div className="w-full -ml-2 md:ml-0 md:flex-[0.5]">
            <span className="text-lg font-bold md:font-normal mons">
              Rs.2000
            </span>
          </div>
          <div className="w-full flex-[0.6]">
            <QuantityBox />
          </div>
          <div className="w-full flex-[0.5]">
            <ActionBox />
          </div>
        </div>
        <div className="block md:hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="product"
            className="w-28 h-28 object-cover self-center mb-2"
          />
          <span className="hidden md:block">Canon 24.5px Camera</span>

          {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
        </div>
        <span className="block text-base font-bold md:font-normal md:text-lg md:hidden">
          Canon 24.5px Camera
        </span>
      </div>
      <hr className="w-full border-1 border-gray-500 mb-5 md:mb-2 mt-3 md:mt-0" />
      <div className="overflow-x-scroll md:overflow-x-hidden pb-2 md:pb-0">
        <div className="flex items-center w-full justify-between gap-3 mb-3">
          <div className="w-full flex-[0] md:flex-1">
            <div className="hidden md:block">
              <img
                src="https://via.placeholder.com/150"
                alt="product"
                className="w-24 h-24 md:w-28 md:h-28 object-cover self-center mb-2"
              />
              <span className="hidden md:block">Canon 24.5px Camera</span>

              {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
            </div>
          </div>
          <div className="w-full -ml-2 md:ml-0 md:flex-[0.5]">
            <span className="text-lg font-bold md:font-normal mons">
              Rs.2000
            </span>
          </div>
          <div className="w-full flex-[0.6]">
            <QuantityBox />
          </div>
          <div className="w-full flex-[0.5]">
            <ActionBox />
          </div>
        </div>
        <div className="block md:hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="product"
            className="w-28 h-28 object-cover self-center mb-2"
          />
          <span className="hidden md:block">Canon 24.5px Camera</span>

          {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
        </div>
        <span className="block text-base font-bold md:font-normal md:text-lg md:hidden">
          Canon 24.5px Camera
        </span>
      </div>
      <hr className="w-full border-1 border-gray-500 mb-5 md:mb-2 mt-3 md:mt-0" />
      <div className="overflow-x-scroll md:overflow-x-hidden pb-2 md:pb-0">
        <div className="flex items-center w-full justify-between gap-3 mb-3">
          <div className="w-full flex-[0] md:flex-1">
            <div className="hidden md:block">
              <img
                src="https://via.placeholder.com/150"
                alt="product"
                className="w-24 h-24 md:w-28 md:h-28 object-cover self-center mb-2"
              />
              <span className="hidden md:block">Canon 24.5px Camera</span>

              {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
            </div>
          </div>
          <div className="w-full -ml-2 md:ml-0 md:flex-[0.5]">
            <span className="text-lg font-bold md:font-normal mons">
              Rs.2000
            </span>
          </div>
          <div className="w-full flex-[0.6]">
            <QuantityBox />
          </div>
          <div className="w-full flex-[0.5]">
            <ActionBox />
          </div>
        </div>
        <div className="block md:hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="product"
            className="w-28 h-28 object-cover self-center mb-2"
          />
          <span className="hidden md:block">Canon 24.5px Camera</span>

          {/* <div className="block md:hidden mt-4">
              <QuantityBox />
            </div> */}
        </div>
        <span className="block text-base font-bold md:font-normal md:text-lg md:hidden">
          Canon 24.5px Camera
        </span>
      </div>
      {/* <hr className="w-full border-1 border-gray-500 mb-5 md:mb-2 mt-3 md:mt-0" /> */}
    </div>
  );
}
