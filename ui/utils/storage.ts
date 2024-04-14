export const addAccessAndRefreshToken = (
  accessToken: string,
  refreshToken: string
) => {
  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("accessToken");
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("refreshToken");
  }
  return null;
};

export const removeAccessAndRefreshToken = () => {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
};
