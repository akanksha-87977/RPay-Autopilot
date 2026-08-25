import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
const secret=new TextEncoder().encode(process.env.SESSION_SECRET||"rpay-autopilot-demo-secret-change-me-32chars");
export async function proxy(request:NextRequest){const token=request.cookies.get("rpay_session")?.value;if(!token)return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(request.nextUrl.pathname)}`,request.url));try{const {payload}=await jwtVerify(token,secret);if(payload.merchantId!=="mer_nova_001")throw new Error("merchant mismatch");const headers=new Headers(request.headers);headers.set("x-merchant-id",String(payload.merchantId));headers.set("x-user-role",String(payload.role));return NextResponse.next({request:{headers}})}catch{return NextResponse.redirect(new URL("/login?reason=session",request.url))}}
export const config={matcher:["/dashboard/:path*"]};
