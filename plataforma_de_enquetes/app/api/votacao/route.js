import Enquete from "@/models/Enquete";
import Votacao from "@/models/Votacao";
import connectMongo from "@/utils/dbConnect";

// Função que lida com o método POST
export async function POST(req) {
  await connectMongo(); // Conectar ao banco de dados

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
      console.error("Enquete não encontrada com o ID:", enqueteId);
      return new Response(
        JSON.stringify({ message: "Enquete não encontrada" }),
        { status: 404 }
      );
    }

    if (!enquete.opcoes[opcaoVotada]) {
      console.error("Opção votada inválida:", opcaoVotada);
      return new Response(
        JSON.stringify({ message: "Opção votada inválida" }),
        {
          status: 400,
        }
      );
    }

    enquete.opcoes[opcaoVotada].votos += 1;
    await enquete.save();

    try {
      const novaVotacao = new Votacao({ enqueteId, usuarioId, opcaoVotada });
      await novaVotacao.save();
    } catch (error) {
      console.error("Erro ao salvar a votação:", error);
      return new Response(
        JSON.stringify({ message: "Erro ao salvar a votação" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Voto registrado com sucesso" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao registrar votação", error }),
      { status: 500 }
    );
  }
}
