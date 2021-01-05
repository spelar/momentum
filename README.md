# momentum
* URL : https://spelar-momentum.herokuapp.com (월7$ 호스팅을 사용중이지만..Region이 미국이라 검색 결과 받아오는 속도가 조금 느립니다. 양해 부탁드립니다.)
* Naver Open Api를 사용해서 영화, 책 검색 서비스를 만들었습니다.
   * 영화 : https://developers.naver.com/docs/search/movie/
   * 책 : https://developers.naver.com/docs/search/book/
* UI
   * <img width="239" alt="momentum1" src="https://user-images.githubusercontent.com/17353901/103609318-f624e580-4f60-11eb-88e2-c5d027a0c3e4.png"><img width="239" alt="momentum2" src="https://user-images.githubusercontent.com/17353901/103609351-04730180-4f61-11eb-81ec-dec2295ed975.png"><img width="239" alt="momentum3" src="https://user-images.githubusercontent.com/17353901/103609356-076df200-4f61-11eb-842b-3c0b8e5c31e2.png"><img width="239" alt="momentum4" src="https://user-images.githubusercontent.com/17353901/103609359-09d04c00-4f61-11eb-9c21-e06d538f3f53.png">

## 사용 기술

* 배포
    * 배포는 Heroku(https://www.heroku.com/)를 사용했습니다. Heroku는 Node.js로 서버에 올릴 수 있고 git push로 depolying 할 수 있어서 사용했습니다.

* 백엔드
    * 서버는 Node.js, Express를 사용해서 구현했습니다.
    * Node.js를 사용한 이유는 자바스크립트로 서버를 구현할 수 있고, Express는 간편한 코드로 훌륭한 웹 어플리케이션을 만들 수 있기 때문에 사용했습니다.

* 프론트엔드
    * 프론트엔드는 React, TypeScript, Redux, Redux-Saga, typesafe-actions, create-react-app, Webpack, Babel, Sass를 사용했습니다.
    * React는 페이스북과 인스타그램에서 개발한 오픈소스 자바스크립트 라이브러리입니다. React를 선택한 이유는 가상 DOM 을 사용한 어플리케이션의 성능 향상, 
    Component의 가독성이 매우 높고 간단하여 쉬운 유지 보수가 가능하고 재사용성이 높습니다. 또한 다른 프레임워크나 라이브러리와 혼용이 가능하며 광범위한 생태계를 갖추고 있어 선택했습니다.
    * 느슨한 타입의 언어인 자바스크립트를 사용해 만든 프로젝트에서는 규모가 커질수록 코드가 복잡해지고, 디버그와 테스트 공수가 증가하는 문제가 있어 이런 문제를 해결하고자 TypeScript를 사용하게 되었습니다.
    * React는 view만을 책임지는 라이브러리이고, MVC 패턴 규모가 큰 프로그램에서는 데이터를 어떻게 관리가 중요한데 Redux가 클라이언트쪽 state를 효율적으로 관리할 수 있어 사용했습니다.
    * Redux-Saga는 redux의 비동기 액션을 처리하기 위한 라이브러리입니다. redux-saga 에서는 Generator라는 것을 사용해서 function* 같은 문법을 사용하게 되는데 액션을 dispatch하기도 쉬우며, 문법 또한 직관적이어서 사용하게 됐습니다.
    * typesafe-actions는 action, action-type, reducer의 반복되는 코드를 훨씬 편하게 구현해줄 수 있고, TypeScript 환경에서 사용하기 편하며 레퍼런스 또한 많아서 사용하게 되었습니다.
    * create-react-app은 React 작업환경을 쉽게 설정할 수 있는 공식 도구입니다. eject을 한 후 react-hot-loader, Sass 설정 등을 추가로 해줘야 하지만, Webpack/babel 세팅에 소요되는 시간을 절약해줘 사용했습니다.
    * Webpack은 노드 모듈이며 웹에서 사용되는 모든 자원을 번들링 해주는 도구입니다. 웹팩을 사용하면 자바스크립트 내에서 필요한 css나 image와 같은 파일도 번들링 해서 하나의 파일로 합쳐줘서 네트워크 요청을 최소화시킬 수 있고, 
    CSS 전처리기나 JS 파일들의 컴파일에도 사용할 수 있습니다. 또한 hot 리로딩을 지원해주기 때문에 사용했습니다.
    * babel은 자바스크립트 es6 버전을 쓸 수 있도록 해주는 transpiler입니다. 바벨 로더를 이용하여 jsx 나 es6을 사용할 수가 있기 때문에 선택했습니다.
    * Sass는 CSS를 효율적으로 작성할 수 있도록 도와주는 preprocessor입니다. 기존의 CSS의 유지 보수의 불편함 등을 SASS를 사용해서 component 형태로 사용했습니다.
    * code splitting을 적용해 성능을 향상 시켰습니다. SPA의 단점은 자바스크립트 번들 파일에 어플리케이션에 모든 로직이 들어가게 됩니다. 규모가 커지면 용량이 커지기 때문에, 로딩 속도가 지연될 수 있습니다. code splitting을 적용해 번들 파일을 여러개의 파일로 분리시켜서 어플리케이션에 적용했습니다.
    
## 실행

* 백엔드 개발 서버 실행
    * 백엔드 개발 서버를 실행하려면 루트 디렉토리에서 다음 명령을 실행하세요.   
```bash
$ npm run backEndDev
``` 

* 프론트엔드 개발 서버 실행
    * 프론트엔드 개발 서버를 실행하려면 frontend 디렉토리에서 다음 명령을 실행하세요.
```bash
$ npm run frontEndStart
``` 
                        

