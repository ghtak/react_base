# 리액트 개발자를 위한 브라우저 객체(Browser Objects) 핵심 정리

리액트(React)는 가상 DOM(Virtual DOM)을 통해 브라우저를 추상화하지만, 실제 기능을 구현할 때는 여전히 브라우저 내장 객체(Browser Object Model)에 접근해야 할 때가 많습니다.

이 문서는 리액트 개발 시 자주 사용되는 주요 브라우저 객체와 활용 패턴을 정리합니다.

---

## 1. Window 객체 (The Global Object)

브라우저 창 전체를 대변하는 최상위 객체입니다. 전역 스코프의 변수나 함수는 `window`의 프로퍼티가 됩니다.

### 주요 속성 및 메서드

- **`window.innerWidth` / `window.innerHeight`**: 뷰포트의 크기. 반응형 컴포넌트나 캔버스(Canvas) 크기 조절 시 사용합니다.
- **`window.scrollY`**: 현재 스크롤 위치. 스크롤에 따라 변하는 헤더나 'Top 버튼' 구현 시 사용합니다.
- **`window.open()`**: 새 탭이나 새 창 열기.
- **`window.localStorage` / `window.sessionStorage`**: 클라이언트 측 저장소.

### React 활용 팁

- **이벤트 리스너**: `resize`나 `scroll` 이벤트는 `window`에 직접 등록해야 합니다. 반드시 `useEffect` 내에서 등록하고, cleanup 함수에서 제거해야 메모리 누수를 방지할 수 있습니다.
  ```javascript
  useEffect(() => {
    const handleResize = () => console.log(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  ```
- **SSR 주의**: Next.js 같은 서버 사이드 렌더링 환경에서는 `window` 객체가 없습니다. `typeof window !== 'undefined'` 체크가 필요합니다.

---

## 2. Document 객체 (DOM Entry Point)

웹 페이지의 콘텐츠(DOM)에 접근하는 진입점입니다.

### 주요 속성 및 메서드

- **`document.title`**: 브라우저 탭의 제목. (`useEffect`에서 변경하거나 `react-helmet` 라이브러리 사용 권장)
- **`document.getElementById()`**: 특정 요소 선택. 리액트 앱이 마운트되는 `root` 요소를 찾을 때 주로 쓰입니다.
- **`document.cookie`**: 쿠키 읽기/쓰기.

### React 활용 팁

- **Portals**: 모달(Modal)이나 툴팁처럼 부모 컴포넌트의 스타일(z-index, overflow) 제약을 벗어나야 할 때, `document.body` 등에 직접 렌더링하기 위해 사용합니다.

  ```javascript
  import { createPortal } from 'react-dom';

  const Modal = ({ children }) => {
    return createPortal(children, document.body);
  };
  ```

---

## 3. Location 객체 (URL Info)

현재 페이지의 URL 정보를 담고 있는 객체입니다 (`window.location`).

### 주요 속성

- **`location.href`**: 전체 URL 문자열. 값을 할당하면 페이지가 이동됩니다.
- **`location.pathname`**: 도메인 뒷부분의 경로 (예: `/dashboard`).
- **`location.search`**: 쿼리 스트링 (예: `?id=123`). `URLSearchParams`와 함께 파싱하여 사용합니다.
- **`location.reload()`**: 페이지 새로고침. (SPA 상태가 초기화되므로 주의)

### React 활용 팁

- 리액트 라우터(`react-router-dom` 등)를 사용하는 경우, 직접 `location` 객체를 쓰기보다 **`useLocation` 훅**을 사용하는 것이 리액트의 라이프사이클과 잘 맞습니다.

---

## 4. History 객체 (Session History)

브라우저의 세션 기록(뒤로 가기, 앞으로 가기 등)을 조작합니다 (`window.history`).

### 주요 메서드

- **`history.pushState(state, title, url)`**: 페이지를 새로고침하지 않고 URL을 변경하고 히스토리에 추가합니다. (SPA 라우팅의 핵심 원리)
- **`history.replaceState()`**: 현재 히스토리를 교체합니다. (뒤로 가기 방지 등에 사용)
- **`history.back()` / `history.forward()`**: 뒤로/앞으로 가기.

### React 활용 팁

- 직접 조작하기보다 라우터 라이브러리의 **`useNavigate`** (React Router v6) 등을 사용하는 것이 권장됩니다.

---

## 5. Navigator 객체 (Browser Info)

브라우저와 운영체제에 대한 정보를 제공합니다.

### 주요 속성

- **`navigator.userAgent`**: 브라우저 및 기기 식별 정보.
- **`navigator.clipboard`**: 클립보드 API. 텍스트 복사 기능 구현 시 사용합니다.
  ```javascript
  navigator.clipboard.writeText('복사할 텍스트');
  ```
- **`navigator.geolocation`**: 사용자의 위치(위도, 경도) 정보.
- **`navigator.language`**: 브라우저의 언어 설정. 다국어(i18n) 초기 설정에 유용합니다.

---

## 6. Event 객체 (SyntheticEvent)

리액트의 이벤트 핸들러(`onClick`, `onChange` 등)에서 전달받는 `e` 객체입니다.

### 특징

- **SyntheticEvent (합성 이벤트)**: 리액트는 브라우저마다 다른 네이티브 이벤트 객체를 감싸서(Wrapper), 모든 브라우저에서 동일하게 동작하도록 통일된 인터페이스를 제공합니다.
- **`e.nativeEvent`**: 만약 브라우저 고유의 실제 이벤트 객체가 필요하다면 이 속성으로 접근할 수 있습니다.
- **`e.preventDefault()`**: 기본 동작 방지 (예: 폼 제출 시 새로고침 막기).
- **`e.stopPropagation()`**: 이벤트 버블링 중단.

---

## 요약

1. **DOM 조작**은 리액트(`ref`)에게 맡기되, **전역적인 기능**(창 크기, 스크롤, URL)은 브라우저 객체를 사용합니다.
2. 브라우저 객체 사용 시 **Side Effect**로 간주하여 **`useEffect`** 내부에서 처리하는 것이 안전합니다.
3. 라우팅 관련 기능은 `window.location/history`보다 **리액트 라우터의 훅**을 우선 사용합니다.
