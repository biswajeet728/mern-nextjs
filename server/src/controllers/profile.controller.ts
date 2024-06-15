import { TryCatch } from "@/middlewares/error.middleware";
import User from "@/models/User";
import { ErrorHandler, config } from "@/utils/helper";
import { Request, RequestHandler } from "express";
import cloudinary, { UploadApiResponse } from "cloudinary";
import Address from "@/models/Address";
import crypto from "crypto";
import PasswordReset from "@/models/PasswordReset";
import { sendEmail } from "@/utils/features";

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

export const deleteProfile: RequestHandler = TryCatch(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

export const forgotPassword: RequestHandler = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const resettoken = crypto.randomBytes(36).toString("hex");
  await PasswordReset.create({ owner: user._id, token: resettoken });

  const resetUrl = `${config.CLIENT_URL}reset-password?token=${resettoken}&id=${user._id}`;

  await sendEmail(email, resetUrl, "forgot-password");

  res.status(200).json({
    success: true,
    message: "Reset password link sent to email",
  });
});

export const resetPassword: RequestHandler = TryCatch(async (req, res) => {
  const { token, id } = req.params;
  const { password } = req.body;

  const user = await User.findById(id);

  if (!user) {
    throw new ErrorHandler("Invalid user", 400);
  }

  const resetToken = await PasswordReset.findOne({ owner: id });

  if (!resetToken) {
    throw new ErrorHandler("Invalid or expired reset token", 400);
  }

  if (!(await resetToken.compareToken(token))) {
    throw new ErrorHandler("Invalid or expired reset token", 400);
  }

  user.password = password;

  await user.save();

  await PasswordReset.findByIdAndDelete(resetToken._id);

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

// http://localhost:3000//reset-password/366247d9bb13b602f10dcc4caac5ba19be5082ea22deb6c3b6e1218f9d006a6af766db12/user/666d5b7f5fc6222b23a6d8da
