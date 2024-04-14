export interface DefaultResponse {
  success: boolean;
  message?: string;
}

export interface ProfileType {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  avatar?: object;
  bio?: string;
}
