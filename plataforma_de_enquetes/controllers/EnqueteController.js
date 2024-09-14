import Enquete from "@/models/Enquete";
import connectMongo from "@/utils/dbConnect";




// Função para obter todas as enquetes que o usuário NÃO criou
export const getEnquetesExcludingUser = async (req) => {
  await connectMongo();
  try {
    const usuarioId = req.user.userId; // ID do usuário autenticado
    // Busca todas as enquetes exceto as criadas pelo usuário logado
    const enquetes = await Enquete.find({ usuarioId: { $ne: usuarioId } });
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

// Função para obter todas as enquetes que o usuário criou
export const getUserEnquetes = async (req) => {
  await connectMongo();
  try {
    const usuarioId = req.user.userId; // ID do usuário autenticado
    // Busca todas as enquetes criadas pelo usuário logado
    const enquetes = await Enquete.find({ usuarioId: usuarioId });
    return new Response(JSON.stringify({ enquetes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar enquetes do usuário" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
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
export const updateEnquete = async (req, id) => {
  try {
    await connectMongo();
    const { titulo, descricao, categoria, imagem, opcoes } = await req.json();

    const updatedEnquete = await Enquete.findOneAndUpdate(
      { _id: id, usuarioId: req.user.userId }, // Certifique-se de que o 'id' e o 'usuarioId' estejam corretos
      {
        titulo,
        descricao,
        categoria,
        imagem,
        opcoes,
      },
      { new: true } // Retorna a enquete atualizada
    );

    if (!updatedEnquete) {
      return new Response(
        JSON.stringify({
          error: "Enquete não encontrada ou não pertence ao usuário",
        }),
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
    console.error("Erro ao atualizar enquete:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar enquete" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Função para deletar uma enquete
export const deleteEnquete = async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  console.log("ID da enquete a ser deletada:", id);
  console.log("Usuário autenticado:", req.user); // Verifica se o usuário está correto

  await connectMongo();

  try {
    const deletedEnquete = await Enquete.findOneAndDelete({
      _id: id,
      usuarioId: req.user.userId,
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
    console.error("Erro ao deletar enquete:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao deletar enquete" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
