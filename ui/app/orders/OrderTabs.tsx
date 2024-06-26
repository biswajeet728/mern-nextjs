"use client";

import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { MdCheckBox, MdLocalShipping } from "react-icons/md";
import { LuContainer } from "react-icons/lu";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Confirmed from "./components/Confirmed";
import OutForDelivery from "./components/OutForDelivery";
import Delivered from "./components/Delivered";
import { ResponseOrder } from "@/types";
import Received from "./components/Received";

// order status = confirmed, shipped, out for delivery, delivered

interface Props {
  receivedOrders: ResponseOrder[];
  confirmedOrders: ResponseOrder[];
  outForDeliveryOrders: ResponseOrder[];
  deliveredOrders: ResponseOrder[];
}

export function OrderTabs({
  receivedOrders,
  confirmedOrders,
  outForDeliveryOrders,
  deliveredOrders,
}: Props) {
  const data = [
    {
      label: "Received",
      value: "received",
      icon: LuContainer,
      desc: <Received receivedOrders={receivedOrders} />,
    },
    {
      label: "Confirmed",
      value: "confirmed",
      icon: MdCheckBox,
      desc: <Confirmed confirmedOrders={confirmedOrders} />,
    },
    {
      label: "Out for Delivery",
      value: "out-for-delivery",
      icon: MdLocalShipping,
      desc: <OutForDelivery outForDeliveryOrders={outForDeliveryOrders} />,
    },
    {
      label: "Delivered",
      value: "delivered",
      icon: ClipboardDocumentCheckIcon,
      desc: <Delivered deliveredOrders={deliveredOrders} />,
    },
  ];

  const [activeTab, setActiveTab] = React.useState("received");

  return (
    <>
      <div className="hidden md:block">
        <Tabs value={activeTab} orientation="vertical">
          <TabsHeader placeholder={""} className="w-48 h-64">
            {data.map(({ label, value, icon }, index) => (
              <Tab
                placeholder={""}
                key={value}
                value={value}
                className={`flex justify-start ${
                  index > data.length - 1 ? `mb-6` : ``
                } h-[60px]`}
                onClick={() => setActiveTab(value)}
              >
                <div className="flex items-center gap-2 mons">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  <span className="!mons">{label}</span>
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody placeholder={""}>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value} className="py-0 pr-0">
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>

      <div className="block md:hidden">
        <Tabs value={activeTab}>
          <TabsHeader
            placeholder={""}
            className="!overflow-x-scroll
            scrollbar-thin scrollbar-none
            flex gap-4 w-full 
          "
          >
            {data.map(({ label, value, icon }) => (
              <Tab
                placeholder={""}
                key={value}
                value={value}
                className="w-full h-20 flex justify-center items-center"
                onClick={() => setActiveTab(value)}
              >
                <div className="flex flex-col items-center">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  <span>{label}</span>
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody placeholder={""}>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </>
  );
}
