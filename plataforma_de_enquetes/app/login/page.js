"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/forms.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Salva o token no localStorage
      router.push("/enquetes"); // Redireciona para a página de enquetes
    } else {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
