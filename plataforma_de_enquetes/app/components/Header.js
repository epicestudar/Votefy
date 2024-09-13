"use client"; // Adiciona a diretiva "use client" para indicar que este é um componente de cliente

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Importa o componente Link para navegação
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
        {/* Link para a página inicial */}
        <Link href="/" passHref>
          <img src="/img/logo/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className={styles.fields}>
        {isLoggedIn ? (
          <>
            <a
              href="/criar-enquete"
              title="Criar Enquete"
              className={styles.link}
            >
              Criar Enquete
            </a>
            <a
              href="/suas_enquetes"
              title="Suas Enquetes"
              className={styles.link}
            >
              Suas Enquetes
            </a>
            <a href="/historico" title="Histórico" className={styles.link}>
              Histórico
            </a>
          </>
        ) : (
          <>
            <a href="/login" title="Login" className={styles.link}>
              Login
            </a>
            <a href="/register" title="Registro" className={styles.link}>
              Registro
            </a>
          </>
        )}
      </div>
      {isLoggedIn && (
        <div className={styles.logout}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
