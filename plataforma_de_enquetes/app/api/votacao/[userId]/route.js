import Votacao from "@/models/Votacao";
import connectMongo from "@/utils/dbConnect";

export async function GET(req, { params }) {
  const { userId } = params;
  await connectMongo();

  try {
    const votos = await Votacao.find({ usuarioId: userId });
    return new Response(JSON.stringify({ votos }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao buscar votos", error }),
      { status: 500 }
    );
  }
}
