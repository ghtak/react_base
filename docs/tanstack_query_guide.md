# TanStack Query 완벽 가이드

TanStack Query(구 React Query)는 리액트 애플리케이션에서 **서버 상태(Server State)**를 불러오고, 캐싱하고, 동기화하고, 업데이트하는 작업을 쉽게 만들어주는 라이브러리입니다.

## 1. 설치 및 설정 (Installation & Setup)

### 패키지 설치
TanStack Query와 HTTP 클라이언트인 Axios를 함께 설치합니다.
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools axios
```

### Provider 설정
앱의 최상위 컴포넌트(`App.jsx` 등)에서 `QueryClientProvider`를 설정합니다.

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분간 데이터가 fresh하다고 간주 (불필요한 재요청 방지)
      retry: 1, // 실패 시 1회 재시도
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourComponent />
      {/* 개발 모드에서만 보이는 디버깅 도구 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## 2. 기본 사용법 (Basic Usage)

### 데이터 조회 (`useQuery`)
```jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function TodoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get('/api/todos');
      return response.data;
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <ul>
      {data.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
}
```

## 3. 고급 사용법: Axios 모듈화 및 API 계층 분리

실무에서는 컴포넌트 내부에 `axios` 호출을 직접 작성하지 않고, 별도의 API 모듈로 분리하여 관리합니다.

### 1) Axios 인스턴스 생성 (`api/client.js`)
```javascript
import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://api.example.com',
  headers: { 'Content-Type': 'application/json' },
});

// 인터셉터 설정 (예: 토큰 자동 주입)
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 2) API 함수 정의 (`api/todos.js`)
```javascript
import { client } from './client';

export const todoApi = {
  getTodos: async (params) => {
    const { data } = await client.get('/todos', { params });
    return data;
  },
  createTodo: async (todo) => {
    const { data } = await client.post('/todos', todo);
    return data;
  },
};
```

## 4. 고급 패턴: Query Key Factory를 이용한 키 관리

Query Key가 문자열과 배열로 여기저기 흩어져 있으면 유지보수가 어렵습니다. **Query Key Factory** 패턴을 사용하여 키를 한곳에서 중앙 집중적으로 관리합니다.

### Query Key Factory 정의 (`queries/keys.js`)
```javascript
export const todoKeys = {
  all: ['todos'],
  lists: () => [...todoKeys.all, 'list'],
  list: (filters) => [...todoKeys.lists(), { filters }],
  details: () => [...todoKeys.all, 'detail'],
  detail: (id) => [...todoKeys.details(), id],
};
```

### 실전 적용 예시
```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoKeys } from './queries/keys';
import { todoApi } from './api/todos';

function TodoApp({ filter }) {
  const queryClient = useQueryClient();

  // 1. 조회: Factory에서 키를 가져와 사용 (오타 방지)
  const { data } = useQuery({
    queryKey: todoKeys.list(filter),
    queryFn: () => todoApi.getTodos(filter),
  });

  // 2. 수정: 성공 시 관련된 모든 키 무효화
  const mutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      // 'todos'로 시작하는 모든 쿼리(목록, 상세 등)를 한 번에 갱신
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });

  return <div>{/* UI 렌더링 */}</div>;
}
```