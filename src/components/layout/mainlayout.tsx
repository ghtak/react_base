import { Outlet } from "@tanstack/react-router";
import styles from "./styles/mainlayout.module.scss"

export function MainLayout() {
  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <div className={styles.header}></div>

      {/* <Nav /> */}
      <div className={styles.content}>
        <div className={styles.nav}>

        </div>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
      <div className={styles.footer}></div>
    </div>
  );
}
