"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./header.module.css";

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

  // Função para navegação programática para criar enquete
  const navigateToCreateEnquete = () => {
    router.push("/create"); // Substitua "/create" pela rota correta para o formulário de criação
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
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
              onClick={(e) => {
                e.preventDefault(); // Previne o comportamento padrão do link
                navigateToCreateEnquete(); // Navega para a página de criação de enquete
              }}
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
