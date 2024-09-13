"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEnquetePage({ params }) {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    const fetchEnquete = async () => {
      // Acessar o ID a partir de `params.id` (é passado via props)
      const response = await fetch(`/api/enquetes/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setTitulo(data.titulo);
        setDescricao(data.descricao);
        setCategoria(data.categoria);
        setOpcoes(data.opcoes);
      } else {
        console.error("Erro ao carregar enquete", data.message);
      }
    };

    fetchEnquete();
  }, [params.id]); // Usar params.id diretamente

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEnquete = {
      titulo,
      descricao,
      categoria,
      opcoes,
    };

    const response = await fetch(`/api/enquetes/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEnquete),
    });

    if (response.ok) {
      router.push("/"); // Redireciona para a página inicial após salvar
    } else {
      console.error("Erro ao atualizar enquete");
    }
  };

  return (
    <div>
      <h1>Editar Enquete</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título da enquete"
        />
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição da enquete"
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="Tecnologia">Tecnologia</option>
          <option value="Esportes">Esportes</option>
          <option value="Viagens">Viagens</option>
          <option value="Comida">Comida</option>
          <option value="Política">Política</option>
          <option value="Educação">Educação</option>
          {/* Adicione mais categorias aqui */}
        </select>

        {/* Código para editar as opções */}
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}