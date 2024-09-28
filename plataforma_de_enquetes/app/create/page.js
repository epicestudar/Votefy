"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap
import { Button, Form, Card } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/createEnquete.module.css";

export default function CriarEnquetePage() {
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [novaCategoria, setNovaCategoria] = useState(
    "Nenhuma Categoria Selecionada"
  );
  const [novaImagem, setNovaImagem] = useState("");
  const [novasOpcoes, setNovasOpcoes] = useState([
    { texto: "" },
    { texto: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Funções para adicionar, atualizar e remover opções
  const adicionarOpcao = () => {
    setNovasOpcoes([...novasOpcoes, { texto: "" }]);
  };

  const removerOpcao = (index) => {
    if (novasOpcoes.length > 2) {
      const novas = [...novasOpcoes];
      novas.splice(index, 1);
      setNovasOpcoes(novas);
    }
  };

  const atualizarOpcao = (index, texto) => {
    const novas = [...novasOpcoes];
    novas[index].texto = texto;
    setNovasOpcoes(novas);
  };

  // Função para enviar a enquete para o backend
  const addEnquete = async () => {
    const token = localStorage.getItem("token");

    // Filtrando opções não vazias
    const opcoesValidas = novasOpcoes.filter(
      (opcao) => opcao.texto.trim() !== ""
    );

    // Verificando se os campos obrigatórios estão preenchidos
    if (novoTitulo.trim() === "" || opcoesValidas.length < 2) {
      setErrorMessage("Título e pelo menos duas opções são obrigatórios.");
      return;
    } else {
      setErrorMessage("");
    }

    const novaEnquete = {
      titulo: novoTitulo,
      descricao: novaDescricao,
      categoria: novaCategoria,
      imagem: novaImagem,
      opcoes: opcoesValidas,
    };

    const response = await fetch("/api/enquetes/usuario", {
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
    <div>
      <Header />
      <hr />
      <div className="container mt-5">
        <h1 className={`${styles.title} mb-4`}>Criar Nova Enquete</h1>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <Card className="p-4 shadow-sm">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título da Enquete</Form.Label>
              <Form.Control
                type="text"
                value={novoTitulo}
                onChange={(e) => setNovoTitulo(e.target.value)}
                placeholder="Digite o título da enquete"
                className={styles.input}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição da Enquete</Form.Label>
              <Form.Control
                type="text"
                value={novaDescricao}
                onChange={(e) => setNovaDescricao(e.target.value)}
                placeholder="Digite a descrição da enquete"
                className={styles.input}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                className={styles.input}
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
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL da Imagem (opcional)</Form.Label>
              <Form.Control
                type="text"
                value={novaImagem}
                onChange={(e) => setNovaImagem(e.target.value)}
                placeholder="Digite a URL da imagem"
                className={styles.input}
              />
            </Form.Group>

            {/* Renderização dinâmica de opções */}
            {novasOpcoes.map((opcao, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <Form.Control
                  type="text"
                  value={opcao.texto}
                  onChange={(e) => atualizarOpcao(index, e.target.value)}
                  placeholder={`Opção ${index + 1}`}
                  className={`me-2 ${styles.input}`}
                  required
                />
                <Button
                  variant="danger"
                  onClick={() => removerOpcao(index)}
                  disabled={novasOpcoes.length <= 2} // Desabilitar se houver 2 opções ou menos
                >
                  Remover
                </Button>
              </div>
            ))}

            <Button
              variant="primary"
              onClick={adicionarOpcao}
              className={`me-2 ${styles.button}`}
            >
              Adicionar Opção
            </Button>

            <Button
              variant="success"
              onClick={addEnquete}
              className={styles.button}
            >
              Criar Enquete
            </Button>
          </Form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
