import { NextRequest } from "next/server";
import { handleInquiryRequest } from "@/lib/intake";

export async function POST(req: NextRequest) {
  return handleInquiryRequest(req);
}
