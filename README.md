# RPay Autopilot

> **AI Revenue Agent + Agent Commerce Gateway** — not an e-commerce chatbot.

RPay Autopilot is an AI Revenue Operating System for merchants. It finds bounded revenue actions and turns a merchant into an AI-addressable business that external buyer agents can discover, negotiate with, and transact with through **Razorpay Test Mode**.

> 🟢 **RAZORPAY TEST MODE — NO REAL MONEY**

## 1. Problem

A traditional merchant waits for a human to discover a website, interpret a catalog, choose products, and complete checkout. Analytics tools may suggest opportunities, but they rarely close the loop. Meanwhile, AI assistants cannot safely transact because product discovery, negotiation, spending authority, payment execution, and proof are disconnected.

## 2. Why now

AI is moving from answering questions to taking bounded actions. Commerce needs a control plane between probabilistic models and deterministic money systems. The important problem is no longer “Can an AI recommend a product?” but “Can it transact within explicit authority, and can the merchant prove every rupee was safe?”

## 3. Solution

RPay Autopilot combines two agents:

- **Revenue Agent:** detects merchant opportunities, creates structured actions, and executes only after schema, policy, risk, and approval controls.
- **AI Buyer:** represents a customer, discovers Nova Electronics through a machine-readable API, requests an offer, negotiates inside policy, checks a spending budget, and checks out.

The coherent demo story is:

```text
Merchant signals → Opportunity → Bounded offer → AI discovery → Agent negotiation
→ Policy + approval → Razorpay Test Order → Verification → Paid order → Audit proof
```

## 4. Architecture

```mermaid
flowchart TD
  M[Merchant data] --> RA[Revenue Agent]
  B[External AI Buyer] <--> G[Agent Commerce Gateway]
  RA <--> D[AI Deal Room]
  G <--> D
  RA --> I[Structured Intent]
  D --> I
  I --> T[Allow-listed Tool Registry]
  T --> Z[Zod Schema Validation]
  Z --> P[Deterministic Policy Engine]
  P --> R[Risk & Budget Controls]
  R --> A{Approval Gate}
  A -->|approved| E[Execution Engine]
  A -->|blocked| L[Audit Ledger]
  E --> RP[Razorpay Test Mode]
  RP --> V[Signature / Webhook Verification]
  V --> O[Order State Machine]
  O --> L
  P --> L
```

### Money action safety invariant

```text
NEVER: LLM → Razorpay

ALWAYS:
LLM → Structured Intent → Allow-listed Tool → Schema → Policy → Risk
→ Approval → Execution → Razorpay → Verification → Audit
```

The provider-independent `AgentOrchestrator` receives no SQL, secret, policy-mutation, payment-state, or arbitrary code tools.

## 5. Agent design

```mermaid
flowchart LR
  P[AI Provider Adapter] --> O[AgentOrchestrator]
  O --> TR[ToolRegistry]
  TR --> PE[PolicyEngine]
  PE --> EE[ExecutionEngine]
  EE --> DB[(PostgreSQL)]
  EE --> RZ[Razorpay Test]
```

Agent identity is explicit:

```json
{
  "agentId": "buyer-agent-7821",
  "role": "AI_BUYER",
  "purpose": "Purchase electronics",
  "sessionId": "sess_83921",
  "authorizedBudget": 5000
}
```

The seeded merchant agent has `catalog.read`, `offer.create`, `campaign.propose`, and `order.create`; its maximum discount is 15%. The buyer is authorized for ₹5,000. Identity and session are carried through offer, cart, checkout, order, and audit records.

## 6. Revenue Agent

The dashboard demonstrates:

- Revenue opportunity ranking from behavioral, product, inventory, and margin signals
- “What should I do next?” revenue simulation
- Keyboard + mouse bundle proposal
- Abandoned-cart recovery
- USB-C cross-sell
- Slow-moving webcam promotion
- Interactive Revenue Opportunity Graph
- AI projection disclaimer (projections are not guaranteed revenue)
- User-facing “Show me why” factors without exposing private chain-of-thought

## 7. AI Buyer and Deal Room

The `/buyer` workspace is a separate agent experience, not the merchant storefront. It provides:

1. Machine-readable merchant discovery
2. Intent search: “work-from-home setup under ₹5,000”
3. Four-product Work From Home bundle (list ₹4,996)
4. Initial ₹4,499 auto-approved offer
5. Buyer request for ₹4,200
6. Merchant counter at ₹4,299
7. Policy checks and merchant approval
8. Budget validation
9. Test checkout
10. Verified success or deliberate safe failure
11. Expandable agent trace

