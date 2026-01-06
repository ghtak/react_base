# Product Requirements Document (PRD): Sample Page

## 1. 개요 (Overview)
본 문서는 'Sample' 데이터를 관리(CRUD)하기 위한 페이지의 요구사항을 정의합니다.
이 문서는 AI 에이전트 및 개발자가 명확한 가이드를 통해 개발할 수 있도록 구체적인 UI/UX 및 기술 명세를 포함합니다.

## 2. 목표 (Goals)
1.  **표준화 (Standardization)**: `src/features` 폴더 구조를 따르는 모범적인 Feature 예시를 구축한다.
2.  **기능성 (Functionality)**: 완전한 CRUD (Create, Read, Update, Delete) 기능을 구현한다.
3.  **UI/UX**: 기존 디자인 시스템(CSS Modules/SCSS)을 준수하며, 직관적인 사용성을 제공한다.
4.  **AI 친화적 명세**: 개발에 필요한 데이터 구조, 상태 관리, 컴포넌트 계층을 명확히 한다.

## 3. 기술 스택 및 제약사항 (Tech Stack & Constraints)
-   **Framework**: React
-   **Language**: TypeScript
-   **Styling**: SCSS Modules (`.module.scss`)
-   **State Management**: Zustand (Global) or React Context/Local State (Feature specific)
-   **Routing**: `@tanstack/react-router`
-   **Validation**: `react-hook-form` (권장)
-   **UI Library**: 외부 라이브러리 없음. (Native HTML/CSS 또는 `src/components/ui` 내 공통 컴포넌트 개발 필요)

## 4. UI/UX 상세 (Layout & UI)

### 4.1 페이지 레이아웃
페이지는 상단(검색), 중단(액션), 하단(목록)의 수직 구조로 배치됩니다.

**A. 검색 영역 (Search Area)**
-   좌측에서 우측으로 인풋 배치.
-   **필드**:
    1.  **샘플 이름**: 텍스트 입력 (`Placeholder`: "이름 검색")
    2.  **기간 검색**: 시작일(`Start Date`) ~ 종료일(`End Date`)
        -   HTML5 `input type="date"` 사용.
        -   기본값: 오늘 날짜 기준 1주일 전 ~ 오늘.
-   **버튼**: [검색] 버튼 (우측 정렬 또는 인풋 옆).

**B. 유틸리티/액션 영역 (Utility Area)**
-   목록 우측 상단 또는 목록 바로 위에 위치.
-   **버튼 그룹**:
    -   `[추가]`: 신규 등록 모달 오픈.
    -   `[삭제]`: 선택된 아이템(Checkbox) 일괄 삭제. (Confirm 창 필요)
    -   `[수정]`: 선택된 아이템(단일) 수정 모달 오픈. (2개 이상 선택 시 비활성화 또는 알림)
    -   `[복사]`: 선택된 아이템(단일/다중)의 데이터를 메모리에 복사.
    -   `[붙여넣기]`: 복사된 데이터를 새로운 ID로 생성하여 목록 최하단에 추가 및 저장.
    -   `[저장]`: *참고: 본 기능은 일반적으로 '추가/수정' 모달 내 [저장]으로 대체되나, 별도 요구사항인 경우 '일괄 수정 저장' 기능을 의미할 수 있음. (우선순위 낮음, 모달 저장으로 갈음 제안)*

**C. 목록 및 페이징 영역 (List & Pagination)**
-   **테이블 (Table)**:
    -   컬럼: `Checkbox`(선택), `ID`, `이름(Name)`, `시작일`, `종료일`, `생성일`, `수정일`
    -   인터랙션:
        -   행 클릭 시: 해당 행 체크박스 토글.
        -   짝수/홀수 행 배경색 구분 (Zebra striping).
        -   Hover 효과 적용.
-   **페이징 (Pagination)**:
    -   페이지 당 10개 표시.
    -   네비게이션: `[이전] [1] [2] ... [다음]`

---

## 5. 기능 명세 (Functional Requirements)

### 5.1 데이터 모델 (Data Model)
```typescript
interface SampleData {
  id: number;          // Unique ID
  name: string;        // 이름
  start_date: string;  // 'YYYY-MM-DD HH:mm:ss' or ISO string
  end_date: string;    // 'YYYY-MM-DD HH:mm:ss' or ISO string
  created_at: string;
  updated_at: string;
}
```

### 5.2 상세 기능 로직

#### 1. 검색 (Read)
-   Mock Data 99개를 초기 로딩 시 생성.
-   검색 버튼 클릭 시 필터링 수행:
    -   `name`: 부분 일치 (Contains).
    -   `date`: `start_date` >= 검색시작일 AND `end_date` <= 검색종료일.
-   필터링된 결과에 대해 페이징 처리 갱신.

#### 2. 추가 (Create)
-   [추가] 버튼 클릭 -> **모달(Modal)** 팝업.
-   입력 폼: 이름, 시작일, 종료일.
-   유효성 검사:
    -   이름: 필수, 20자 이내.
    -   날짜: 시작일 <= 종료일.
-   [저장] 클릭 -> 목록 최상단(또는 정렬 기준에 따름)에 추가 -> 모달 닫기.

#### 3. 수정 (Update)
-   목록에서 1개 선택 후 [수정] 클릭 -> **모달(Modal)** 팝업 (기존 데이터 바인딩).
-   수정 후 [저장] -> 리스트 업데이트.

#### 4. 삭제 (Delete)
-   1개 이상 선택 후 [삭제] 클릭 -> "삭제하시겠습니까?" (Confirm) -> 확인 시 목록에서 제거.

#### 5. 복사/붙여넣기
-   [복사]: 선택된 데이터 객체를 내부 변수(State)에 저장. "복사되었습니다" Toast/Alert.
-   [붙여넣기]: 저장된 객체를 기반으로 `id` (Auto Increment), `created_at` (현재시간) 만 변경하여 새 데이터 생성 -> 목록 추가.

## 6. 라우팅 (Routing)
-   Path: `/samples` (또는 `/features/sample` - 프로젝트 컨벤션 따름)
-   사이드바/네비게이션에 메뉴 추가 필요.

## 7. Mock Data Strategy
-   `fakerjs` 또는 간단한 유틸 함수를 사용하여 99개의 더미 데이터를 컴포넌트 마운트 시(또는 Store 초기화 시) 생성.
-   API 연동 전까지 클라이언트 메모리(`Zustand` Store 등)에서 관리.