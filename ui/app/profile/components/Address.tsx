"use client";

import {
  Button,
  Checkbox,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import React from "react";
import { GoDash, GoPlus } from "react-icons/go";
import AddAdressModal from "../../components/AddAdressModal";
import { AddressItem, Address as AddressType } from "@/services/profile";
import AsyncButton from "../../components/AsyncButton";
import { toast } from "sonner";
import { useGlobalStoreContext } from "../../Providers/GlobalStoreProvider";
import { useRouter } from "next/navigation";

function Address({ addressList }: { addressList: AddressType | null }) {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const {
    getOneAddress,
    deleteAddress,
    updateDefaultAddress,
    selectedAddress,
    setSelectedAddress,
  } = useGlobalStoreContext();
  const [address, setAddress] = React.useState<AddressItem | null>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const findAndSetSelectedAddress = () => {
    for (var item of addressList?.items!) {
      if (item.isDefault) {
        setSelectedAddress(item);
        return;
      } else {
        setSelectedAddress(undefined);
      }
    }
  };

  React.useEffect(() => {
    if (addressList?.items?.length) {
      findAndSetSelectedAddress();
    }
  }, [addressList]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h4 className="mons font-semibold">Address Management</h4>

        <Button
          placeholder={""}
          className="flex items-center bg-white mons justify-center hover:!shadow-none border-none"
          ripple
          size="sm"
          variant="outlined"
          onClick={handleOpen}
        >
          <GoPlus className="text-2xl text-gray-500" />

          <span className="text-sm capitalize mons">Add Address</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {addressList?.items?.map((item, index) => (
          <div
            className="relative h-[170px] w-full md:w-[240px] bg-gray-100 shadow-sm border border-gray-200 p-2"
            key={index}
          >
            <div>
              <p
                className="
                text-sm font-bold mons
                text-gray-800
                mb-1
              "
              >
                {item.address}, <br />
              </p>
              <p
                className="
            text-sm font-medium mons
                text-gray-800
                mb-1
              "
              >
                {item.city}, {item.state} {item.zipCode}
              </p>
              <p
                className="
            text-sm font-medium mons
                text-gray-800
                mb-1
              "
              >
                {item.country}
              </p>
              <p>+91 {item.phone}</p>
            </div>

            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AsyncButton
                    action={async () => {
                      try {
                        const res = await getOneAddress(item._id);
                        if (res?.success) {
                          setIsEdit(true);
                          setAddress(res.item);
                          setOpen(true);
                        }
                      } catch (error) {
                        toast.error("Edit failed!");
                      }
                    }}
                    render={({ run, loading }) => (
                      <Button
                        placeholder={""}
                        className="flex items-center bg-white mons justify-center hover:!shadow-none"
                        color="green"
                        ripple
                        size="sm"
                        variant="outlined"
                        onClick={run}
                        loading={loading}
                        disabled={loading}
                      >
                        <span className="text-sm capitalize mons">Edit</span>
                      </Button>
                    )}
                  />
                  <AsyncButton
                    action={async () => {
                      try {
                        const res = await deleteAddress(item._id);
                        if (res?.success) {
                          router.refresh();
                          toast.success(
                            res?.message || "Address deleted successfully!"
                          );
                        }
                      } catch (error) {
                        toast.error("Edit failed!");
                      }
                    }}
                    render={({ run, loading }) => (
                      <IconButton
                        placeholder={""}
                        disabled={loading}
                        onClick={run}
                      >
                        {loading ? (
                          <Spinner color="red" width={20} />
                        ) : (
                          <GoDash className="text-red-300 text-2xl" />
                        )}
                      </IconButton>
                    )}
                  />
                </div>

                <AsyncButton
                  action={async () => {
                    try {
                      const res = await updateDefaultAddress(item._id);
                      if (res?.success) {
                        router.refresh();
                      }
                    } catch (error) {
                      toast.error("Could not update default address!");
                    }
                  }}
                  render={({ run, loading }) => (
                    <Checkbox
                      crossOrigin=""
                      ripple
                      className="h-6 w-6 rounded-full border-gray-900/20 transition-all hover:scale-105 hover:before:opacity-0"
                      color="green"
                      // checked={item.isDefault}
                      onClick={run}
                      disabled={loading}
                      defaultChecked={item.isDefault}
                    />
                  )}
                />
                {/* <Checkbox
                crossOrigin=""
                ripple
                className="h-6 w-6 rounded-full border-gray-900/20 transition-all hover:scale-105 hover:before:opacity-0"
                color="green"
                checked={item.isDefault}
                onClick={() => updateDefaultAddress(item._id)}
              /> */}
              </div>
            </div>
          </div>
        ))}
        {/* <Button
        placeholder={""}
        className="h-[170px] w-full md:w-[240px] bg-gray-100 shadow-none border border-gray-200 flex items-center justify-center hover:!shadow-none"
        color="gray"
        ripple
        size="lg"
        onClick={handleOpen}
      >
        <GoPlus className="text-5xl text-gray-300" />
      </Button> */}

        {isEdit ? (
          <AddAdressModal
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            address={address}
            setAddress={setAddress}
          />
        ) : (
          <AddAdressModal
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
            address={address}
            setAddress={setAddress}
          />
        )}
      </div>
    </>
  );
}

export default Address;
