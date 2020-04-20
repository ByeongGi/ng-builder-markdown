---
title: Angular Cli를 기능을 활용하여 라이브러리 만들기-3
date: 2019-02-22 00:37:00
category: "Angular" 
tags: ['Angular','library']
---

# Angular Cli를 기능을 활용하여 라이브러리 만들기-3 | BangLog

[https://byeonggi.github.io/blog/angular-cli%EB%A5%BC-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-3](https://byeonggi.github.io/blog/angular-cli%EB%A5%BC-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-3)

- 

    기본적으로 공개 Repo는 무료이다. (Private Repo는 유료다.)

![npm-login.png](/assets/2019-02-21-Angular-Cli-Library03/npm-login.png)

![npm-whoami.png](/assets/2019-02-21-Angular-Cli-Library03/npm-whoami.png)

- ReadMe.md , LICENSE 파일 추가한다.

![readme-license-add.png](/assets/2019-02-21-Angular-Cli-Library03/readme-license-add.png)

- 

    빌드시에 자동으로 ReadMe.md , LICENSE 파일이 복사 될수 있도록 script에 명령어를 추가하자.

- 

    안되면 수동으로 복사하자! ^^(우분투 환경에서 돌리기 위해서 Cp 로 파일 복사를 했다.)
```bash
    "scripts" : {
        "copy-license": "cp ./LICENSE ./dist/bengis-ui",
        "copy-readme": "cp ./README.md ./dist/bengis-ui",
        "copy-files": "npm run copy-license && npm run copy-readme"
    }
```
- 

    bengis-ui Project의 package.json에 정보를 추가하자

    - License
    - Repository
    - Description
    - Key words
    - Home page
- 

    아래 처럼 추가 하였다.
```json
    {
      "name": "bengis-ui",
      "version": "0.0.1",
      "description": "테스트를 위해서 올린 Repo입니다.",
      "keywords" :["Angular","Library"],
      "license": "MIT LICENSE",
      "repository": {
        "type": "git",
        "url": "https://github.com/byeonggi/bengis-ui.git"
      },
      "author": {
        "name": "ByeongGiKim",
        "email": "wwww3426@naver.com"
      },
      "peerDependencies": {
        "@angular/common": "^7.2.0",
        "@angular/core": "^7.2.0"
      }
    }
```
- taz로 패킹된 파일을 npm에 배포해보자

    npm publish ./dist/bengis-ui/bengis-ui-0.0.1.tgz

> 참고