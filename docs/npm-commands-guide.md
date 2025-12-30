# NPM (Node Package Manager) 명령어 핵심 가이드

Node.js 프로젝트를 관리할 때 필수적으로 사용하는 NPM 명령어와 옵션들의 의미를 정리한 문서입니다.

---

## 1. 프로젝트 초기화 (Initialization)

새로운 프로젝트를 시작할 때 `package.json` 파일을 생성합니다.

- **`npm init`**: 프로젝트 이름, 버전, 설명 등을 묻는 인터랙티브 모드로 `package.json`을 생성합니다.
- **`npm init -y`**: 모든 질문에 'Yes(기본값)'로 대답하고 즉시 `package.json`을 생성합니다. (빠른 시작)

---

## 2. 패키지 설치 (Installation)

가장 많이 사용하는 명령어입니다.

### 기본 설치

- **`npm install`** (또는 `npm i`): `package.json`에 명시된 모든 의존성을 설치합니다. (`node_modules` 폴더 생성)
- **`npm install <패키지명>`**: 특정 패키지를 설치하고 `dependencies` 목록에 추가합니다. (배포 시 필요한 라이브러리: React, Axios 등)

### 개발 의존성 설치 (`-D`)

- **`npm install <패키지명> -D`**
- **`npm install <패키지명> --save-dev`** (위와 동일)
  - **의미**: 배포용 빌드에는 포함되지 않고, **개발할 때만 필요한 도구**를 설치할 때 사용합니다.
  - **예시**: TypeScript, ESLint, Prettier, Vite, Testing Library 등.

### 전역 설치 (`-g`)

- **`npm install -g <패키지명>`**: 현재 프로젝트가 아닌 시스템 전체에서 사용할 수 있도록 설치합니다. (예: `nodemon`, `pm2` 등 CLI 도구)
  - _최근에는 `npx`를 사용하여 전역 설치 없이 실행하는 것을 권장하는 추세입니다._

### CI 환경 설치 (`ci`)

- **`npm ci`**: `package-lock.json`에 기록된 정확한 버전 그대로 설치합니다. `node_modules`를 지우고 다시 설치하므로 CI/CD 파이프라인에서 빌드 일관성을 위해 사용합니다.

---

## 3. 스크립트 실행 (Scripts)

`package.json`의 `"scripts"` 항목에 정의된 명령어를 실행합니다.

- **`npm run <스크립트이름>`**: 커스텀 스크립트 실행 (예: `npm run dev`, `npm run build`).
- **`npm start`**: `npm run start`의 단축 명령어.
- **`npm test`**: `npm run test`의 단축 명령어.

---

## 4. 패키지 관리 및 기타

- **`npm uninstall <패키지명>`**: 패키지를 삭제하고 목록에서 제거합니다.
- **`npm update`**: 설치된 패키지들을 허용된 범위 내에서 최신 버전으로 업데이트합니다.
- **`npm list`**: 현재 설치된 패키지 트리 구조를 보여줍니다. (`npm list --depth=0`으로 1단계만 볼 수 있음)
- **`npm outdated`**: 업데이트가 필요한 패키지 목록을 확인합니다.

---

## 5. 주요 플래그(Flags) 정리

명령어 뒤에 붙는 옵션들의 의미입니다.

| 플래그 (단축) | 플래그 (전체)  | 의미                                                              |
| :------------ | :------------- | :---------------------------------------------------------------- |
| **`-D`**      | `--save-dev`   | **개발 의존성(devDependencies)**으로 설치합니다.                  |
| **`-g`**      | `--global`     | **전역(Global)** 시스템 경로에 설치합니다.                        |
| **`-y`**      | `--yes`        | 모든 질문에 **Yes**로 자동 응답합니다. (`init` 시 유용)           |
| **`-E`**      | `--save-exact` | 버전 앞에 `^`나 `~` 없이 **정확한 버전**으로 고정하여 설치합니다. |
| **`--force`** |                | 캐시 문제나 충돌이 있을 때 강제로 실행합니다. (주의 필요)         |

---

## 6. NPX (Node Package Execute)

NPM 5.2.0부터 기본 포함된 도구입니다.

- **`npx <패키지명>`**: 패키지를 로컬에 설치하지 않고 **임시로 다운로드하여 한 번 실행**합니다.
- **활용**: `create-react-app`이나 `vite` 처럼 프로젝트 생성 시 한 번만 쓰고 마는 도구를 실행할 때 유용합니다.
  ```bash
  # 로컬에 create-vite를 영구 설치하지 않고 바로 실행
  npx create-vite@latest my-app
  ```
