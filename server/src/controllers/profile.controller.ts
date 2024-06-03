import { TryCatch } from "@/middlewares/error.middleware";
import User from "@/models/User";
import { ErrorHandler } from "@/utils/helper";
import { Request, RequestHandler } from "express";
import cloudinary, { UploadApiResponse } from "cloudinary";

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
