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
  avatar?: {
    url: string;
  };
  bio?: string;
}

export interface Profile {
  profile: ProfileType;
}
