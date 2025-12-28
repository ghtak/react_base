import { useEffect } from "react";
import { useMainStore } from "../store";

export function MainPage() {
  const { count, increase, reset } = useMainStore();

  useEffect(() => {
    console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    console.log("123");
  }, []);
  return (
    <div>
      <p style={{ display: "block" }}>Main Page 화면입니다. Count: {count}</p>
      <button
        style={{ display: "block", width: "4rem", marginBottom: "1rem" }}
        onClick={increase}
      >
        증가
      </button>
      <button style={{ display: "block", width: "4rem" }} onClick={reset}>
        초기화
      </button>
    </div>
  );
}
