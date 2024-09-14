import Enquete from "@/models/Enquete";
import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";

// Handler para GET /api/enquetes/[id]
export async function GET(req, { params }) {
  await connectMongo();

  const { id } = params;

  try {
    // Buscar a enquete pelo ID
    const enquete = await Enquete.findById(id).populate("usuarioId");

    if (!enquete) {
      return new Response(JSON.stringify({ error: "Enquete não encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Retorna as informações da enquete e do usuário que a criou
    return new Response(
      JSON.stringify({ enquete, usuario: enquete.usuarioId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar os detalhes da enquete" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
