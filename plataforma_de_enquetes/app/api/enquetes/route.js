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
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // Extrai o 'id' da query string

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID da enquete não fornecido" }),
        { status: 400 }
      );
    }

    return await updateEnquete(req, id); // Passa o 'id' para o controlador
  })(req);
}

// Handler para DELETE
export async function DELETE(req) {
  return jwtMiddleware(async (req) => {
    return await deleteEnquete(req);
  })(req);
}
