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
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o efeito de carregamento
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Inicia o efeito de carregamento

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, cidade, fotoDePerfil }),
    });

    if (response.ok) {
      setShowRedirectMessage(true); // Mostra a mensagem de redirecionamento
      setTimeout(() => {
        router.push("/login"); // Redireciona para a página de login
      }, 2000); // Duração do efeito visual
    } else {
      setIsSubmitting(false); // Encerra o efeito de carregamento
      alert("Erro ao registrar");
    }
  };

  return (
    <div>
      <Header />
      <hr></hr>
      <div className={styles.container}>
        <form onSubmit={handleRegister} className={styles.form}>
          <h1 className={styles.title}>
            {showRedirectMessage
              ? "Redirecionando para a página de login..."
              : "Registrar"}
          </h1>
          {!showRedirectMessage && (
            <>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <input
                type="text"
                placeholder="Foto de Perfil (URL)"
                value={fotoDePerfil}
                onChange={(e) => setFotoDePerfil(e.target.value)}
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processando..." : "Registrar"}
              </button>
            </>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
