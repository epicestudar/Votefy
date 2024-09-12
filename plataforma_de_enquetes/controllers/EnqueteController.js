import Enquete from "@/models/Enquete";
import User from "@/models/User";

export const addEnquete = async (req) => {
  try {
    const { titulo, descricao, categoria, imagem, opcoes } = await req.json();
    const { userId } = req;

    console.log("Dados recebidos para criação de enquete:", {
      titulo,
      descricao,
      categoria,
      imagem,
      opcoes,
    });

    // Verificar se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      console.log("Usuário não encontrado:", userId);
      return new Response(
        JSON.stringify({ message: "Usuário não encontrado" }),
        { status: 404 }
      );
    }

    // Criar a nova enquete
    const novaEnquete = new Enquete({
      titulo,
      descricao,
      categoria,
      imagem,
      opcoes,
      usuarioId: userId,
    });

    const savedEnquete = await novaEnquete.save();
    console.log("Enquete criada com sucesso:", savedEnquete);

    return new Response(JSON.stringify(savedEnquete), { status: 201 });
  } catch (error) {
    console.error("Erro ao criar enquete:", error.message);
    return new Response(
      JSON.stringify({
        message: "Erro ao criar enquete",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};



// Recuperar todas as enquetes
export const getEnquete = async (req) => {
  try {
    const enquetes = await Enquete.find().populate("usuarioId", "nome email");
    console.log("Enquetes recuperadas:", enquetes);
    return new Response(JSON.stringify(enquetes), { status: 200 });
  } catch (error) {
    console.error("Erro ao recuperar enquetes:", error.message);
    return new Response(
      JSON.stringify({
        message: "Erro ao recuperar enquetes",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};


// Atualizar uma enquete existente
export const updateEnquete = async (req) => {
  try {
    const { id, titulo, descricao, categoria, imagem, opcoes } = await req.json();
    const { userId } = req;

    // Verificar se a enquete existe
    const enquete = await Enquete.findById(id);
    if (!enquete) {
      return new Response(JSON.stringify({ message: "Enquete não encontrada" }), { status: 404 });
    }

    // Verificar se o usuário que está tentando atualizar é o criador
    if (enquete.usuarioId.toString() !== userId) {
      return new Response(JSON.stringify({ message: "Usuário não autorizado" }), { status: 403 });
    }

    // Atualizar os campos da enquete
    enquete.titulo = titulo || enquete.titulo;
    enquete.descricao = descricao || enquete.descricao;
    enquete.categoria = categoria || enquete.categoria;
    enquete.imagem = imagem || enquete.imagem;
    enquete.opcoes = opcoes || enquete.opcoes;

    await enquete.save();
    return new Response(JSON.stringify(enquete), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro ao atualizar enquete", error: error.message }), { status: 500 });
  }
};

// Deletar uma enquete existente
export const deleteEnquete = async (req) => {
  try {
    const { id } = await req.json();
    const { userId } = req;

    const enquete = await Enquete.findById(id);
    if (!enquete) {
      return new Response(JSON.stringify({ message: "Enquete não encontrada" }), { status: 404 });
    }

    // Verificar se o usuário que está tentando deletar é o criador
    if (enquete.usuarioId.toString() !== userId) {
      return new Response(JSON.stringify({ message: "Usuário não autorizado" }), { status: 403 });
    }

    await Enquete.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Enquete deletada com sucesso" }), { status: 200 });
  } catch (error) 
 { return new Response(JSON.stringify({ message: "Erro ao deletar enquete", error: error.message }), { status: 500 }); } };