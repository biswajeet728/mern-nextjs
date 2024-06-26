"use client";

import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { useGlobalStoreContext } from "../../Providers/GlobalStoreProvider";
import { createOrder } from "@/services/orders";
import { toast } from "sonner";
import { useServerCart } from "@/store/use-server-cart";
import { FaX } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const TAXES_PERCENTAGE = 18;

export default function ProceedPayment() {
  const {
    totalAmount: total,
    items,
    user,
    verifyCoupon,
    finalTotal,
    discountTotal,
    setDiscountTotal,
    setFinalTotal,
    selectedAddress,
  } = useGlobalStoreContext();

  const [discountPercentage, setDiscountPercentage] = React.useState<
    number | null
  >(null);
  const [discountError, setDiscountError] = React.useState("");
  const [couponCode, setCouponCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isValidCoupon, setIsValidCoupon] = React.useState(false);

  const serverCart = useServerCart();

  const handleCoupon = async () => {
    if (!couponCode) {
      setDiscountError("Please enter a valid coupon code");
      return;
    }

    const res = await verifyCoupon(couponCode);

    if (!res?.valid) {
      setDiscountError("Invalid Coupon Code");
      return;
    }

    setDiscountPercentage(res.discount);
    setDiscountError("");
    setIsValidCoupon(true);
  };

  const clearCoupon = () => {
    setDiscountPercentage(null);
    setIsValidCoupon(false);
    setCouponCode("");
  };

  const discountAmount = React.useMemo(() => {
    return Math.round((total * discountPercentage!) / 100);
  }, [total, discountPercentage]);

  const taxesAmount = React.useMemo(() => {
    const amountAfterDiscount = total - discountAmount;
    return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
  }, [total, discountAmount]);

  const grandWithDiscountTotal = React.useMemo(() => {
    return total - discountAmount + taxesAmount;
  }, [total, discountAmount, taxesAmount]);

  const grandWithoutDiscountTotal = React.useMemo(() => {
    return total + taxesAmount;
  }, [total, taxesAmount]);

  React.useEffect(() => {
    if (discountPercentage !== null) {
      setFinalTotal(grandWithoutDiscountTotal);
      setDiscountTotal(grandWithDiscountTotal);
    } else {
      setFinalTotal(grandWithoutDiscountTotal);
      setDiscountTotal(0);
    }
  }, [discountPercentage]);

  const handlePayment = async () => {
    try {
      if (!user || !selectedAddress) {
        toast.error("Required Fields are missing.");
        return;
      }

      setLoading(true);

      // console.log(finalTotal, discountTotal);

      const res = await createOrder({
        orderItems: items,
        address: selectedAddress?._id!,
        finalTotal: finalTotal,
        discountTotal: discountTotal,
      });
      if (res.data.paymentUrl) {
        window.location.href = res.data.paymentUrl;
        // clear cart
        serverCart.clearCart();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="flex-[0.99]">
      <div className="w-full mb-3">
        <h2 className="font-medium mons text-xl">Order Summary</h2>
      </div>
      <hr
        className="
        border-1
        border-blue-gray-100
        w-full
        mb-3
      "
      />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="mons font-semibold text-lg text-black">SubTotal:</h3>
          <div className="bg-gray-50 rounded-md shadow-md py-2 px-5">
            {total ? `Rs. ${total}` : "N/A"}
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="mons font-semibold text-base text-black">
            TAX(In Total):
          </h3>
          <div className="bg-gray-50 rounded-md shadow-md py-2 px-5">
            {taxesAmount ? `Rs. ${taxesAmount}` : "N/A"}
          </div>
        </div>
        <hr
          className="
        border-1
        border-blue-gray-100
        w-full
        mb-3
      "
        />
        <div className="mb-4">
          <h3 className="mons font-semibold text-lg text-black">
            Have a Coupon?
          </h3>
          <div className="mt-3 flex items-center gap-3">
            <Input
              crossOrigin={""}
              label="Enter Coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button
              placeholder={""}
              color="green"
              variant="gradient"
              onClick={handleCoupon}
              disabled={discountPercentage! > 0 || !couponCode}
            >
              Apply
            </Button>
          </div>
          <div className="text-red-500 mt-2">{discountError}</div>

          {isValidCoupon && (
            <div className="flex items-center gap-3 mt-3 border p-2 w-fit border-gray-400 border-opacity-55">
              <span className="text-green-400 text-base">{couponCode}</span>
              <IoClose
                onClick={clearCoupon}
                className="cursor-pointer -ml-2"
                size={22}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="mons font-semibold text-lg text-black">
            Grand Total:
          </h3>
          <div className="flex justify-end gap-2 items-center">
            <div
              className={
                discountPercentage
                  ? `bg-gray-50 rounded-md shadow-md py-2 px-5 line-through text-gray-400`
                  : `bg-gray-50 rounded-md shadow-md py-2 px-5`
              }
            >
              Rs. {grandWithoutDiscountTotal}
            </div>
            {discountPercentage ? (
              <div className="bg-gray-50 rounded-md shadow-md py-2 px-5">
                Rs. {grandWithDiscountTotal}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button
            placeholder={""}
            color="green"
            className="mt-10"
            variant="gradient"
            disabled={!selectedAddress || !user}
            onClick={handlePayment}
            loading={loading}
          >
            Pay Using Stripe
          </Button>
        </div>
      </div>
    </div>
  );
}
