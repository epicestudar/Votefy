import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="/enquetes">Enquetes</Link>
          </li>
          <li>
            <Link href="/sobre">Sobre</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
