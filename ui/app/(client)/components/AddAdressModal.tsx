"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";

interface AddAdressModalProps {
  open: boolean;
  handleOpen: () => void;
}

export default function AddAdressModal({
  open,
  handleOpen,
}: AddAdressModalProps) {
  return (
    <Dialog placeholder={""} size="xs" open={open} handler={handleOpen}>
      <DialogHeader placeholder={""} className="mons">
        Add New Address
      </DialogHeader>
      <DialogBody placeholder={""}>
        <div className="w-full">
          <Input label="First & Last Name" crossOrigin={""} />
        </div>
        <div className="w-full mt-4">
          <Input label="Mobile Number" crossOrigin={""} />
        </div>
        <div className="w-full mt-4">
          <Input label="Pincode" crossOrigin={""} />
        </div>
        <div className="w-full mt-4">
          <Input label="Flat, House No, Building" crossOrigin={""} />
        </div>
        <div className="w-full mt-4">
          <Input label="Area, Street" crossOrigin={""} />
        </div>
        <div className="w-full mt-4">
          <Input label="Landmark" crossOrigin={""} />
        </div>
        <div className="w-full mt-4">
          <Input label="City" crossOrigin={""} />
        </div>
      </DialogBody>
      <DialogFooter placeholder={""} className="gap-3">
        <Button placeholder={""} color="red" ripple onClick={handleOpen}>
          Cancel
        </Button>
        <Button placeholder={""} ripple>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
