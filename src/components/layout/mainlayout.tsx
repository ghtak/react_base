import { Outlet } from "@tanstack/react-router";
import styles from "./styles/mainlayout.module.scss"
import { Nav } from "../ui/nav";
import Header from "../ui/header";

export function MainLayout() {
  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <Header />

      {/* <Nav /> */}
      <div className={styles.content}>
        <aside className={styles.nav}>
          <Nav />
        </aside>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
      <div className={styles.footer}></div>
    </div>
  );
}
