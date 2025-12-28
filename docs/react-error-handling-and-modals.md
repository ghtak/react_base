# React 에러 처리와 전역 모달 관리 가이드

이 문서는 리액트 애플리케이션의 안정성을 위한 **Error Boundary** 구현 방법과, 효율적인 UI 관리를 위한 **Global Modal** 패턴을 정리합니다.

---

## 1. Error Boundary (에러 바운더리)

### 개념
리액트 컴포넌트 트리 하위에서 발생하는 자바스크립트 에러를 포착하고, 깨진 컴포넌트 트리 대신 **대체 UI(Fallback UI)**를 보여주는 컴포넌트입니다.

> **주의**: 에러 바운더리는 다음 에러는 포착하지 못합니다.
> - 이벤트 핸들러 (`onClick` 등)
> - 비동기 코드 (`setTimeout`, `requestAnimationFrame` 등)
> - 서버 사이드 렌더링 (SSR)
> - 에러 바운더리 자체에서 발생한 에러

### 구현 방법 1: 클래스 컴포넌트 (기본)
생명주기 메서드인 `getDerivedStateFromError` 와 `componentDidCatch`를 사용해야 하므로 **반드시 클래스 컴포넌트**로 작성해야 합니다.

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태 업데이트
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 서비스(Sentry 등)에 에러 기록
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>무언가 잘못되었습니다.</h1>;
    }
    return this.props.children;
  }
}

// 사용
<ErrorBoundary fallback={<ErrorPage />}>
  <MyWidget />
</ErrorBoundary>
```

### 구현 방법 2: react-error-boundary 라이브러리 (권장)
함수형 컴포넌트에서도 훅(Hook) 기반으로 쉽게 사용할 수 있고, 에러 리셋(재시도) 기능이 강력하여 실무에서 많이 사용됩니다.

```javascript
import { ErrorBoundary } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>에러가 발생했습니다:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

<ErrorBoundary
  FallbackComponent={Fallback}
  onReset={() => {
    // 에러 발생 원인이 된 상태를 초기화 (예: 쿼리 재요청)
  }}
>
  <MyComponent />
</ErrorBoundary>
```

---

## 2. Global Modal (전역 모달) 관리

### 왜 전역으로 관리해야 할까?
1.  **Z-Index 지옥 탈출**: 모달이 깊은 컴포넌트 트리에 있으면 부모의 `overflow: hidden`이나 `z-index` 영향을 받아 잘리거나 뒤에 가려질 수 있습니다.
2.  **Props Drilling 방지**: 모달을 열기 위한 `isOpen`, `onClose` 함수를 여러 단계 거쳐 전달할 필요가 없습니다.
3.  **DOM 구조 깔끔함**: `React Portal`을 사용해 `body` 바로 아래에 렌더링하므로 시맨틱 구조가 유지됩니다.

### 구현 패턴: Context API 또는 상태 관리 라이브러리 (Zustand/Recoil)

#### 1. 모달 스토어 (Zustand 예시)
어디서든 모달을 열 수 있는 전역 상태를 만듭니다.

```javascript
import { create } from 'zustand';

const useModalStore = create((set) => ({
  modal: null, // 현재 열린 모달 컴포넌트나 데이터
  openModal: (component) => set({ modal: component }),
  closeModal: () => set({ modal: null }),
}));
```

#### 2. 전역 모달 렌더러 (GlobalModalRenderer)
앱의 최상위(`App.tsx` 또는 `Layout`)에 배치하여, 스토어에 모달이 있으면 렌더링합니다. 이때 **Portal**을 사용합니다.

```javascript
import { createPortal } from 'react-dom';

const GlobalModalRenderer = () => {
  const { modal, closeModal } = useModalStore();

  if (!modal) return null;

  return createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {modal}
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
};
```

#### 3. 사용 예시
어떤 컴포넌트에서든 훅을 불러와 모달을 띄울 수 있습니다.

```javascript
const MyComponent = () => {
  const { openModal } = useModalStore();

  const handleClick = () => {
    openModal(<LoginModal />); // 컴포넌트를 통째로 넘기거나, 타입만 넘겨서 렌더러가 결정하게 할 수 있음
  };

  return <button onClick={handleClick}>로그인</button>;
};
```

---

## 요약
1.  **Error Boundary**는 앱이 하얀 화면으로 죽는 것을 방지하는 안전벨트입니다. 주요 섹션(GNB, 사이드바, 메인 콘텐츠)마다 감싸주면 좋습니다.
2.  **Global Modal**은 `Portal`과 `전역 상태`를 결합하여, UI 계층 문제와 데이터 전달 문제를 동시에 해결하는 패턴입니다.
