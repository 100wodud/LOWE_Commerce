# LOWE_Commerce
 
## 기술 구성
적용된 기술스택: React, Axios, moment, react-calendar, react-indiana-drag-scroll, react-slick, uuidv4, webpack

### Components
1. Board: /board/:id - 상세 상세페이지 view에 해당하는 컴포넌트들.
2. data: 지점 정보(Store.js), 이용약관(Agree.js) 및 프로모션(Promotion.js) 데이터.
3. Designer: /designers - 다자이너 리스트 view에 해당하는 컴포넌트들.
4. Designerdetail: /designer/:id - 다자이너 상세페이지 view에 해당하는 컴포넌트들.
5. Find: /findmyid - 아이디/비밀번호 찾기 view에 해당하는 컴포넌트들.
6. Like: /like - 찜 view에 해당하는 컴포넌트들.
7. Mainpage: 메인페이지 - 메인페이지 view에 해당하는 컴포넌트들.
8. Mypage: /mypage, /mypayments, /mypoint, /mycoupons, /myreviews - 마이페이지 view에 해당하는 컴포넌트들.
9. Nav: 전체 공통 Header, Footer에 해당 하는 컴포넌트들.
10. Payment: /payment/:id - 결제 view에 해당하는 컴포넌트들.
11. Portfolio: /portfolios/:id, /portfoliolist/:id, /portfolio/:id - 포트폴리오 view에 해당하는 컴포넌트들.
12. Promotion: /promotion/... - 이벤트 및 프로모션 view에 해당하는 컴포넌트들.
13. Receipt: /receipt/:id, /mypayment/:id - 영수증,  view에 해당하는 컴포넌트들.
14. Recent: /like - 찜 페이지에 있는 최근 본 상품 view에 해당하는 컴포넌트들.
15. Reservation: /reservation_board/:id, /reservation_surgery/:id, /reservation_change/:id - 스케쥴링 view에 해당하는 컴포넌트들.
16. Review: /myreview/edit/:id, /review/write/:id - 리뷰작성, 리뷰수정 view에 해당하는 컴포넌트들.
17. Search: /search - 검색에 view에 해당하는 컴포넌트들.
18. Sign: /signin, /signup, /naverLogin/:id - 로그인,회원가입 view에 해당하는 컴포넌트들.
19. Store: /stores/:id - 지점 상세페이지 view에 해당하는 컴포넌트들.
20. Home: /styles/:id, /category/:id - 메인페이지에서 이동하는 view에 해당하는 컴포넌트들.

## 페이지
> 기본적으로 리액트, 함수 컴포넌트 방식을 채택하고 있으며 AWS S3에 빌드된 파일을 올려 업데이트를 하고 있습니다.

페이지 업로드는
1. Axios Api 요청 값을 상황에 따라 변경하고 pubilc/worker.js의 revision의 버전 숫자를 바꿔줍니다.
2. npm run build를 통해 빌드를 한 후 AWS S3 lowehair.kr 버킷에 업로드 합니다.
3. AWS CloudFront 무효화를 통해 페이지 캐쉬를 초기화 시켜줍니다. 

페이지는
1. PWA 시도로 인하여 serviceWorker를 생성하였으며 지금은 사용하지 않지만 재방문 유저의 캐시를 삭제하지 않으면 화이트 스크린 문제로 인해 버전 업데이트로 남겨두었습니다.
2. Google Tag Manager를 외주 업체와 협업을 통해 코드를 삽입하였습니다.
3. localStorage를 사용중에 있습니다.
  ```
  localStorage.getItem("id") //로그인시 아이디 저장
  localStorage.getItem("login_method") //로그인 방법 저장
  localStorage.getItem("popup") //페이지 오픈시 첫 팝업(하루동안 보지않기)
  localStorage.getItem("recent") //최근 본 상품 목록
  localStorage.getItem("payment_data") // 스케쥴링 날짜 저장
  localStorage.getItem("uuid") // 광고 스크립트로 인한 데이터
  localStorage.getItem("recent_payment") // 지금 진행하고 있는 결제 데이터
  localStorage.removeItem("recentWord") // 최근 검색어 저장
  ```
4. index.html 마지막 줄 업로드 전 변경해 주셔야 합니다

  테스트 페이지용 결제 페이플 스크립트
  ```
  <script type="text/javascript" src="https://democpay.payple.kr/js/cpay.payple.1.0.1.js"></script>
  ```
  실제 페이지용 결제 페이플 스크립트
  ```
  <script type="text/javascript" src="https://cpay.payple.kr/js/cpay.payple.1.0.1.js"></script>
  ```
  
5. src/Sign/Signin.js의 onClickNaver 업로드 전 변경해 주셔야 합니다

  테스트 페이지용 네이버 소셜로그인 코드
  ```
 let type = '/test';
 let client_id = 'L1LG3ZXKVBWzG4K_xg96';
 const redirect_uri = host + 'oauth/naver' + type;;
 if (type === '/local') client_id = 'VDCjWganBityopCwtNRR';
 if (type === '/test') client_id = '6qt2bUAEaty7WfFiqDPW';
 const state = 'lowehair_naver_state';
 window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`;
 ```
 
테스트 페이지용 네이버 소셜로그인 코드
```
 const redirect_uri = host + '/oauth/naver';
 const client_id = 'L1LG3ZXKVBWzG4K_xg96';
 const state = 'lowehair_naver_state';
 window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`;
```
