"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/enquetes.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SuasEnquetesPage() {
  const [enquetes, setEnquetes] = useState([]);
  const [userInfo, setUserInfo] = useState({
    nome: "",
    email: "",
    cidade: "",
    fotoDePerfil: "",
  });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEnquetes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/enquetes/usuario", {
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
        setUserInfo(data);
      }
    };

    fetchEnquetes();
    fetchUserInfo();
  }, [router]);

  const deleteEnquete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`/api/enquetes/usuario?id=${id}`, {
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
    setSearchTerm(e.target.value);
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
                src={userInfo.fotoDePerfil || "/img/user/user.png"}
                alt="Foto de Perfil"
                className={styles.avatar}
              />
              <div className={styles.info}>
                <h2>{userInfo.nome}</h2>
                <p>{userInfo.email}</p>
                <p>{userInfo.cidade}</p>
                <button
                  onClick={handleEditProfile}
                  className="btn btn-warning me-2 editButton"
                >
                  Editar Perfil
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-danger deleteButton"
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
            <h1>Suas Enquetes</h1>
            <div className={styles.controls}>
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button>Filtro</button>
              
            </div>
          </div>

          {/* Listagem de enquetes filtrada */}
          <ul className={styles["enquete-list"]}>
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
                  <p>
                    <strong>Categoria:</strong> {enquete.categoria}
                  </p>
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
                  <div className={styles.cardActions}>
                    <button
                      onClick={() => handleEdit(enquete._id)}
                      className={styles.cardButton}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteEnquete(enquete._id)}
                      className={styles.deleteButton}
                    >
                      Excluir
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