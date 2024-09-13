import React from "react";
import styles from "../styles/header.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Coloque sua imagem de logo aqui */}
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className={styles.fields}>
        <a href="/criar-enquete" title="Criar Enquete" className={styles.link}>
          Criar Enquete
        </a>
        <a href="/suas_enquetes" title="Suas Enquetes" className={styles.link}>
          Suas Enquetes
        </a>
        <a href="/historico" title="historico" className={styles.link}>
          Histórico
        </a>
      </div>
      <div className={styles.logout}>
        <button>Sair</button>
      </div>
    </header>
  );
}