import { jwtMiddleware } from "@/utils/middleware";
import {
  getEnquete,
  addEnquete,
  updateEnquete,
  deleteEnquete,
} from "@/controllers/EnqueteController";

// Handler para GET
export async function GET(req) {
  return jwtMiddleware(async (req) => {
    return await getEnquete(req);
  })(req);
}

// Handler para POST
export async function POST(req) {
  return jwtMiddleware(async (req) => {
    return await addEnquete(req);
  })(req);
}

// Handler para PUT
export async function PUT(req) {
  return jwtMiddleware(async (req) => {
    return await updateEnquete(req);
  })(req);
}

// Handler para DELETE
export async function DELETE(req) {
  return jwtMiddleware(async (req) => {
    return await deleteEnquete(req);
  })(req);
}
