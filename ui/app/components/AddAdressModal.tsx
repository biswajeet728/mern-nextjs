"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React, { useTransition } from "react";
import { useGlobalStoreContext } from "../Providers/GlobalStoreProvider";
import { addAddress, updateAddress } from "@/lib/server.actions";
import { toast } from "sonner";
import { AddressItem } from "@/services/profile";
import { useRouter } from "next/navigation";

interface AddAdressModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  isEdit?: boolean;
  setIsEdit?: any;
  address: AddressItem | null;
  setAddress: React.Dispatch<React.SetStateAction<AddressItem | null>>;
}

export default function AddAdressModal({
  open,
  setOpen,
  handleOpen,
  isEdit,
  setIsEdit,
  address,
  setAddress,
}: AddAdressModalProps) {
  const { user } = useGlobalStoreContext();
  const formRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const submitData = (data: FormData) => {
    startTransition(async () => {
      try {
        let res;
        if (isEdit) {
          res = await updateAddress(data, address?._id!);
        } else {
          res = await addAddress(data);
        }
        if (res?.success) {
          router.refresh();
          if (isEdit) {
            setIsEdit(false);
            setAddress(null);
          }
          handleOpen();
          formRef.current && formRef.current.reset && formRef.current.reset();
          toast.success(res.message);
        }
      } catch (error: any) {
        console.log(typeof error);
      }
    });
  };

  const closeEditModal = () => {
    if (isEdit) {
      setIsEdit(false);
      setAddress(null);
    }
    setOpen(false);
    formRef.current && formRef.current.reset && formRef.current.reset();
  };

  return (
    <Dialog placeholder={""} size="xs" open={open} handler={handleOpen}>
      <DialogHeader placeholder={""} className="mons">
        Add New Address
      </DialogHeader>
      <form action={submitData}>
        <DialogBody placeholder={""}>
          <div className="w-full">
            <Input
              label="First & Last Name"
              crossOrigin={""}
              name="fullName"
              defaultValue={address?.fullName}
            />
          </div>
          {!user?.profile?.phone || isEdit ? (
            <div className="w-full mt-4">
              <Input
                label="Phone Number"
                crossOrigin={""}
                name="phone"
                defaultValue={address?.phone}
              />
            </div>
          ) : null}
          <div className="w-full mt-4">
            <Input
              label="Flat, House No, Building"
              crossOrigin={""}
              name="houseno"
              defaultValue={address?.address.split(",")[0]}
            />
          </div>
          <div className="w-full mt-4">
            <Input
              label="Area, Street"
              crossOrigin={""}
              name="area"
              defaultValue={address?.address.split(",")[1]}
            />
          </div>
          <div className="w-full mt-4">
            <Input
              label="City"
              crossOrigin={""}
              name="city"
              defaultValue={address?.city}
            />
          </div>
          <div className="w-full mt-4">
            <Input
              label="State"
              crossOrigin={""}
              name="state"
              defaultValue={address?.state}
            />
          </div>
          <div className="w-full mt-4">
            <Input
              label="Country"
              crossOrigin={""}
              name="country"
              defaultValue={address?.country}
            />
          </div>
          <div className="w-full mt-4">
            <Input
              label="Pincode"
              crossOrigin={""}
              name="zipCode"
              defaultValue={address?.zipCode}
            />
          </div>
          <div className="w-full mt-4">
            <Input
              label="Landmark"
              crossOrigin={""}
              name="landmark"
              defaultValue={address?.landmark}
            />
          </div>
        </DialogBody>
        <DialogFooter placeholder={""} className="gap-3">
          <Button placeholder={""} color="red" ripple onClick={closeEditModal}>
            Cancel
          </Button>
          <Button
            placeholder={""}
            ripple
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            {isEdit ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
