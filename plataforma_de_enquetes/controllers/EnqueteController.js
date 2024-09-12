import Enquete from "@/models/Enquete";
import connectMongo from "@/utils/dbConnect";

// Função para obter todas as enquetes
export const getEnquete = async (req) => {
  await connectMongo();
  try {
    const enquetes = await Enquete.find({ usuarioId: req.user.userId }); // Altere 'userId' para 'usuarioId'
    return new Response(JSON.stringify({ enquetes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar enquetes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const addEnquete = async (req) => {
  try {
    const { titulo, descricao, categoria, imagem, opcoes } = await req.json();
    const userId = req.user?.userId; // Garantir que userId está acessível

    console.log("Dados recebidos para criação de enquete:", {
      titulo,
      descricao,
      categoria,
      imagem,
      opcoes,
      userId,
    });

    if (!userId) {
      throw new Error(
        "Usuário não autenticado ou ID de usuário não encontrado"
      );
    }

    await connectMongo();

    // Verificar e formatar `opcoes` para garantir que seja um array de objetos com `texto` e `votos`
    const formattedOpcoes = Array.isArray(opcoes)
      ? opcoes.map((opcao) => ({
          texto: opcao.texto || "",
          votos: opcao.votos || 0,
        }))
      : [];

    console.log("Opções formatadas:", formattedOpcoes);

    // Criar a nova enquete
    const novaEnquete = new Enquete({
      titulo,
      descricao,
      categoria,
      imagem,
      opcoes: formattedOpcoes,
      usuarioId: userId, // Definindo usuário ID
    });

    const resultado = await novaEnquete.save();

    console.log("Enquete criada com sucesso:", resultado);

    return new Response(JSON.stringify({ enquete: resultado }), {
      status: 201,
    });
  } catch (error) {
    console.error("Erro ao criar enquete:", error);

    return new Response(
      JSON.stringify({
        message: "Erro ao criar enquete",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};





// Função para atualizar uma enquete
export const updateEnquete = async (req) => {
  const { id } = req.query; // Certifique-se de que `req.query` é o método correto para obter o ID
  const data = await req.json();
  await connectMongo();

  try {
    const updatedEnquete = await Enquete.findOneAndUpdate(
      { _id: id, usuarioId: req.user.userId }, // Altere 'userId' para 'usuarioId'
      data,
      { new: true }
    );
    if (!updatedEnquete) {
      return new Response(
        JSON.stringify({ message: "Enquete não encontrada" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ enquete: updatedEnquete }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao atualizar a enquete" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Função para deletar uma enquete
export const deleteEnquete = async (req) => {
  const { id } = req.query; // Certifique-se de que `req.query` é o método correto para obter o ID
  await connectMongo();

  try {
    const deletedEnquete = await Enquete.findOneAndDelete({
      _id: id,
      usuarioId: req.user.userId, // Altere 'userId' para 'usuarioId'
    });
    if (!deletedEnquete) {
      return new Response(
        JSON.stringify({ message: "Enquete não encontrada" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({ message: "Enquete deletada com sucesso" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao deletar enquete" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
