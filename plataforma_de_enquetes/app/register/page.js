"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/forms.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cidade, setCidade] = useState("");
  const [fotoDePerfil, setFotoDePerfil] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, cidade, fotoDePerfil }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      alert("Erro ao registrar");
    }
  };

  return (
    <div>
      <Header />
      <hr></hr>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Foto de Perfil (URL)"
          value={fotoDePerfil}
          onChange={(e) => setFotoDePerfil(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      <Footer />
    </div>
  );
}
