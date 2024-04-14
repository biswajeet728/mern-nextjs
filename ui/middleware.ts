import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const response = NextResponse.next();

  if (!accessToken || !refreshToken) return response;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("res.status: ", res.status);
  if (res.status === 401) {
    console.log(refreshToken, "refreshToken111");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/refresh-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        }
      );

      const data = await res.json();
      console.log("data: ", data);
      if (data.success) {
        const response = NextResponse.redirect(request.url);
        response.cookies.set("accessToken", data.tokens.access, {
          httpOnly: true,
        });
        response.cookies.set("refreshToken", data.tokens.refresh, {
          httpOnly: true,
        });
        return response;
      }
    } catch (error) {
      console.log("An error occurred11111: ", error);
    }
  }

  return response;
}
