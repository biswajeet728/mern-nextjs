export interface DefaultResponse {
  success: boolean;
  message: string;
}

export interface SignInResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}

export type Profile = {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  avatar?: {
    url: string;
  };
  accessToken: string;
};

export interface SignOutResponse {
  success: boolean;
  message: string;
}
