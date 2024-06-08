import { GoogleTokensResult, GoogleUserResult } from "@/types";
import { ErrorHandler, config } from "@/utils/helper";
import axios from "axios";
import qs from "qs";

export async function getGoogleAccessTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = `https://oauth2.googleapis.com/token`;

  const values = {
    code,
    client_id: config.GOOGLE_CLIENT_ID,
    client_secret: config.GOOGLE_CLIENT_SECRET,
    redirect_uri: config.GOOGLE_CALLBACK_URL,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("token error", JSON.stringify(error, null, 2));

    throw new ErrorHandler("Google token error", 500);
  }
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
  try {
    const res = await axios.get<GoogleUserResult>(url, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("user error", JSON.stringify(error, null, 2));
    throw new ErrorHandler("Google user error", 500);
  }
}
