import { NextRequest } from "next/server";
import { handleApplicationRequest } from "@/lib/intake";

export async function POST(req: NextRequest) {
  return handleApplicationRequest(req);
}
