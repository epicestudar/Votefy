import jwt from "jsonwebtoken";

export const jwtMiddleware = (handler) => async (req) => {
  const authorizationHeader = req.headers.get("authorization");
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
    req.user = decoded; // Adiciona a propriedade `user` ao `req`

    // Passa `req.user` para o handler
    return handler(req);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Token inválido" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
};
