"use client";

import React from "react";
import AvtarBox from "./AvtarBox";
import ButtonX from "../../components/ButtonX";
import { useGlobalStoreContext } from "../../Providers/GlobalStoreProvider";

function UpdateProfilePic() {
  const { updateProfilePicture, pic, setPic } = useGlobalStoreContext();

  return (
    <form action={updateProfilePicture} className="flex gap-3 items-center">
      <AvtarBox setPic={setPic} />

      <ButtonX title={"Upload"} pic={pic} />
    </form>
  );
}

export default UpdateProfilePic;
