"use client";

import { WishlistItem } from "@/services/wishlist";
import { useServerCart } from "@/store/use-server-cart";
import { useWishlist } from "@/store/use-wishlist";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function WishListCard({
  item,
  handleRemove,
}: {
  item: WishlistItem;
  handleRemove: (productId: string) => void;
}) {
  const serverCart = useServerCart();
  const wishlist = useWishlist();
  return (
    <div>
      <Card
        placeholder={""}
        className="mt-6 h-80 w-fit md:w-80 border border-gray-500 border-opacity-70"
      >
        <CardHeader
          placeholder={""}
          color="blue-gray"
          className="relative h-48"
        >
          <img
            src={item.image || "https://via.placeholder.com/300"}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody placeholder={""}>
          <div className="flex items-center justify-between gap-4">
            <Typography
              placeholder={""}
              color="blue-gray"
              className="font-medium mons"
            >
              {item.name}
            </Typography>
            <Typography
              placeholder={""}
              color="blue-gray"
              className="font-medium mons"
            >
              Rs. {item.price}
            </Typography>
          </div>
        </CardBody>
        <CardFooter placeholder={""} className="pt-0">
          <div className="flex items-center gap-3">
            <Button
              placeholder={""}
              onClick={() => {
                serverCart.addItem(item._id, 1);
                wishlist.removeWishlistItem(item._id);
              }}
            >
              Add To Cart
            </Button>
            <Button
              placeholder={""}
              variant="outlined"
              color="red"
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default WishListCard;
