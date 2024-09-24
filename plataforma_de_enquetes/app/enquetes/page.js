"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/enquetes.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { decode } from "jsonwebtoken";

export default function EnquetePage() {
  const [enquetes, setEnquetes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState({
    nome: "",
    email: "",
    cidade: "",
    fotoDePerfil: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [votos, setVotos] = useState({}); // Novo estado para armazenar os votos
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
        setEnquetes(data.enquetes || []);

        // Atualiza os votos para as enquetes que o usuário já votou
        const votosAnteriores = {};
        data.enquetes.forEach((enquete) => {
          if (enquete.usuarioJaVotou) {
            votosAnteriores[enquete._id] = enquete.opcoes;
          }
        });
        setVotos(votosAnteriores);
      } else {
        router.push("/login");
      }
    };

    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data); // Certifique-se de que 'data' contém o _id
      } else {
        console.error("Erro ao obter informações do usuário");
        router.push("/login");
      }
    };

    fetchEnquetes();
    fetchUserInfo();
  }, [router]);

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

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Atualiza o termo de busca
  };

  // Filtra as enquetes com base no termo de busca
  const filteredEnquetes = enquetes.filter((enquete) =>
    enquete.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Perfil excluído com sucesso!");
      router.push("/login"); // Redireciona para a página de login após exclusão
    } else {
      alert("Erro ao excluir perfil");
    }
  };

  const handleVote = async (enqueteId, opcaoIndex) => {
    const token = localStorage.getItem("token");

    // Decodifica o token para extrair o ID do usuário
    const decodedToken = decode(token);
    const usuarioId = decodedToken?.userId;

    if (!usuarioId) {
      alert("Erro: usuário não encontrado. Faça login novamente.");
      router.push("/login");
      return;
    }

    const response = await fetch("/api/votacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        enqueteId,
        usuarioId,
        opcaoVotada: opcaoIndex,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      // Atualiza os votos no estado com as novas opções votadas
      setVotos((prevVotos) => ({
        ...prevVotos,
        [enqueteId]: data.enquete.opcoes,
      }));

      // Mostra os resultados instantaneamente após o voto
      alert("Voto registrado com sucesso!");
    } else {
      alert("Erro ao registrar voto");
    }
  };


const jaVotou = (enqueteId) => {
  // Verifica se o usuário já votou nesta enquete
  return !!votos[enqueteId]; // Se houver votos para essa enquete, o usuário já votou
};

  return (
    <div>
      <Header />
      <hr></hr>
      <div className={styles.container}>
        {/* Div do lado esquerdo - Perfil do Usuário */}
        <div className={styles.sidebar}>
          <div className={styles.profile}>
            <div className={styles.profileInfo}>
              <img
                src={userInfo.fotoDePerfil || "/img/user/user.png"} // Usa a foto do usuário ou uma imagem padrão
                alt="Foto de Perfil"
                className={styles.avatar}
              />
              <div className={styles.info}>
                <h2>{userInfo.nome}</h2>
                <p>{userInfo.email}</p>
                <p>{userInfo.cidade}</p>
                <button
                  onClick={handleEditProfile}
                  className="btn btn-warning me-2 editButton" // Adiciona estilização personalizada
                >
                  Editar Perfil
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-danger deleteButton" // Adiciona estilização personalizada
                >
                  Deletar Perfil
                </button>

                {/* Modal de confirmação */}
                {showModal && (
                  <div className={styles.modal}>
                    <div className={styles.modalContent}>
                      <p>Você tem certeza que deseja apagar o seu perfil?</p>
                      <button
                        onClick={handleDelete}
                        className={styles.confirmButton}
                      >
                        Sim
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className={styles.cancelButton}
                      >
                        Não
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.history}>
              <h3>Histórico Recentes</h3>
              <div className={styles.historySections}>
                <div className={styles.section}>
                  <h4>Enquetes Ativas</h4>
                  <ul>
                    <li className={styles.listItem}>
                      <img
                        src="/img/icons/enquete_ativa.png"
                        alt="Ícone Ativo"
                        className={styles.itemIcon}
                      />
                      Enquete Ativa 1
                    </li>
                  </ul>
                </div>
                <div className={styles.section}>
                  <h4>Enquetes Finalizadas</h4>
                  <ul>
                    <li className={styles.listItem}>
                      <img
                        src="img/icons/enquete_finalizada.png"
                        alt="Ícone Finalizado"
                        className={styles.itemIcon}
                      />
                      Enquete Finalizada 1
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className={styles.mainContent}>
          <div className={styles.mainHeader}>
            <h1>Enquetes</h1>
            <div className={styles.controls}>
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleSearchChange} // Função de busca
              />
              <button>Filtro</button>
            </div>
          </div>

          {/* Listagem de enquetes filtrada */}
          <ul className={styles.enqueteList}>
            {filteredEnquetes.map((enquete) => (
              <li key={enquete._id} className={styles.card}>
                {enquete.imagem && (
                  <img
                    src={enquete.imagem}
                    alt={enquete.titulo}
                    className={styles.cardImage}
                  />
                )}
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{enquete.titulo}</h2>
                  <p className={styles.cardDescription}>{enquete.descricao}</p>

                  {jaVotou(enquete._id) ? (
                    // Mostra os resultados com animação
                    <div
                      className={`resultados ${
                        votos[enquete._id] ? "mostrar" : ""
                      }`}
                    >
                      <h4>Resultados:</h4>
                      {votos[enquete._id].map((opcao, index) => (
                        <p key={index}>
                          {opcao.texto}: {opcao.votos} votos
                        </p>
                      ))}
                    </div>
                  ) : (
                    // Mostra os botões de votação
                    <div className={styles.optionButtons}>
                      {enquete.opcoes.map((opcao, index) => (
                        <button
                          key={index}
                          onClick={() => handleVote(enquete._id, index)}
                          className={styles.optionButton}
                        >
                          {opcao.texto}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={styles.cardActions}>
                    <button
                      onClick={() => router.push(`/enquetes/${enquete._id}`)}
                      className={styles.verMaisButton}
                    >
                      Ver mais
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
