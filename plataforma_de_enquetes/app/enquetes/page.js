"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";

export default function EnquetePage() {
  const [enquetes, setEnquetes] = useState([]); // Inicializa com um array vazio
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novaCategoria, setNovaCategoria] = useState(
    "Nenhuma Categoria Selecionada"
  );

  useEffect(() => {
    const fetchEnquetes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirecionar para login se não estiver autenticado
        return;
      }

      const response = await fetch("/api/enquetes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Resposta da API ao recuperar enquetes:", data);

      if (response.ok) {
        setEnquetes(data || []); // Garante que `enquetes` seja um array
      } else {
        // Trate o erro adequadamente
        console.error("Erro ao recuperar enquetes:", data);
      }
    };

    fetchEnquetes();
  }, []);


  const addEnquete = async () => {
    const token = localStorage.getItem("token");
    console.log("Dados da enquete a serem enviados:", {
      titulo: novoTitulo,
      descricao: novaDescricao,
      categoria: novaCategoria,
    });

    const response = await fetch("/api/enquetes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo: novoTitulo,
        descricao: novaDescricao,
        categoria: novaCategoria,
      }),
    });

    const data = await response.json();
    console.log("Resposta da API ao adicionar enquete:", data);

    if (response.ok) {
      setEnquetes([...enquetes, data]); // Atualize com o objeto retornado
    } else {
      // Trate o erro adequadamente
      console.error("Erro ao adicionar enquete:", data);
    }
    setNovoTitulo("");
    setNovaDescricao("");
    setNovaCategoria("Nenhuma Categoria Selecionada"); // Reseta a categoria
  };



  return (
    <div>
      <h1>Lista de Enquetes</h1>
      <input
        type="text"
        value={novoTitulo}
        onChange={(e) => setNovoTitulo(e.target.value)}
        placeholder="Título da enquete"
      />
      <input
        type="text"
        value={novaDescricao}
        onChange={(e) => setNovaDescricao(e.target.value)}
        placeholder="Descrição da enquete"
      />
      <select
        value={novaCategoria}
        onChange={(e) => setNovaCategoria(e.target.value)}
      >
        <option value="Nenhuma Categoria Selecionada">
          Nenhuma Categoria Selecionada
        </option>
        <option value="Tecnologia">Tecnologia</option>
        <option value="Entretenimento">Entretenimento</option>
        <option value="Esportes">Esportes</option>
        <option value="Viagens">Viagens</option>
        <option value="Comida">Comida</option>
        <option value="Estilo de Vida">Estilo de Vida</option>
        <option value="Moda e Beleza">Moda e Beleza</option>
        <option value="Educação">Educação</option>
        <option value="Política">Política</option>
        <option value="Saúde e Bem-Estar">Saúde e Bem-Estar</option>
        <option value="Finanças e Economia">Finanças e Economia</option>
        <option value="Curiosidades">Curiosidades</option>
      </select>
      <button onClick={addEnquete}>Adicionar Enquete</button>

      {/* Lista de enquetes */}
      <ul className={styles.list}>
        {enquetes.map((enquete) => (
          <li key={enquete._id} className={styles.item}>
            <h2 className={styles.itemHeading}>
              {enquete.titulo || "Título não disponível"}
            </h2>
            <p>{enquete.descricao || "Descrição não disponível"}</p>
            <p>
              <strong>Categoria:</strong> {enquete.categoria}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
