import { PrismaClient, AgentRole, CampaignStatus, CartStatus, OrderStatus, PaymentStatus, UserRole } from "@prisma/client";
import crypto from "node:crypto";

const prisma=new PrismaClient();
const merchantId="mer_nova_001";
const productRows=[
 ["prod_keyboard","KB-001","Mechanical Keyboard","Input",1999,1320,84,3.7,-14,["work from home","keyboard","productivity"]],
 ["prod_mouse","MS-001","Wireless Mouse","Input",899,510,126,7.2,8,["work from home","mouse","productivity"]],
 ["prod_stand","ST-001","Laptop Stand","Workspace",1299,760,43,5.9,3,["work from home","laptop","ergonomic"]],
 ["prod_hub","HB-001","USB-C Hub","Connectivity",1499,930,61,4.4,-2,["work from home","usb-c","accessory"]],
 ["prod_headphones","HP-001","Noise Cancelling Headphones","Audio",2999,1910,28,3.1,-9,["audio","travel","work from home"]],
 ["prod_webcam","WC-001","2K Webcam","Video",2499,1580,92,2.6,-17,["video","work from home","meetings"]],
 ["prod_lamp","LP-001","Desk Lamp","Workspace",799,420,117,6.4,4,["workspace","lighting","work from home"]]
] as const;

