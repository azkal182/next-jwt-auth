// export default authMiddleware();

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
export { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/profile"],
  //   matcher: ["/((?!auth).*)(.+)"],
  //   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc|auth)(.*)"],
};
