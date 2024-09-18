import Enquete from "@/models/Enquete";
import Votacao from "@/models/Votacao";
import connectMongo from "@/utils/dbConnect";

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === "POST") {
    const { enqueteId, usuarioId, opcaoVotada } = req.body;

    try {
      // Verificar se o usuário já votou nessa enquete
      const votoExistente = await Votacao.findOne({ enqueteId, usuarioId });

      if (votoExistente) {
        return res.status(400).json({ message: "Usuário já votou nesta enquete" });
      }

      // Atualizar a contagem de votos na opção selecionada
      const enquete = await Enquete.findById(enqueteId);
      if (!enquete) {
        return res.status(404).json({ message: "Enquete não encontrada" });
      }

      enquete.opcoes[opcaoVotada].votos += 1;
      await enquete.save();

      // Registrar a votação
      const novaVotacao = new Votacao({ enqueteId, usuarioId, opcaoVotada });
      await novaVotacao.save();

      return res.status(200).json({ message: "Voto registrado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao registrar votação", error });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}