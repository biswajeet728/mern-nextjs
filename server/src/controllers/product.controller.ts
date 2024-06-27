import { TryCatch } from "@/middlewares/error.middleware";
import Product from "@/models/Product";
import { IProduct } from "@/types";
import { ErrorHandler } from "@/utils/helper";
import { Request, RequestHandler } from "express";
import cloudinary, { UploadApiResponse } from "cloudinary";
import Category from "@/models/Category";

const uploadImage = (filePath: string): Promise<UploadApiResponse> => {
  return cloudinary.v2.uploader.upload(filePath, {
    width: 1280,
    height: 720,
    crop: "fill",
    folder: "sazzy/products",
  });
};

export const createProduct: RequestHandler = TryCatch(
  async (req: Request<{}, {}, IProduct>, res, next) => {
    const {
      name,
      price,
      salePrice,
      description,
      stock,
      category,
      isPublished,
      isBestSelling,
      isFeatured,
    } = req.body;

    // check if any of the required fields are missing
    if (!name || !price || !description || !stock || !category) {
      return next(new ErrorHandler("Please fill in all required fields", 400));
    }

    // find category in the database
    const newcategory = await Category.findById(category);

    if (!newcategory) {
      return next(new ErrorHandler("Category not found", 404));
    }

    const product = await Product.create({
      name,
      slug: name.toLowerCase().replace(/ /g, "-"),
      price,
      salePrice,
      description,
      stock,
      category: newcategory.name,
      isPublished:
        typeof isPublished === "string" && isPublished === "true"
          ? true
          : false,
      isBestSelling:
        typeof isBestSelling === "string" && isBestSelling === "true"
          ? true
          : false,
      isFeatured:
        typeof isFeatured === "string" && isFeatured === "true" ? true : false,
    });

    // console.log(req.files, "fdjfidfn");

    if (!req.files) {
      return next(new ErrorHandler("Please upload an images", 400));
    }

    const { files } = req.files;

    const isMultipleImages = Array.isArray(files);

    if (isMultipleImages && files.length > 5) {
      return next(
        new ErrorHandler("You can only upload a maximum of 5 images", 400)
      );
    }

    if (isMultipleImages) {
      const uploadPromise = files.map((file) => uploadImage(file.filepath));
      // Wait for all file uploads to complete
      const uploadResults = await Promise.all(uploadPromise);
      // Add the image URLs and public IDs to the product's images field
      product.images = uploadResults.map(({ secure_url, public_id }) => ({
        url: secure_url,
        public_id: public_id, // Add the 'public_id' property
      }));
    } else {
      if (files) {
        const { secure_url, public_id } = await uploadImage(files.filepath);
        product.images = [{ url: secure_url, public_id }];
      }
    }

    await product.save();

    res.status(201).json({ message: "Added new product!" });
  }
);

export const getProducts: RequestHandler = TryCatch(async (req, res, next) => {
  const {
    q,
    category,
    isPublished,
    isBestSelling,
    isFeatured,
    price,
    page = 1,
  } = req.query;

  const pageNumber = parseInt(page as string);
  const limitNumber = 6;

  const skip = (pageNumber - 1) * limitNumber;
  let data;
  if (q) {
    data = await Product.aggregate([
      // {
      //   $search: {
      //     index: "products-index",
      //     autocomplete: {
      //       query: q as string,
      //       path: "name",
      //       fuzzy: {
      //         maxEdits: 2,
      //         prefixLength: 1,
      //         maxExpansions: 256,
      //       },
      //     },
      //   },
      // },
      {
        $search: {
          index: "products-index",
          compound: {
            should: [
              {
                autocomplete: {
                  query: q as string,
                  path: "name",
                },
              },
              {
                autocomplete: {
                  query: q as string,
                  path: "description",
                },
              },
            ],
            minimumShouldMatch: 1,
          },
        },
      },
      { $skip: skip },
      { $limit: limitNumber },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          images: 1,
          price: 1,
          salePrice: 1,
          category: 1,
          isPublished: 1,
        },
      },
    ]);
  } else if (category) {
    const getCategoryById = await Category.findById(category);

    data = await Product.aggregate([
      {
        $match: {
          category: { $regex: new RegExp(getCategoryById?.name || "", "i") },
        },
      },
      { $skip: skip },
      { $limit: limitNumber },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          images: 1,
          price: 1,
          salePrice: 1,
          category: 1,
          isPublished: 1,
        },
      },
    ]);
  } else if (isPublished) {
    data = await Product.find({ isPublished: true })
      .skip(skip)
      .limit(limitNumber)
      .select("_id name slug images price salePrice category isPublished");
  } else if (isBestSelling || isBestSelling === "true") {
    data = await Product.find({ isBestSelling: true })
      .skip(skip)
      .limit(limitNumber)
      .select("_id name slug images price salePrice category isPublished");
  } else if (isFeatured) {
    data = await Product.find({ isFeatured: true })
      .skip(skip)
      .limit(limitNumber)
      .select("_id name slug images price salePrice category isPublished");
  } else if (price) {
    data = await Product.find({
      price: {
        $gte: parseInt(price as string),
        // $lte: parseInt(price as string),
      },
    })
      .skip(skip)
      .limit(limitNumber)
      .select("_id name slug images price salePrice category isPublished");
  } else {
    data = await Product.find({}).skip(skip).limit(limitNumber);
  }

  return res.status(200).json({ products: data, limit: limitNumber });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  const { slug } = req.params;

  const product = await Product.findOne({}).where("slug").equals(slug);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  return res.status(200).json({ product: product });
});