## 8. Agent Commerce API

Discovery:

```http
GET /.well-known/agent-commerce
```

Endpoints:

```text
GET  /api/agent/catalog
GET  /api/agent/search?q=work%20from%20home&budget=5000
GET  /api/agent/product/:id
POST /api/agent/offer
POST /api/agent/cart
POST /api/agent/checkout
GET  /api/agent/order
GET  /api/agent/order/:id
```

Responses are versioned, machine-readable JSON. This layer is conceptually adaptable to ACP, AP2, x402, and NPCI/UAP-style agent commerce. **The project does not claim compliance with any of those protocols.**

## 9. Policy Engine

`lib/policy-engine.ts` is deterministic and reusable:

| Rule | Decision |
|---|---|
| Discount ≤ 10% | Auto-approved |
| Discount > 10% and ≤ 15% | Merchant approval |
| Discount > 15% | Blocked |
| Negotiated reduction > ₹500 | Blocked |
| Post-offer margin < 12% | Blocked |
| Order ≥ ₹10,000 | Merchant approval |
| Order > agent budget | Blocked before payment |
| Campaign budget > ₹5,000 | Merchant approval |
| Any refund | Merchant approval |

Each result contains `allowed`, `status`, `reason`, `requiresApproval`, `financialExposure`, check-level evidence, and policy version.

## 10. Razorpay Test Mode integration

Implemented server-side:

- Test Order creation via the official Razorpay Node SDK
- Amount conversion to paise and amount locking
- Browser-safe `keyId` response; secret never leaves the server
- HMAC-SHA256 checkout signature verification
- Raw-body webhook signature verification
- Captured/failed webhook state transitions
- Application idempotency for order creation
- Webhook event deduplication
- Order/payment status endpoint
- Refund endpoint with mandatory human approval
- Live-key rejection
- Demo fallback when Test Mode credentials are absent

With real Test Mode keys, `/api/payments/create-order` creates a Razorpay Test Order. Without keys, the UI uses an explicitly labeled test simulator so the full judge flow remains demoable. The simulator still signs and verifies a deterministic test payload server-side; it never represents a real provider charge.

## 11. Failure handling

The AI Buyer includes **Simulate Payment Failure**:

```mermaid
flowchart TD
  C[Checkout] --> F[Test payment failure]
  F --> S[Read verified provider state]
  S --> U[Order remains UNPAID]
  U --> K[Cart preserved]
  K --> A[Audit event]
  A --> R[Retry available]
```

A failed payment can never mark the order paid. A verified paid order cannot be downgraded. The UI states: “₹0 charged · order remains UNPAID · cart preserved · audit recorded.”

## 12. Idempotency and audit architecture

- `Idempotency-Key` is mandatory for payment order creation.
- The same key returns the same application/provider order.
- Razorpay event IDs are consumed once.
- Duplicate webhooks return `IGNORED_DUPLICATE` and create a `NO_OP` audit event.
- The production schema includes unique idempotency keys, webhook IDs, payment IDs, and hash-chain fields (`previousHash`, `eventHash`).

Each audit event answers:

- **WHO** acted
- **WHY** it was proposed
- **WHAT** was executed
- **HOW MUCH** was exposed
- **POLICY** and approval used
- **RESULT** after verification

## 13. Security

- Signed, HttpOnly, SameSite merchant sessions
- Dashboard middleware authentication
- Role and merchant identity propagated server-side
- Merchant IDs on all core database records and indexes
- Zod validation at action boundaries
- Agent/API rate limiting
- Server-only Razorpay secrets
- Timing-safe signature comparison
- Raw webhook signature validation
- Fail-closed payment verification
- No arbitrary LLM SQL or direct database access
- No policy-mutation or paid-state tools for agents
- Agent spend-limit enforcement before order creation
- Live Razorpay keys rejected by this build

For a multi-instance production deployment, replace in-memory demo idempotency/rate-limit stores with PostgreSQL/Redis transactions. The included Prisma schema contains the production constraints.

## 14. Database

`prisma/schema.prisma` contains:

- `Merchant`, `User`
- `Agent`, `AgentSession`, `AgentPermission`
- `Product`, `Inventory`
- `Customer`, `CustomerSignal`
- `Cart`, `CartItem`
- `Offer`, `OfferItem`
- `Campaign`
- `Order`, `OrderItem`, `Payment`
- `Policy`, `PolicyDecision`, `Approval`
- `AgentAction`, `AuditEvent`, `WebhookEvent`
- `RevenueOpportunity`

