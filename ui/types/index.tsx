export interface DefaultResponse {
  success: boolean;
  message?: string;
}

export interface ProfileType {
  id: string;
  username: string;
  email: string;
  role: string;
  verified: boolean;
  phone?: string;
  avatar?: {
    url: string;
  };
  bio?: string;
  isSocialLogin?: boolean;
  googlePicture?: string;
}

export interface Profile {
  profile: ProfileType;
}

export interface ProductType {
  _id: string;
  name: string;
  price: string;
  slug: string;
  category: string;
  isPublished: boolean;
  images: [
    {
      url: string;
      public_id: string;
      _id: string;
    }
  ];
}

export interface ProductResponse {
  products: ProductType[];
}

export interface MainProduct extends ProductType {
  description: string;
  stock: number;
  isFeatured: boolean;
  isBestSelling: boolean;
  salePrice?: string | number | null;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  isPublished: boolean;
}

export interface CategoryResponse {
  data: CategoryType[];
}

export interface CartId {
  _id: string;
  quantity: number;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  images: [
    {
      url: string;
      public_id: string;
    }
  ];
  category: string;
  quantity: number;
}

export interface UpdateProfileResponse extends DefaultResponse {
  pic_url?: string;
}

export interface SingleAddress {
  success: boolean;
  item: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: number;
    phone: number;
    landmark: string;
    isDefault: boolean;
    _id: string;
  };
}

export interface Image {
  url: string;
  public_id: string;
  _id: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  images: Image[];
  category: string;
  quantity: number;
  _id: string;
}

export interface Address {
  fullName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
  phone: number;
  landmark?: string;
  isDefault: boolean;
  _id: string;
}

export interface User {
  username: string;
  email: string;
  phone?: string | null;
  bio?: string | null;
  isSocialLogin: boolean;
  googlePicture?: string | null;
  _id: string;
}

export interface ResponseOrder {
  _id: string;
  orderItems: OrderItem[];
  address: Address;
  user: User;
  discountTotal: number;
  finalTotal: number;
  orderStatus: string;
  paymentStatus: string;
  paymentId?: string | null;
  createdAt: string;
  updatedAt: string;
}
