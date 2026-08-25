import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status, headers: { "Cache-Control": "no-store" } });
}

export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: { message, details } }, { status });
}

export function zodError(error: ZodError) {
  return apiError("Request schema validation failed", 422, error.flatten());
}
