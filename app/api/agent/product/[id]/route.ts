import { products } from "@/lib/demo-data";
import { ok, apiError } from "@/lib/api";
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const p=products.find(x=>x.id===id);if(!p)return apiError("Product not found",404);const {cost,merchantId,...safe}=p;return ok({schema:"rpay.agent.product.v1",merchantId,product:{...safe,price:{amount:p.price,currency:"INR"},availability:p.stock>0?"IN_STOCK":"OUT_OF_STOCK"},allowed_actions:["ADD_TO_CART","REQUEST_OFFER"]})}
