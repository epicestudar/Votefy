import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import jwt from "jsonwebtoken";

export async function GET(request) {
  await connectMongo();

  const authorizationHeader = request.headers.get("authorization");
  const token = authorizationHeader?.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Token ausente ou inválido" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuário não encontrado" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Retorna os dados do usuário
    return new Response(
      JSON.stringify({
        nome: user.nome,
        email: user.email,
        cidade: user.cidade,
        fotoDePerfil: user.fotoDePerfil,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Token inválido" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  await connectMongo();

  const authorizationHeader = request.headers.get("authorization");
  const token = authorizationHeader?.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Token ausente ou inválido" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { nome, email, cidade } = await request.json();

    const user = await User.findById(decoded.userId);

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuário não encontrado" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Atualiza os dados do usuário
    user.nome = nome || user.nome;
    user.email = email || user.email;
    user.cidade = cidade || user.cidade;

    await user.save();

    return new Response(
      JSON.stringify({
        nome: user.nome,
        email: user.email,
        cidade: user.cidade,
        fotoDePerfil: user.fotoDePerfil,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Token inválido" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  await connectMongo();

  const authorizationHeader = request.headers.get("authorization");
  const token = authorizationHeader?.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Token ausente ou inválido" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndDelete(decoded.userId);

    return new Response(
      JSON.stringify({ message: "Usuário deletado com sucesso" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Token inválido" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}