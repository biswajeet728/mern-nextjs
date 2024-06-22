import axios from "axios";

type OrderItemImage = {
  url: string;
  public_id: string;
};

type OrderItem = {
  _id: string;
  name: string;
  price: number;
  images: OrderItemImage[];
  category: string;
  quantity: number;
};

type Order = {
  orderItems: OrderItem[];
  address: string;
  finalTotal: number;
  discountTotal: number;
};

export const createOrder = async (data: Order) => {
  const res = await axios.post<{ paymentUrl: string }>(
    `${process.env.NEXT_PUBLIC_API_URL}orders/create-order`,
    {
      orderItems: data.orderItems,
      address: data.address,
      finalTotal: data.finalTotal,
      discountTotal: data.discountTotal ? data.discountTotal : 0,
    },
    {
      withCredentials: true,
    }
  );
  return res;
};

export const createInstantOrder = async (productId: string) => {
  const res = await axios.post<{ paymentUrl: string }>(
    `${process.env.NEXT_PUBLIC_API_URL}orders/instant-checkout`,
    {
      productId,
    },
    {
      withCredentials: true,
    }
  );
  return res;
};
