# CSS 핵심 속성 요약 (파레토 법칙)

실무에서 UI 개발 시 약 10~15개의 속성이 전체 코드의 90% 이상을 차지합니다.

## 1. 레이아웃 (Layout)
요소의 위치와 배치를 결정합니다.

- **`display`**: `flex` (가장 중요), `grid`, `block`, `none`
- **`position`**: `relative`, `absolute`, `fixed`

## 2. 박스 모델 (Box Model)
요소의 크기와 간격을 조절합니다.

- **`width` / `height`**: 너비와 높이
- **`margin`**: 바깥쪽 여백
- **`padding`**: 안쪽 여백
- **`box-sizing`**: `border-box` (테두리 포함 크기 계산)

## 3. 타이포그래피 (Typography)
텍스트 스타일을 지정합니다.

- **`font-size`**, **`font-weight`**, **`color`**
- **`text-align`**, **`line-height`**

## 4. 시각적 장식 (Visual Decoration)
- **`background-color`**
- **`border`**, **`border-radius`** (둥근 모서리)
- **`cursor`** (마우스 커서)

## 5. 핵심 예시 코드
```css
.card {
  display: flex;            /* 레이아웃 */
  flex-direction: column;
  padding: 20px;            /* 박스 모델 */
  margin: 10px;
  border-radius: 8px;       /* 장식 */
  background-color: #fff;
}
```

> **Tip**: `display: flex`, `margin/padding`, `width/height`만 확실히 익혀도 대부분의 레이아웃 구현이 가능합니다.


```
/* 1. 기본 설정 (박스 모델 계산 방식 통일) */
* {
  box-sizing: border-box;
}

/* 카드 컨테이너 */
.card {
  /* [레이아웃] Flexbox를 사용하여 내부 요소 정렬 */
  display: flex;
  flex-direction: column; /* 세로 방향 배치 */

  /* [박스 모델] 크기와 여백 */
  width: 300px;
  padding: 20px;       /* 안쪽 여백 */
  margin: 10px;        /* 바깥쪽 여백 */

  /* [시각적 장식] */
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;  /* 둥근 모서리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
}

/* 카드 제목 */
.card-title {
  /* [타이포그래피] */
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;

  /* [박스 모델] 제목과 내용 사이 간격 */
  margin-bottom: 10px;
}

/* 카드 내용 */
.card-content {
  font-size: 1rem;
  color: #666666;
  line-height: 1.5; /* 줄 간격을 넉넉하게 */
}

/* 버튼 */
.card-button {
  /* [레이아웃] 버튼 자체의 배치 */
  display: inline-block;
  margin-top: 20px;

  /* [박스 모델] 버튼 크기 */
  padding: 10px 20px;

  /* [시각적 장식] */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;

  /* [상호작용] 마우스 커서 변경 */
  cursor: pointer;
  text-align: center;
}

/* 마우스를 올렸을 때 (가상 클래스) */
.card-button:hover {
  background-color: #0056b3;
}

```