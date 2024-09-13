// app/layout.js ou app/RootLayout.js

import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous" // Corrigido para crossOrigin
          referrerPolicy="no-referrer" // Corrigido para referrerPolicy
        />
        {/* Outras tags <head> aqui */}
      </head>
      <body>{children}</body>
    </html>
  );
}
