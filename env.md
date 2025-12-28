# Vite 환경 변수 설정 가이드

## 1. 동작 원리 (ImportMeta)
Vite는 `import.meta.env` 객체를 통해 환경 변수를 제공합니다.
- **`import.meta`**: ES 모듈의 메타데이터를 담는 표준 객체입니다.
- **`import.meta.env`**: Vite가 환경 변수를 주입하는 속성입니다. 빌드 시점에 실제 문자열 값으로 치환됩니다.

## 2. 기본 설정 (.env)
프로젝트 루트에 `.env` 파일을 생성하여 변수를 정의합니다.
> **주의**: 클라이언트(브라우저) 측에서 접근하려면 변수명은 반드시 **`VITE_`** 접두사로 시작해야 합니다.

```dotenv
VITE_API_URL=https://api.example.com
VITE_API_KEY=your-secret-key-12345
```

## 3. 스테이지별 설정 (Mode)
Vite는 실행 모드(Mode)에 따라 우선순위에 맞춰 `.env` 파일을 로드합니다.

| 파일명 | 설명 | 실행 명령어 |
|---|---|---|
| `.env` | 모든 모드에서 공통으로 로드 (가장 낮은 우선순위) | (공통) |
| `.env.development` | 개발 환경 전용 | `npm run dev` |
| `.env.production` | 배포(빌드) 환경 전용 | `npm run build` |
| `.env.local` | 로컬 전용 오버라이드 (Git에 커밋하지 않음) | (모든 모드 최우선) |

### 예시
- **개발 (`.env.development`)**: `VITE_API_URL=https://dev-api.example.com`
- **배포 (`.env.production`)**: `VITE_API_URL=https://api.example.com`

## 4. 코드에서 사용하기
`import.meta.env.변수명`으로 접근합니다.

```typescript
// src/features/main/pages/mainpage.tsx
useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
}, []);
```

## 5. TypeScript 타입 지원 (`vite-env.d.ts`)
`src/vite-env.d.ts`에 타입을 정의하면 IDE에서 자동 완성을 지원받을 수 있습니다.

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```