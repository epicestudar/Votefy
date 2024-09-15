"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/forms.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controle do efeito
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Inicia o efeito de carregamento

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Salva o token no localStorage
      setShowRedirectMessage(true); // Mostra a mensagem de redirecionamento
      setTimeout(() => {
        router.push("/enquetes"); // Redireciona para a página de enquetes
      }, 2000); // Duração do efeito visual
    } else {
      setIsSubmitting(false); // Encerra o efeito de carregamento
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div>
      <Header />
      <hr></hr>
      <div className={styles.container}>
        {!showRedirectMessage ? (
          <form onSubmit={handleLogin} className={styles.form}>
            <h1 className={styles.title}>Login</h1>
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processando..." : "Entrar"}
            </button>
          </form>
        ) : (
          <div className={styles.redirectContainer}>
            <p className={styles.redirectMessage}>
              Redirecionando para a página de enquetes...
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
