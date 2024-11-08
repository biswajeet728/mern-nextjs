"use client";

import React from "react";
import { GoDash, GoPlus } from "react-icons/go";
import {
  Button,
  Checkbox,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import AddAdressModal from "../../components/AddAdressModal";
import { AddressItem, Address as AddressType } from "@/services/profile";
import { useRouter } from "next/navigation";
import { useGlobalStoreContext } from "../../Providers/GlobalStoreProvider";
import AsyncButton from "../../components/AsyncButton";
import { toast } from "sonner";

export default function AddressBox({
  addressList,
}: {
  addressList: AddressType | null;
}) {
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
    <div className="flex-[1.7] mt-14 md:mt-0">
      <div className="border border-gray-400 shadow-sm rounded-sm w-full p-2">
        <div className="flex flex-wrap gap-3">
          {addressList?.items?.map((item, index) => (
            <div className="relative h-[200px] w-full md:w-[250px] bg-gray-100 shadow-sm border border-gray-200 p-2">
              <div>
                <p
                  className="
                text-base font-bold mons
                text-gray-800
                mb-1
              "
                >
                  {item.address}, <br />
                </p>
                <p
                  className="
                text-base font-medium mons
                text-gray-800
                mb-1
              "
                >
                  {item.city}, {item.state} {item.zipCode}
                </p>
                <p
                  className="
                text-base font-medium mons
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
                        checked={item.isDefault}
                        onClick={run}
                        disabled={loading}
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

          <Button
            placeholder={""}
            className="h-[200px] w-full md:w-[250px] bg-gray-100 shadow-none border border-gray-200 flex items-center justify-center hover:!shadow-none"
            color="gray"
            ripple
            size="lg"
            onClick={handleOpen}
          >
            <GoPlus className="text-5xl text-gray-300" />
          </Button>
        </div>
      </div>

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
  );
}
