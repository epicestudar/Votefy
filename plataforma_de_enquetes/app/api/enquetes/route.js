import { jwtMiddleware } from "@/utils/middleware";
import {
  getEnquetesExcludingUser
} from "@/controllers/EnqueteController";

// Handler para GET
// Handler para GET de enquetes que o usuário NÃO criou
export async function GET(req) {
  return jwtMiddleware(async (req) => {
    return await getEnquetesExcludingUser(req);
  })(req);
}