async function main(){
 await prisma.merchant.deleteMany({where:{id:merchantId}});
 await prisma.merchant.create({data:{id:merchantId,name:"Nova Electronics",currency:"INR",timezone:"Asia/Calcutta"}});
 const owner=await prisma.user.create({data:{merchantId,email:"nila@nova.demo",name:"Nila Kumar",role:UserRole.OWNER}});
 await prisma.agent.create({data:{id:"merchant-revenue-agent",merchantId,role:AgentRole.MERCHANT_REVENUE_AGENT,name:"Nova Revenue Agent",purpose:"Detect and execute bounded revenue actions",permissions:{createMany:{data:["catalog.read","offer.create","campaign.propose","order.create"].map(permission=>({permission,constraintJson:{discountMaxPercent:15}}))}}}});
 await prisma.agent.create({data:{id:"buyer-agent-7821",merchantId,role:AgentRole.AI_BUYER,name:"External AI Buyer",purpose:"Purchase electronics",maxSpend:5000,permissions:{createMany:{data:["catalog.read","offer.request","cart.write","order.create"].map(permission=>({permission}))}},sessions:{create:{id:"sess_83921",merchantId,purpose:"Work-from-home purchase",authorizedBudget:5000,spentAmount:0,expiresAt:new Date(Date.now()+60*60_000)}}}});
 for(const [id,sku,name,category,price,cost,onHand,conversion,delta,tags] of productRows){await prisma.product.create({data:{id,merchantId,sku,name,category,price,cost,tags:[...tags],description:`Demo ${name} for Nova Electronics`,metadata:{conversion,conversionDelta:delta},inventory:{create:{merchantId,onHand,reorderPoint:15}}}})}
 const policy=await prisma.policy.create({data:{merchantId,name:"nova-money",version:3,active:true,rules:{discount:{autoMax:10,hardMax:15,negotiationAmountMax:500},margin:{minimum:12},campaign:{autoBudgetMax:5000},order:{approvalAt:10000},refund:{alwaysApproval:true}}}});
 const customers=await Promise.all(["Priya Shah","Arun Venkat","Meera Rao","Vikram Iyer","Sara Thomas"].map((name,i)=>prisma.customer.create({data:{merchantId,externalRef:`cus_demo_${i+1}`,name,email:`customer${i+1}@example.test`,lifetimeValue:[18400,9200,12600,7800,22100][i]}})));
 for(let i=0;i<58;i++){const customer=customers[i%customers.length];const product=productRows[i%productRows.length];await prisma.customerSignal.create({data:{merchantId,customerId:customer.id,productId:product[0],type:i%4===0?"CART_ABANDONED":i%3===0?"PRODUCT_SEARCH":"PRODUCT_VIEW",value:{source:i%2?"web":"agent",intentScore:Number((.58+(i%35)/100).toFixed(2)),session:`signal_sess_${i}`},occurredAt:new Date(Date.now()-i*3_600_000)}})}
 const abandoned=await prisma.cart.create({data:{id:"cart_abandoned_headphone",merchantId,customerId:customers[0].id,status:CartStatus.ABANDONED,items:{create:{productId:"prod_headphones",quantity:1,unitPrice:2999}}}});
 await prisma.cart.create({data:{id:"cart_agent_wfh",merchantId,agentId:"buyer-agent-7821",sessionId:"sess_83921",status:CartStatus.ACTIVE,items:{createMany:{data:[{productId:"prod_keyboard",quantity:1,unitPrice:1999},{productId:"prod_mouse",quantity:1,unitPrice:899},{productId:"prod_stand",quantity:1,unitPrice:1299},{productId:"prod_lamp",quantity:1,unitPrice:799}]}}}});
 for(let i=1;i<=16;i++){const product=productRows[i%productRows.length];const amount=product[4];await prisma.order.create({data:{id:`ord_seed_${String(i).padStart(3,"0")}`,merchantId,customerId:customers[i%customers.length].id,status:OrderStatus.PAID,amount,idempotencyKey:`seed-order-${i}`,items:{create:{productId:product[0],quantity:1,unitPrice:amount}},payments:{create:{providerOrderId:`order_test_seed_${i}`,providerPaymentId:`pay_test_seed_${i}`,status:PaymentStatus.CAPTURED,amount,signatureVerifiedAt:new Date()}}}})}
 await prisma.campaign.createMany({data:[{merchantId,productId:"prod_headphones",name:"Headphone Comeback",audience:{segment:"high-intent abandoners"},discountPercent:5,budget:2400,expectedRevenue:11900,status:CampaignStatus.ACTIVE},{merchantId,productId:"prod_keyboard",name:"Keyboard Bundle Week",audience:{segment:"keyboard viewers"},discountPercent:6.9,budget:3000,expectedRevenue:17000,status:CampaignStatus.PROPOSED},{merchantId,productId:"prod_webcam",name:"Webcam Remote Teams",audience:{segment:"returning workspace buyers"},discountPercent:10,budget:5800,expectedRevenue:22100,status:CampaignStatus.PENDING_APPROVAL}]});
 await prisma.revenueOpportunity.createMany({data:[{merchantId,type:"BUNDLE",title:"Keyboard + Mouse Bundle",description:"Surface the pair at the highest-intent point",productIds:["prod_keyboard","prod_mouse"],signals:["Views +31%","Conversion -14%","Co-purchase 38%"],confidence:87,estimatedUplift:18400,maxExposure:199},{merchantId,type:"RECOVERY",title:"Abandoned Headphone Recovery",description:"48-hour recovery offer",productIds:["prod_headphones"],signals:["46 abandoned carts","22% prior acceptance"],confidence:82,estimatedUplift:12700,maxExposure:149},{merchantId,type:"CROSS_SELL",title:"USB-C Hub Cross-sell",description:"Offer hub to laptop stand shoppers",productIds:["prod_stand","prod_hub"],signals:["29% later search USB-C"],confidence:79,estimatedUplift:9200,maxExposure:120},{merchantId,type:"PROMOTION",title:"Move Slow-selling Webcams",description:"Capped remote-team promotion",productIds:["prod_webcam"],signals:["92 units on hand","Conversion -17%"],confidence:74,estimatedUplift:7000,maxExposure:249}]});
 const hash=crypto.createHash("sha256").update("seed-audit-1").digest("hex");
 await prisma.auditEvent.create({data:{merchantId,userId:owner.id,actorType:"SYSTEM",actorId:"seed",action:"merchant.seed",summary:"Nova demo merchant seeded",status:"SUCCESS",metadata:{products:7,customers:5,abandonedCart:abandoned.id,policyId:policy.id},eventHash:hash}});
 console.log("Seeded Nova Electronics: 7 products, 5 customers, 16 paid orders, 58 signals, 4 opportunities.");
}
main().catch(error=>{console.error(error);process.exit(1)}).finally(()=>prisma.$disconnect());
