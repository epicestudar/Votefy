"use client"; // Adiciona a diretiva "use client" para indicar que este é um componente de cliente

import React from "react";
import styles from "./footer.module.css"; // Importando os estilos do footer

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div id="footer_content" className={styles.footerContent}>
        <div id="footer_contacts" className={styles.footerContacts}>
          <h2>Votefy</h2>
          <p>Onde sua opinião faz a diferença!</p>

          <div className={styles.footerSocialMedia}>
            <a
              href="https://www.instagram.com"
              className={`${styles.footerLink} ${styles.instagram}`}
              title="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              className={`${styles.footerLink} ${styles.twitter}`}
              title="Twitter"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://facebook.com"
              className={`${styles.footerLink} ${styles.facebook}`}
              title="Facebook"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>

        <ul className={styles.footerList}>
          <li>
            <h3>Fale Conosco</h3>
          </li>

          <li>
            <a href="https://www.techtudo.com.br" className={styles.footerLink}>
              SAC
            </a>
          </li>

          <li>
            <a href="#" className={styles.footerLink}>
              Suporte
            </a>
          </li>

          <li>
            <a href="#" className={styles.footerLink}>
              Contato
            </a>
          </li>
        </ul>

        <ul className={styles.footerList}>
          <li>
            <h3>Dispositivos</h3>
          </li>

          <li>
            <a href="#" className={styles.footerLink}>
              App
            </a>
          </li>

          <li>
            <a href="#" className={styles.footerLink}>
              Desktop
            </a>
          </li>

          <li>
            <a href="#" className={styles.footerLink}>
              Cloud
            </a>
          </li>
        </ul>

        <div id="footer_subscribe" className={styles.footerSubscribe}>
          <h3>Inscreva-se</h3>
          <p>Coloque o seu e-mail para ser notificado sobre nossas novidades</p>

          <div id="input_group" className={styles.inputGroup}>
            <input type="email" id="email" />
            <button>
              <i className="fa-regular fa-envelope"></i>
            </button>
          </div>
        </div>
      </div>

      <div id="footer_copyright" className={styles.footerCopyright}>
        Votefy &#169; 2024 all rights reserved
      </div>
    </footer>
  );
};

export default Footer;
