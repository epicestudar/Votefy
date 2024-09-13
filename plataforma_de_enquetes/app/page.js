// app/page.js

import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Importando Bootstrap CSS

export default function Home() {
  return (
    <div>
      <Header />
      <main className={`container ${styles.main}`}>
        {/* Carrossel */}
        <div id="carouselExampleCaptions" className="carousel slide mb-4">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/img/carrossel/carro1.jpg"
                className={`d-block ${styles.carouselImg}`}
                alt="Imagem 1"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Explore as Enquetes</h5>
                <p>Participe de enquetes sobre temas que você ama.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/img/carrossel/carro2.png"
                className={`d-block ${styles.carouselImg}`}
                alt="Imagem 2"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Compartilhe suas Opiniões</h5>
                <p>Crie enquetes e compartilhe com seus amigos.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/img/carrossel/carro3.png"
                className={`d-block ${styles.carouselImg}`}
                alt="Imagem 3"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Descubra Novas Tendências</h5>
                <p>Veja o que está em alta e participe das discussões.</p>
              </div>
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

        <h1 className="text-center mb-4">
          Bem-vindo à Plataforma Interativa de Enquetes!
        </h1>

        <p className="text-center mb-4">
          Nosso site permite que você crie, compartilhe e vote em enquetes sobre
          diversos temas, como tecnologia, esportes, entretenimento e muito
          mais. Conecte-se com outros usuários e descubra as tendências nas
          categorias que você mais gosta.
        </p>

        <p className="text-center mb-4">
          Com uma interface simples e amigável, você pode acompanhar o resultado
          das enquetes em tempo real e se divertir participando de votações em
          assuntos de seu interesse. Crie sua conta e faça parte da nossa
          comunidade!
        </p>

        {/* Cards Informativos */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/img/card1.jpg" className="card-img-top" alt="Card 1" />
              <div className="card-body">
                <h5 className="card-title">Crie Suas Enquetes</h5>
                <p className="card-text">
                  Crie enquetes personalizadas sobre qualquer assunto e
                  compartilhe com sua rede.
                </p>
                <a href="/criar-enquete" className="btn btn-primary">
                  Criar Enquete
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/img/card2.jpg" className="card-img-top" alt="Card 2" />
              <div className="card-body">
                <h5 className="card-title">Vote e Participe</h5>
                <p className="card-text">
                  Participe das enquetes criadas por outros usuários e veja os
                  resultados em tempo real.
                </p>
                <a href="/enquetes" className="btn btn-primary">
                  Ver Enquetes
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/img/card3.jpg" className="card-img-top" alt="Card 3" />
              <div className="card-body">
                <h5 className="card-title">Conecte-se com a Comunidade</h5>
                <p className="card-text">
                  Descubra novas tendências e conecte-se com outros entusiastas
                  através das nossas enquetes.
                </p>
                <a href="/comunidade" className="btn btn-primary">
                  Explorar Comunidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
