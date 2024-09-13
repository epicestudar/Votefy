import React from "react";
import Footer from "../app/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main className="container">
        <h1>Bem-vindo à Plataforma Interativa de Enquetes!</h1>
        <p>
          Nosso site permite que você crie, compartilhe e vote em enquetes sobre
          diversos temas, como tecnologia, esportes, entretenimento e muito
          mais. Conecte-se com outros usuários e descubra as tendências nas
          categorias que você mais gosta.
        </p>
        <p>
          Com uma interface simples e amigável, você pode acompanhar o resultado
          das enquetes em tempo real e se divertir participando de votações em
          assuntos de seu interesse. Crie sua conta e faça parte da nossa
          comunidade!
        </p>

      </main>
      <Footer />
    </div>
  );
}