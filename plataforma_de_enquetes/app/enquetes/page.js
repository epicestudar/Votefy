"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EnquetePage() {
  const [enquetes, setEnquetes] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novaCategoria, setNovaCategoria] = useState(
    "Nenhuma Categoria Selecionada"
  );
  const [novaImagem, setNovaImagem] = useState(""); // Adicionado para imagem
  const [novasOpcoes, setNovasOpcoes] = useState([]); // Adicionado para opções
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

  const addEnquete = async () => {
    const token = localStorage.getItem("token");

    const novaEnquete = {
      titulo: novoTitulo,
      descricao: novaDescricao,
      categoria: novaCategoria,
      imagem: novaImagem, // Certifique-se de definir isso no estado se necessário
      opcoes: [
        { texto: "Opção 1", votos: 0 },
        { texto: "Opção 2", votos: 0 },
      ], // Exemplo, ajuste conforme necessário
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

    console.log("Resposta da criação da enquete:", data);

    if (response.ok) {
      setEnquetes([...enquetes, data.enquete]);
      setNovoTitulo("");
      setNovaDescricao("");
      setNovaCategoria("Nenhuma Categoria Selecionada");
      setNovaImagem(""); // Reseta a imagem se necessário
    } else {
      console.error("Erro ao adicionar enquete:", data.message);
    }
  };



  const deleteEnquete = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/enquetes?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEnquetes(enquetes.filter((enquete) => enquete._id !== id));
  };

  return (
    <div>
      <h1>Enquetes</h1>
      {/* Formulário para adicionar nova enquete */}
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
      <input
        type="text"
        value={novaImagem}
        onChange={(e) => setNovaImagem(e.target.value)}
        placeholder="URL da imagem"
      />
      <textarea
        value={novasOpcoes}
        onChange={(e) => setNovasOpcoes(e.target.value.split("\n"))} // Supondo que as opções sejam inseridas em linhas separadas
        placeholder="Opções (uma por linha)"
      />
      <button onClick={addEnquete}>Adicionar Enquete</button>

      {/* Lista de enquetes */}
      <ul>
        {enquetes.map((enquete) => (
          <li key={enquete._id}>
            <strong>{enquete.titulo}</strong>
            <p>{enquete.descricao}</p>
            <p>
              <strong>Categoria:</strong> {enquete.categoria}
            </p>
            {enquete.imagem && (
              <img src={enquete.imagem} alt={enquete.titulo} width="100" />
            )}
            <p>
              <strong>Opções:</strong>
            </p>
            <ul>
              {enquete.opcoes.map((opcao, index) => (
                <li key={index}>
                  {opcao.texto} - {opcao.votos} votos
                </li>
              ))}
            </ul>
            <button onClick={() => deleteEnquete(enquete._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
