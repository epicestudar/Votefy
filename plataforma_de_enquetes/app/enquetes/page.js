"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Header from "../components/Header";
import styles from "../styles/enquetes.module.css";

export default function EnquetePage() {
  const [enquetes, setEnquetes] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novaCategoria, setNovaCategoria] = useState(
    "Nenhuma Categoria Selecionada"
  );
  const [novaImagem, setNovaImagem] = useState(""); // Adicionado para imagem
  const [novasOpcoes, setNovasOpcoes] = useState([{ texto: "", votos: 0 }]); // Estado das opções dinâmicas
  const router = useRouter();

  useEffect(() => {
    const fetchEnquetes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/enquetes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEnquetes(data.enquetes || []); // Garante que `enquetes` seja um array
      } else {
        router.push("/login");
      }
    };

    fetchEnquetes();
  }, [router]);

  // Funções de manipulação das opções dinâmicas
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

  const addEnquete = async () => {
    const token = localStorage.getItem("token");

    const novaEnquete = {
      titulo: novoTitulo,
      descricao: novaDescricao,
      categoria: novaCategoria,
      imagem: novaImagem, // Certifique-se de definir isso no estado se necessário
      opcoes: novasOpcoes.filter((opcao) => opcao.texto.trim() !== ""), // Garante que as opções não estejam vazias
    };

    console.log("Dados enviados para criar a enquete:", novaEnquete);

    const response = await fetch("/api/enquetes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(novaEnquete),
    });

    const data = await response.json();

    if (response.ok) {
      setEnquetes([...enquetes, data.enquete]);
      setNovoTitulo("");
      setNovaDescricao("");
      setNovaCategoria("Nenhuma Categoria Selecionada");
      setNovaImagem(""); // Reseta a imagem se necessário
      setNovasOpcoes([{ texto: "", votos: 0 }]); // Reseta as opções
    } else {
      console.error("Erro ao adicionar enquete:", data.message);
    }
  };

  const deleteEnquete = async (id) => {
    const token = localStorage.getItem("token");
    console.log("Tentando excluir enquete com ID:", id); // Loga o ID da enquete

    await fetch(`/api/enquetes?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEnquetes(enquetes.filter((enquete) => enquete._id !== id));
  };

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
 // Redireciona para a página de edição
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles["enquetes-title"]}>Enquetes</h1>

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

        {/* Renderizar opções dinâmicas */}
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

        {/* Botão para adicionar novas opções */}
        <button
          type="button"
          onClick={adicionarOpcao}
          className={styles["add-button"]}
        >
          Adicionar Opção
        </button>

        {/* Botão para enviar a enquete */}
        <button onClick={addEnquete} className={styles["add-button"]}>
          Adicionar Enquete
        </button>

        {/* Listagem de enquetes */}
        <ul className={styles["enquete-list"]}>
          {enquetes.map((enquete) => (
            <li key={enquete._id} className={styles["enquete-item"]}>
              <strong>{enquete.titulo}</strong>
              <p>{enquete.descricao}</p>
              <p>
                <strong>Categoria:</strong> {enquete.categoria}
              </p>
              {enquete.imagem && (
                <img src={enquete.imagem} alt={enquete.titulo} />
              )}
              <p>
                <strong>Opções:</strong>
              </p>
              <ul className={styles["option-list"]}>
                {enquete.opcoes.map((opcao, index) => (
                  <li key={index} className={styles["option-item"]}>
                    {opcao.texto} - {opcao.votos} votos
                  </li>
                ))}
              </ul>
              <button onClick={() => handleEdit(enquete._id)}>Editar</button>
              <button
                onClick={() => deleteEnquete(enquete._id)}
                className={styles["delete-button"]}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
