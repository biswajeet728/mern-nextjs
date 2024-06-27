import { TryCatch } from "@/middlewares/error.middleware";
import Category from "@/models/Category";
import { ICategory } from "@/types";
import { ErrorHandler } from "@/utils/helper";
import { Request, RequestHandler } from "express";

export const createCategory: RequestHandler = TryCatch(
  async (req: Request<{}, {}, ICategory>, res, next) => {
    const { name, isPublished } = req.body;

    // check if any of the required fields are missing
    if (!name) {
      return next(new ErrorHandler("Please add name", 400));
    }

    const category = await Category.create({
      name,
      slug: name.toLowerCase().replace(/ /g, "-"),
      isPublished,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "Added new Category!",
    });
  }
);

export const getCategories: RequestHandler = TryCatch(
  async (req, res, next) => {
    const { q, isPublished, page = 1 } = req.query; // Default page is 1 and limit is 5

    const pageNumber = parseInt(page as string); // Convert page to integer
    const limitNumber = 5; // Limit is 5

    const skip = (pageNumber - 1) * limitNumber;

    // check if all query parameters are empty
    if (!q && !isPublished) {
      const data = await Category.find({});
      return res.status(200).json({ data });
    }

    let data;
    if (q) {
      data = await Category.aggregate([
        {
          $search: {
            index: "category-index",
            autocomplete: {
              query: q as string,
              path: "name",
              fuzzy: {
                maxEdits: 2,
                prefixLength: 1,
                maxExpansions: 256,
              },
            },
          },
        },
        { $skip: skip },
        { $limit: limitNumber },
        {
          $project: {
            _id: 1,
            name: 1,
            isPublished: 1,
          },
        },
      ]);
    } else if (isPublished) {
      data = await Category.find({ isPublished: true })
        .skip(skip)
        .limit(limitNumber)
        .select("name isPublished");
    } else {
      data = await Category.find({}).skip(skip).limit(limitNumber);
    }

    return res.status(200).json({ data, limit: limitNumber });
  }
);
