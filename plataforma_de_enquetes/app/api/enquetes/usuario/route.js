import { jwtMiddleware } from "@/utils/middleware";
import {
  getUserEnquetes,
  getEnqueteById,
  addEnquete,
  updateEnquete,
  deleteEnquete,
} from "@/controllers/EnqueteController";

export async function GET(req) {
  return jwtMiddleware(async (req) => {
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // Extrai o 'id' da query string

    if (id) {
      // Se um 'id' for fornecido, buscar apenas essa enquete específica
      return await getEnqueteById(req);
    } else {
      // Caso contrário, buscar todas as enquetes do usuário
      return await getUserEnquetes(req);
    }
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
