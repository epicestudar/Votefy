import Enquete from "@/models/Enquete";
import Votacao from "@/models/Votacao";
import connectMongo from "@/utils/dbConnect";

// Função que lida com o método POST
export async function POST(req) {
  await connectMongo();

  try {
    const { enqueteId, usuarioId, opcaoVotada } = await req.json();
    console.log("Dados recebidos: ", { enqueteId, usuarioId, opcaoVotada });

    // Verificar se o usuário já votou nessa enquete
    const votoExistente = await Votacao.findOne({ enqueteId, usuarioId });
    if (votoExistente) {
      return new Response(
        JSON.stringify({ message: "Usuário já votou nesta enquete" }),
        { status: 400 }
      );
    }

    // Atualizar a contagem de votos na opção selecionada
    const enquete = await Enquete.findById(enqueteId);
    if (!enquete) {
      return new Response(
        JSON.stringify({ message: "Enquete não encontrada" }),
        { status: 404 }
      );
    }

    if (!enquete.opcoes[opcaoVotada]) {
      return new Response(
        JSON.stringify({ message: "Opção votada inválida" }),
        { status: 400 }
      );
    }

    enquete.opcoes[opcaoVotada].votos += 1;
    await enquete.save();

    // Salvar o registro de votação
    const novaVotacao = new Votacao({ enqueteId, usuarioId, opcaoVotada });
    await novaVotacao.save();

    // Retornar a enquete atualizada com os votos
    return new Response(JSON.stringify({ enquete }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao registrar votação", error }),
      { status: 500 }
    );
  }
}
