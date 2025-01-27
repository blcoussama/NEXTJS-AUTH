import authConfig from "./auth.config"
import NextAuth from "next-auth"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async(req) => {
  // Your custom middleware logic goes here
  // testing if the midddleware is called
  console.log("middleware called: ", req.nextUrl.pathname)
  // test if we get an object back of the user
  console.log(req.auth)
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trcp)(.*)"]
}