# @lukemorales/query-key-factory 사용 가이드

`@lukemorales/query-key-factory`는 TanStack Query의 Query Key를 타입 안전하게 관리하고, 자동 완성을 지원하며, 체계적으로 구조화할 수 있도록 도와주는 라이브러리입니다.

## 1. 설치

```bash
npm install @lukemorales/query-key-factory
```

## 2. 키 정의하기 (Defining Keys)

`createQueryKeys`를 사용하여 도메인(Feature)별로 키를 정의합니다.

```javascript
// queries/todos.js
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const todos = createQueryKeys('todos', {
  // 1. 단순한 키: ['todos', 'all']
  all: null,

  // 2. 파라미터가 있는 키: ['todos', 'list', { filters }]
  list: (filters) => ({
    queryKey: [{ filters }],
  }),

  // 3. ID가 포함된 키: ['todos', 'detail', todoId]
  detail: (todoId) => ({
    queryKey: [todoId],
  }),
});
```

## 3. 실전 사용 예시

### 데이터 조회 (useQuery)
`...` (spread operator)를 사용하여 키 설정 객체를 그대로 전달합니다.

```javascript
import { useQuery } from '@tanstack/react-query';
import { todos } from './queries/todos';
import { todoApi } from './api/todos';

function TodoList({ status }) {
  const { data } = useQuery({
    // queryKey: ['todos', 'list', { filters: { status } }] 와 동일하게 동작
    ...todos.list({ status }),
    queryFn: () => todoApi.getTodos({ status }),
  });

  return <div>{/* ... */}</div>;
}
```

### 데이터 무효화 (Invalidation)
`queryClient` 메서드에서도 생성된 키 객체를 활용할 수 있습니다.

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todos } from './queries/todos';

// 'todos' 도메인의 모든 쿼리 무효화 (['todos'])
queryClient.invalidateQueries({ queryKey: todos._def });

// 특정 키 패턴만 무효화 (['todos', 'list'])
queryClient.invalidateQueries({ queryKey: todos.list._def });
```
