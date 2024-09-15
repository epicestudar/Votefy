"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Importando Bootstrap CSS
import { useEffect } from "react"; // Para inicializar o Bootstrap JS

export default function Home() {
  // Para garantir que o JavaScript do Bootstrap seja carregado corretamente
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <div>
      <Header />
      <main className={`container ${styles.main}`}>
        {/* Carrossel */}
        <div
          id="carouselExampleCaptions"
          className="carousel slide mb-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/img/carrossel/carro1.jpg"
                className={`d-block w-100 ${styles.carouselImg}`}
                alt="Imagem 1"
              />
             
            </div>
            <div className="carousel-item">
              <img
                src="/img/carrossel/carro2.png"
                className={`d-block w-100 ${styles.carouselImg}`}
                alt="Imagem 2"
              />
             
            </div>
            <div className="carousel-item">
              <img
                src="/img/carrossel/carro3.png"
                className={`d-block w-100 ${styles.carouselImg}`}
                alt="Imagem 3"
              />
             
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

       
      </main>
      <Footer />
    </div>
  );
}
