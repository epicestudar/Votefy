"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/editProfile.module.css"; // Importando os estilos

export default function EditProfilePage() {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    cidade: "",
    fotoDePerfil: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Erro ao buscar dados do usuário");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      router.push("/enquetes"); // Redireciona após atualização bem-sucedida
    } else {
      console.error("Erro ao atualizar perfil");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputLabel}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={userData.nome}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputLabel}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputLabel}>
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={userData.cidade}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputLabel}>
          <label htmlFor="fotoDePerfil">Foto de Perfil URL:</label>
          <input
            type="text"
            id="fotoDePerfil"
            name="fotoDePerfil"
            value={userData.fotoDePerfil}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Salvar
        </button>
      </form>
    </div>
  );
}
