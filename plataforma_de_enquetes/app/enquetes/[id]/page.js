"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import styles from "../../styles/infoEnquete.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DetalhesEnquete({ params }) {
  const [enquete, setEnquete] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função para buscar os detalhes da enquete e do usuário
  useEffect(() => {
    const fetchEnquete = async () => {
      const { id } = params;
      try {
        const response = await fetch(`/api/enquetes/${id}`);

        if (response.ok) {
          const data = await response.json();
          setEnquete(data.enquete);
          setUsuario(data.usuario);
        } else {
          alert("Enquete não encontrada");
          router.push("/enquetes");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da enquete:", error);
        alert("Erro ao buscar detalhes da enquete");
        router.push("/enquetes");
      } finally {
        setLoading(false);
      }
    };

    fetchEnquete();
  }, [params, router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!enquete || !usuario) {
    return <p>Enquete não encontrada.</p>;
  }

   return (
     <div>
       <Header />
       <hr></hr>
       <div className={styles.container}>
         {/* Título da enquete centralizado */}
         <h1 className={styles.title}>{enquete.titulo}</h1>

         {/* Corpo principal da enquete */}
         <div className={styles.mainContent}>
           {/* Imagem à esquerda */}
           <div className={styles.imageContainer}>
             <img
               src={enquete.imagem || "/img/enquete_placeholder.png"}
               alt={enquete.titulo}
               className={styles.enqueteImage}
             />
           </div>

           {/* Informações da enquete à direita */}
           <div className={styles.infoContainer}>
             <p>
               <strong>Descrição:</strong> {enquete.descricao}
             </p>
             <p>
               <strong>Categoria:</strong> {enquete.categoria}
             </p>
             <p>
               <strong>Data de Criação:</strong>{" "}
               {new Date(enquete.dataDeCriacao).toLocaleDateString()}
             </p>
             <p>
               <strong>Opções de Voto:</strong>
             </p>
             <ul className={styles["option-list"]}>
               {enquete.opcoes.map((opcao, index) => (
                 <li key={index} className={styles["option-item"]}>
                   {opcao.texto} - {opcao.votos} votos
                 </li>
               ))}
             </ul>
           </div>
         </div>

         {/* Container com as informações do criador na parte inferior */}
         <div className={styles.userDetails}>
           <h2>Criador da Enquete</h2>
           <img
             src={usuario.fotoDePerfil || "/img/user/user.png"}
             alt={usuario.nome}
             className={styles.userAvatar}
           />
           <p>
             <strong>Nome:</strong> {usuario.nome}
           </p>
           <p>
             <strong>Email:</strong> {usuario.email}
           </p>
           <p>
             <strong>Cidade:</strong> {usuario.cidade}
           </p>
         </div>
       </div>
       <Footer />
     </div>
   );
}
