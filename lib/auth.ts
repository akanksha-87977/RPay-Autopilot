import { SignJWT, jwtVerify } from "jose";
const secret=new TextEncoder().encode(process.env.SESSION_SECRET||"rpay-autopilot-demo-secret-change-me-32chars");
export type Session={userId:string;merchantId:string;role:"OWNER"|"OPERATOR"};
export async function signSession(session:Session){return new SignJWT(session).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("8h").sign(secret)}
export async function verifySession(token:string){const {payload}=await jwtVerify(token,secret);return payload as unknown as Session}
