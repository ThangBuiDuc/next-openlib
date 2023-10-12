import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // if (
    //   auth.userId &&
    //   req.nextUrl.pathname === "/sign-in" &&
    //   req.nextUrl.searchParams.get("redirect_url")
    // ) {
    //   return NextResponse.redirect(
    //     req.nextUrl.searchParams.get("redirect_url")
    //   );
    // }
  },
  publicRoutes: ["/", "/home", "/search", "/detail/[uuid]"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
