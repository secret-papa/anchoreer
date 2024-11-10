# 앵커리어 프론트앤드 과제 - 채용 달력 만들기

[자소설닷컴 채용 달력](https://jasoseol.com/recruit)과 유사한 채용 달력을 구현하는 과제

## How To Run

```
Node: v20.15.0
```

```bash
$ npm install
$ npm run dev

# http://localhost:3000 접근
```

## 기술 스택

- Language: Typescript
- UI: React
- Style: SCSS
- Client State: Zustand
  - 서버에서 받아온 데이터를 조회가 용이한 형태로 가공하여 제공하기 위해 도입
    - 단건 조회 & 조건부 목록 조회와 같은 api 부재
- Server State: React Query
  - 비동기 상태 관리를 위해 도입

## 설계

```
component -> hooks -> query & store -> api
```

**UI**, **비즈니스 로직**, **데이터 관리**에 대한 책임을 분리하여 가독성을 높이고 유지 보수가 용이하도록 설계

### 역할

- component: UI
- hooks: (비즈니스) 로직
- utils: hook 형태가 아닌 로직
- query & store: 데이터 관리
- types: type 정의
- apis: 외부 서비스 api 호출
