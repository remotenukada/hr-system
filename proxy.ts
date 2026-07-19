export default function proxy() {
  console.log("PROXY WORKING");
}

export const config = {
  matcher: ["/:path*"],
};
