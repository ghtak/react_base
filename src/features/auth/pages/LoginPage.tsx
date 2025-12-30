import styles from './LoginPage.module.scss';

export function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>로그인</h1>
        <p>서비스 이용을 위해 로그인해주세요.</p>
        {/* 추후 LoginForm 컴포넌트 추가 */}
        <div className={styles.inputGroup}>
          <label>아이디</label>
          <input type="text"></input>
        </div>
        <div className={styles.inputGroup}>
          <label>비밀번호</label>
          <input type="password"></input>
        </div>
        <hr />
        <div>
          <button className={styles.button}>로그인</button>
        </div>
      </div>
    </div>
  );
}
