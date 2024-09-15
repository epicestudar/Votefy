"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap
import { Button, Form, InputGroup, Card } from "react-bootstrap";
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

  const router = useRouter();

  // Funções para adicionar, atualizar e remover opções
  const adicionarOpcao = () => {
    setNovasOpcoes([...novasOpcoes, { texto: "" }]);
  };

  const removerOpcao = (index) => {
    // Permitir a remoção apenas se houver mais de duas opções
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

    const novaEnquete = {
      titulo: novoTitulo,
      descricao: novaDescricao,
      categoria: novaCategoria,
      imagem: novaImagem,
      opcoes: novasOpcoes.filter((opcao) => opcao.texto.trim() !== ""),
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
       <hr></hr>
       <div className="container mt-5">
         <h1 className={`${styles.title} mb-4`}>Criar Nova Enquete</h1>
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
                 {/* Outras opções de categoria */}
               </Form.Select>
             </Form.Group>

             <Form.Group className="mb-3">
               <Form.Label>URL da Imagem</Form.Label>
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
