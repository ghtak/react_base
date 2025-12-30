import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.scss';

interface FormData {
  userId: string;
  password: string;
}

export function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('로그인 시도:', data.userId, data.password);
  };

  useEffect(() => {
    console.log('Load');
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
        <h1>로그인</h1>
        <p>서비스 이용을 위해 로그인해주세요.</p>
        <div className={styles.inputGroup}>
          <label>아이디</label>
          <input
            type="text"
            {...register('userId')}
            placeholder="아이디"
          ></input>
        </div>
        <div className={styles.inputGroup}>
          <label>비밀번호</label>
          <input
            type="password"
            {...register('password')}
            placeholder="비밀번호"
          ></input>
        </div>
        <hr />
        <div>
          <button type="submit" className={styles.button}>
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
