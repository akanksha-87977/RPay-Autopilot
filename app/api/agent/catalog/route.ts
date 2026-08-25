import { products, merchant } from "@/lib/demo-data";
import { ok, apiError } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";
export async function GET(request:Request){const agent=request.headers.get("x-agent-id")??"anonymous";if(!rateLimit(`catalog:${agent}`,90).allowed)return apiError("Rate limit exceeded",429);return ok({schema:"rpay.agent.catalog.v1",merchantId:merchant.id,currency:"INR",items:products.map(({cost,merchantId,...p})=>({...p,price:{amount:p.price,currency:"INR"},availability:p.stock>0?"IN_STOCK":"OUT_OF_STOCK"})),count:products.length})}
