"use client";

import React, { useTransition } from "react";
import AvtarBox from "./AvtarBox";
import ButtonX from "../../components/ButtonX";
import { useGlobalStoreContext } from "../../Providers/GlobalStoreProvider";
import { toast } from "sonner";

function UpdateProfilePic() {
  const { updateProfilePicture, pic, setPic, setUserProfilePic, user } =
    useGlobalStoreContext();

  let [isPending, startTransition] = useTransition();

  const submitData = (data: FormData) => {
    startTransition(async () => {
      const res = await updateProfilePicture(data);
      if (res?.success) {
        setUserProfilePic(res.pic_url!);
        toast.success(res.message || "Updated !");
        setPic("");
      }
    });
  };

  return (
    <form action={submitData} className="flex gap-3 items-center">
      <AvtarBox setPic={setPic} />

      {!user?.profile?.isSocialLogin && (
        <ButtonX
          title={isPending ? "Uploading..." : "Upload"}
          pic={pic}
          pending={isPending}
        />
      )}
    </form>
  );
}

export default UpdateProfilePic;
