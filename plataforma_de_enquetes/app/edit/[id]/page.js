"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Certifique-se de que está importando `useParams`
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EditEnquetePage() {
  const [enquete, setEnquete] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    imagem: "",
    opcoes: [{ texto: "" }],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams(); // Obtém o ID da URL

  useEffect(() => {
    const fetchEnquete = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`/api/enquetes/usuario?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.enquete) {
            setEnquete(data.enquete); // Obtendo a enquete diretamente
          }
          setLoading(false);
        } else {
          console.error("Erro ao buscar a enquete");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        setLoading(false);
      }
    };


    fetchEnquete();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquete((prevEnquete) => ({ ...prevEnquete, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/enquetes/usuario?id=${id}`, {
      // ID deve estar correto aqui
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo: enquete.titulo,
        descricao: enquete.descricao,
        categoria: enquete.categoria,
        imagem: enquete.imagem,
        opcoes: enquete.opcoes,
      }),
    });

    if (response.ok) {
      router.push("/enquetes");
    } else {
      console.error("Erro ao atualizar a enquete");
    }
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe um indicador de carregamento
  }

  return (
    <div>
      <Header />
      <hr></hr>
      <div className="container mt-5">
        <h1>Editar Enquete</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="form-control"
              value={enquete.titulo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              className="form-control"
              value={enquete.descricao}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="categoria">Categoria</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              className="form-control"
              value={enquete.categoria}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="imagem">URL da Imagem</label>
            <input
              type="text"
              id="imagem"
              name="imagem"
              className="form-control"
              value={enquete.imagem}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Opções</label>
            {enquete.opcoes.map((opcao, index) => (
              <input
                key={index}
                type="text"
                className="form-control mb-2"
                value={opcao.texto}
                onChange={(e) => {
                  const newOpcoes = [...enquete.opcoes];
                  newOpcoes[index].texto = e.target.value;
                  setEnquete({ ...enquete, opcoes: newOpcoes });
                }}
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary">
            Atualizar Enquete
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
