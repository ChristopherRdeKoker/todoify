import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
import { auth } from "./auth";
import { AccountRoleEnum } from "./app/api/HelpfulEnums";

export async function middleware(req: NextRequest) {
  // const session = await getServerSession(req, authConfig);
  const session = await auth();
  const { nextUrl } = req;
  const REDIRECT_Login = "/";
  const REDIRECT_Homepage = "/homepage";
  const REDIRECT_Admin = "/admin";

  const isAuthenticated = !!session;
  const isPublicRoute = [REDIRECT_Login].includes(nextUrl.pathname);

  if (!isAuthenticated && !isPublicRoute) return NextResponse.redirect(new URL(REDIRECT_Login, nextUrl));
  if (isPublicRoute && isAuthenticated) return NextResponse.redirect(new URL(REDIRECT_Homepage, nextUrl));

  const roles = session?.user?.roles?.map((i) => +i?.value) ?? [];
  if (nextUrl.pathname.startsWith(REDIRECT_Admin) && !roles.includes(AccountRoleEnum.admin)) {
    return NextResponse.redirect(new URL(REDIRECT_Homepage, nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
