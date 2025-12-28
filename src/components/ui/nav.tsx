import { useState } from "react";
import styles from "./styles/nav.module.scss";
import { Link } from "@tanstack/react-router";

export function Nav() {
  const [links] = useState([
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
  ]);

  const menus = links.map((link) => (
    <li>
      <Link to={link.path}>{link.name}</Link>
    </li>
  ));

  return (
    <nav className={styles.nav}>
      <ul>{menus}</ul>
    </nav>
  );
}
