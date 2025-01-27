import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { privateRoutes } from "./routes"
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async(req) => {
  // testing if the midddleware is called
  console.log("middleware called: ", req.nextUrl.pathname)
  // test if we get an object back of the user
  console.log(req.auth)

  // middleware logic goes here
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req
  const url = "http://localhost:3000";

  // Define the Private Routes
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

  // Define the Auth Routes
  const isAuthRoute = nextUrl.pathname.includes("/auth")

  // Define the Api Routes
  const isApiRoute = nextUrl.pathname.includes("/api")

  if(isApiRoute) {
    return;
  }

  if(isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/dashboard`);
  }

  if(isAuthRoute && !isLoggedIn) {
    return;
  }

  if(!isLoggedIn && isPrivateRoute) {
    return Response.redirect(`${url}/auth/login `)
  }

})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trcp)(.*)"]
}