Relations, compound uniqueness, merchant indexes, payment-provider uniqueness, and idempotency constraints are included.

## 15. Setup

### Requirements

- Node.js 20+
- PostgreSQL 15+ (for persistent mode)
- Razorpay **Test Mode** keys

```bash
npm install
cp .env.example .env
```

Fill `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rpay_autopilot"
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_test_secret"
RAZORPAY_WEBHOOK_SECRET="your_test_webhook_secret"
SESSION_SECRET="at-least-32-random-characters"
AGENT_API_TOKEN="a-rotated-gateway-token-for-non-demo-agent-writes"
DEMO_MODE="true"
```

Initialize the database:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed # or: npx prisma db seed
```

Run:

```bash
npm run dev
```

Open `http://localhost:3000`.

### Razorpay webhook

Configure the Test Mode webhook URL:

```text
https://your-host.example/api/payments/webhook
```

Subscribe to at least `payment.captured` and `payment.failed`, and use the same signing secret as `RAZORPAY_WEBHOOK_SECRET`.

## 16. Tests

```bash
npm test
```

Coverage includes:

- 10% / 15% / 20% discount decisions
- Minimum margin block
- Inside/outside agent budget
- Valid/invalid payment signatures
- Raw webhook signatures
- Duplicate webhook rejection
- Failed payment remaining unpaid
- Offer creation, cart creation, checkout, and budget block

## 17. Three-minute judge demo

**0:00 — Merchant command center**  
Open the dashboard. Point to “₹47,300 potential monthly revenue.” Run “What should I do next?” and inspect the Keyboard + Mouse opportunity.

**0:35 — Explainable bounded action**  
Open “Show me why,” then the policy decision. Approve the bundle. Show the interactive opportunity graph.

**1:05 — AI Deal Room**  
Open `/buyer`. Click “I need a work-from-home setup under ₹5,000.” The buyer discovers Nova through the Agent Commerce API. Ask for ₹4,200; the merchant counters at ₹4,299 with attached approval.

**1:50 — Transaction**  
Open “Show me why.” Accept checkout. Show ₹4,299 ≤ ₹5,000 and complete the test payment. The server verifies before setting `PAID`.

**2:25 — Proof and failure**  
Open Agent Trace/Audit Ledger. Replay a webhook to show duplicate-safe handling. Retry the buyer flow and use “Simulate Payment Failure.” Show ₹0 charged, unpaid order, preserved cart, and retry.

## 18. File structure

```text
rpay-autopilot/
├── app/
│   ├── .well-known/agent-commerce/route.ts
│   ├── api/
│   │   ├── agent/{catalog,search,product,offer,cart,checkout,order}/
│   │   ├── auth/demo/route.ts
│   │   └── payments/{create-order,verify,webhook,fail,demo-complete,status,refund}/
│   ├── buyer/page.tsx
│   ├── dashboard/
│   │   ├── overview/page.tsx
│   │   ├── products/page.tsx
│   │   ├── revenue-agent/page.tsx
│   │   ├── opportunities/page.tsx
│   │   ├── campaigns/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── agent-commerce/page.tsx
│   │   ├── policies/page.tsx
│   │   ├── approvals/page.tsx
│   │   ├── audit/page.tsx
│   │   └── settings/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── buyer/buyer-app.tsx
│   ├── dashboard/*
│   ├── landing/*
│   └── ui/*
├── lib/
│   ├── orchestrator.ts
│   ├── policy-engine.ts
│   ├── schemas.ts
│   ├── crypto.ts
│   ├── idempotency.ts
│   ├── demo-data.ts
│   └── demo-store.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── tests/
│   ├── policy.test.ts
│   ├── payment.test.ts
│   └── agent.test.ts
├── .env.example
├── proxy.ts
└── package.json
```

## 19. Future protocol integration

The gateway keeps protocol translation outside the money safety core. Future adapters can map external discovery, mandate, and payment messages into the same internal structured intents. Policy, budget, approval, execution, verification, and audit remain protocol-independent. Candidate adapters include ACP, AP2, x402, and NPCI/UAP-style ecosystems, but each requires its own conformance and security work before any compliance claim.

---

### The four instant answers

1. **Can AI discover what to buy?** Yes.
2. **Can AI negotiate a bounded offer?** Yes.
3. **Can AI actually transact?** Yes, through Razorpay Test Mode.
4. **Can the merchant prove each money action was safe?** Yes—through policy, approval, verification, idempotency, and audit.
