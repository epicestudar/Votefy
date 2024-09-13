"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/enquetes.module.css";

export default function CriarEnquetePage() {
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novaCategoria, setNovaCategoria] = useState(
    "Nenhuma Categoria Selecionada"
  );
  const [novaImagem, setNovaImagem] = useState("");
  const [novasOpcoes, setNovasOpcoes] = useState([{ texto: "", votos: 0 }]);
  const router = useRouter();

  // Funções para adicionar, atualizar e remover opções
  const adicionarOpcao = () => {
    setNovasOpcoes([...novasOpcoes, { texto: "", votos: 0 }]);
  };

  const atualizarOpcao = (index, valor) => {
    const novas = [...novasOpcoes];
    novas[index].texto = valor;
    setNovasOpcoes(novas);
  };

  const removerOpcao = (index) => {
    const novas = novasOpcoes.filter((_, i) => i !== index);
    setNovasOpcoes(novas);
  };

  // Função para enviar a enquete para o backend
  const addEnquete = async () => {
    const token = localStorage.getItem("token");

    const novaEnquete = {
      titulo: novoTitulo,
      descricao: novaDescricao,
      categoria: novaCategoria,
      imagem: novaImagem,
      opcoes: novasOpcoes.filter((opcao) => opcao.texto.trim() !== ""),
    };

    const response = await fetch("/api/enquetes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(novaEnquete),
    });

    if (response.ok) {
      // Redireciona o usuário de volta para a página estilizada
      router.push("/enquetes");
    } else {
      console.error("Erro ao adicionar enquete");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Criar Nova Enquete</h1>

      {/* Formulário de criação de enquetes */}
      <input
        type="text"
        value={novoTitulo}
        onChange={(e) => setNovoTitulo(e.target.value)}
        placeholder="Título da enquete"
        className={styles["input-field"]}
      />
      <input
        type="text"
        value={novaDescricao}
        onChange={(e) => setNovaDescricao(e.target.value)}
        placeholder="Descrição da enquete"
        className={styles["input-field"]}
      />
      <select
        value={novaCategoria}
        onChange={(e) => setNovaCategoria(e.target.value)}
        className={styles["select-field"]}
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

      <input
        type="text"
        value={novaImagem}
        onChange={(e) => setNovaImagem(e.target.value)}
        placeholder="URL da imagem"
        className={styles["input-field"]}
      />

      {/* Renderização dinâmica de opções */}
      {novasOpcoes.map((opcao, index) => (
        <div key={index} className={styles["option-item"]}>
          <input
            type="text"
            value={opcao.texto}
            onChange={(e) => atualizarOpcao(index, e.target.value)}
            placeholder={`Opção ${index + 1}`}
            className={styles["input-field"]}
          />
          <button
            type="button"
            onClick={() => removerOpcao(index)}
            className={styles["remove-button"]}
          >
            Remover
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={adicionarOpcao}
        className={styles["add-button"]}
      >
        Adicionar Opção
      </button>

      {/* Botão para enviar a enquete */}
      <button onClick={addEnquete} className={styles["add-button"]}>
        Criar Enquete
      </button>
    </div>
  );
}
