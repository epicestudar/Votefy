import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./header.module.css"; // Importando os estilos

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Coloque sua imagem de logo aqui */}
        <img src="/img/logo/logo.png" alt="Logo" />
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
      {isLoggedIn && (
        <div className={styles.logout}>
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
    </header>
  );
}
