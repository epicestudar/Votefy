"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import styles from "../styles/enquetes.module.css";

export default function EnquetePage() {
  const [enquetes, setEnquetes] = useState([]);
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

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {/* Div do lado esquerdo - Perfil do Usuário */}
        <div className={styles.sidebar}>
          <div className={styles.profile}>
            <div className={styles.profileInfo}>
              <img
                src="/user-avatar.png"
                alt="Foto de Perfil"
                className={styles.avatar}
              />
              <div className={styles.info}>
                <h2>Nome do Usuário</h2>
                <p>usuario@email.com</p>
                <p>Cidade Exemplo</p>
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
                        src="/icon-active.png"
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
                        src="/icon-finished.png"
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

        {/* Conteúdo principal - Lado direito */}
        <div className={styles.mainContent}>
          <div className={styles.mainHeader}>
            <h1>Enquetes</h1>
            <div className={styles.controls}>
              <input type="text" placeholder="Pesquisar..." />
              <button>Filtro</button>
            </div>
          </div>

          {/* Listagem de enquetes estilizada */}
          <ul className={styles["enquete-list"]}>
            {enquetes.map((enquete) => (
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
    </div>
  );
}