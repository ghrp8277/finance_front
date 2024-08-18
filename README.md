# 종목 토론 프로젝트 📈

종목 토론 프로젝트는 사용자에게 차트로 시각화된 주식 정보를 제공하며, 
게시물/댓글 작성, 유저 팔로우 등의 소셜 활동과 함께 주식 목록 조회 및 검색을 할 수 있는 서비스를 제공합니다. 
또한, 사용자 관리와 이메일 인증 기능을 통해 계정 보안과 편리성을 제공합니다.
🔗 [서비스 링크](http://server.leejehyeon.site:3000/)

## ✅ 사용 기술 및 개발 환경
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
<img src="https://img.shields.io/badge/Sock.js-black?style=for-the-badge&logo=&logoColor=white">
<img src="https://img.shields.io/badge/Stomp.js-black?style=for-the-badge&logo=&logoColor=white">
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
<!--![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)-->

## ✅  화면 설계
![image](https://github.com/user-attachments/assets/2e46eeb7-7ee0-4a61-93ce-d8d8e4b2772f)


## ✅ 주요 기능
### ▶ 사용자 기능
- 회원가입
- 로그인 / 로그아웃
- 게시글 작성 / 삭제 / 조회
- 댓글, 대댓글 작성 / 삭제
- 팔로우 / 언팔로우
- 피드 조회

### ▶ 주식 기능
- 각 마켓별 리스트 조회 (KOSPI, KOSDAK) 
- 일일 기준 주식 종목 데이터 (한달, 1년, 3년, 5년)
- 기술적지표 차트 표현 (이동평균선 - 종가기준 12일 20일 26일 / 볼린저밴드 - 이동평균선 20일 / MACD - 12일, 26일 이동평균선)
- 종목 이름, 코드 별 검색 기능

## ✅  주요 설계 및 이슈
### ▶ 소켓 통신
- **차트 일일 기준 종목 초기 데이터 제공**
- **소켓 연결 및 재연결 로직 구현**: SockJS와 STOMP를 사용하여 소켓 연결
- **구독 주제 관리 및 자동 재구독 기능**: 주제 구독 및 소켓 재연결 시 자동 재구독
- **연결 상태에 따른 메시지 전송 관리**: 연결 상태에 따라 메시지 전송 또는 대기열 처리
- **로그아웃 시 동일 계정 로그인 되어있는 모든 기기 로그아웃 처리**
- **비밀번호 업데이트 시 모든 기기 로그아웃 처리**
- **팔로우 유저 실시간 활동내역 알람 (피드 조회)**

### ▶ API 설계
- **API 요청 핸들링 및 에러 처리 구조화**: Ky를 사용해 일관된 API 요청 처리 및 에러 핸들링 
- **토큰 및 사용자 ID 헤더 관리**: JWT 인증과 사용자 ID를 자동으로 헤더에 포함하여 요청 관리
- **반복적인 요청 패턴의 간결화**: GET, POST, PUT, PATCH, DELETE 요청을 위한 재사용 가능한 함수 제공

### ▶모델(Model) 구조 
- **안정적인 에러 처리**: API 응답 실패나 빈 데이터 상황에서도 에러 없이 안전하게 처리
- **일관된 데이터 구조 유지**: API 응답을 표준화된 모델로 변환해 일관된 데이터 구조 보장
- **타입 안정성 및 확장성 제공**: TypeScript 인터페이스를 사용해 타입 검증과 확장성 확보
