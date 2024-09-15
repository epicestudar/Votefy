"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap

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
    <div>
      <Header />
      <hr></hr>
      <div className="container mt-5">
        <h1 className="mb-4">Editar Perfil</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={userData.nome}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cidade" className="form-label">
              Cidade:
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={userData.cidade}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fotoDePerfil" className="form-label">
              Foto de Perfil URL:
            </label>
            <input
              type="text"
              id="fotoDePerfil"
              name="fotoDePerfil"
              value={userData.fotoDePerfil}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
