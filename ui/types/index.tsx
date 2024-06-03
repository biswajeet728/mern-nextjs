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
