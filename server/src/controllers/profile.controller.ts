import { TryCatch } from "@/middlewares/error.middleware";
import User from "@/models/User";
import { ErrorHandler } from "@/utils/helper";
import { Request, RequestHandler } from "express";
import cloudinary, { UploadApiResponse } from "cloudinary";
import Address from "@/models/Address";

const uploadImage = (filePath: string): Promise<UploadApiResponse> => {
  return cloudinary.v2.uploader.upload(filePath, {
    width: 1280,
    height: 720,
    crop: "fill",
    folder: "sazzy/users/avatar",
  });
};

export const updateProfilePicture: RequestHandler = TryCatch(
  async (req: Request, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new ErrorHandler("Unauthorized User", 404);
    }

    const file = req.file;

    console.log(file, "file");
    console.log("test");

    if (!file) {
      throw new ErrorHandler("Please upload a picture", 400);
    }

    const isProfilePicExist = user?.avatar?.public_id;

    if (isProfilePicExist) {
      await cloudinary.v2.uploader.destroy(
        user?.avatar?.public_id as string,
        (err, result) => {
          if (err) {
            throw new ErrorHandler("Something went wrong", 500);
          }

          console.log(result);
        }
      );

      const { secure_url, public_id } = await uploadImage(file.filepath);
      user!.avatar = { url: secure_url, public_id };
      await user?.save();
      res.status(200).json({
        success: true,
        message: "Profile picture updated",
        pic_url: secure_url,
      });
    } else {
      const { secure_url, public_id } = await uploadImage(file.filepath);
      user!.avatar = { url: secure_url, public_id };
      await user?.save();
      res.status(200).json({
        success: true,
        message: "Profile picture Added",
        pic_url: secure_url,
      });
    }
  }
);

export const updateProfileData: RequestHandler = TryCatch(
  async (req: Request, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new ErrorHandler("Unauthorized User", 404);
    }

    const { username, phone, bio } = req.body;

    user!.username = username;
    user!.phone = phone;
    user!.bio = bio;

    await user?.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  }
);

export const addNewAddress: RequestHandler = TryCatch(
  async (req, res, next) => {
    const {
      fullName,
      address,
      city,
      state,
      country,
      zipCode,
      phone,
      landmark,
      isDefault,
    } = req.body;

    if (!fullName || !address || !city || !state || !country || !zipCode) {
      return next(new ErrorHandler("Please fill all the fields", 400));
    }

    const isAddressExist = await Address.findOne({ user: req.user.id });

    if (isAddressExist) {
      isAddressExist.items.push({
        fullName,
        address,
        city,
        state,
        country,
        zipCode,
        phone,
        landmark,
        isDefault,
      });

      await isAddressExist.save();
    } else {
      const newAddress = new Address({
        user: req.user.id,
        items: [
          {
            fullName,
            address,
            city,
            state,
            country,
            zipCode,
            phone,
            landmark,
            isDefault,
          },
        ],
      });

      await newAddress.save();
    }

    res.status(200).json({
      success: true,
      message: "Address Saved !",
    });
  }
);

export const getAddresses: RequestHandler = TryCatch(async (req, res) => {
  const addresses = await Address.find({ user: req.user.id }).select("items");

  res.status(200).json({
    success: true,
    items: addresses.map((address) => address.items)[0],
  });
});

export const deleteAddress: RequestHandler = TryCatch(async (req, res) => {
  const { id } = req.query;

  const address = await Address.findOne({ user: req.user.id });

  if (!address) {
    throw new ErrorHandler("Address not found", 404);
  }

  const index = address.items.findIndex((item: any) => item._id == id);

  if (index > -1) {
    address.items.splice(index, 1);
    await address.save();
  }

  res.status(200).json({
    success: true,
    message: "Address deleted",
    id,
  });
});

export const updateAddress: RequestHandler = TryCatch(async (req, res) => {
  const { id } = req.query;
  const { fullName, address, city, state, country, zipCode, phone, isDefault } =
    req.body;

  const addressDoc = await Address.findOne({ user: req.user.id });

  if (!addressDoc) {
    throw new ErrorHandler("Address not found 11", 404);
  }

  const index = addressDoc.items.findIndex((item: any) => item._id == id);

  if (index > -1) {
    addressDoc.items[index] = {
      fullName,
      address,
      city,
      state,
      country,
      zipCode,
      phone,
      isDefault,
    };

    await addressDoc.save();
  } else {
    throw new ErrorHandler("Address not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Address updated",
  });
});

export const getSingleAddress: RequestHandler = TryCatch(async (req, res) => {
  const { id } = req.query;

  const address = await Address.findOne({ user: req.user.id });

  if (!address) {
    throw new ErrorHandler("Address not found", 404);
  }

  const singleAddress = address.items.find((item: any) => item._id == id);

  res.status(200).json({
    success: true,
    item: singleAddress,
  });
});

export const defaultAddress: RequestHandler = TryCatch(async (req, res) => {
  const { id } = req.body;

  const address = await Address.findOne({ user: req.user.id });

  if (!address) {
    throw new ErrorHandler("Address not found", 404);
  }

  // toggle default address if already set to true then set to false and vice versa
  address.items.forEach((item: any) => {
    if (item._id == id) {
      item.isDefault = !item.isDefault;
    } else {
      item.isDefault = false;
    }
  });

  await address.save();

  res.status(200).json({
    success: true,
    message: "Default address set",
  });
});
