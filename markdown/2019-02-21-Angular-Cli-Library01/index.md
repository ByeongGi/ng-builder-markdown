---
title: Angular Cli를 기능을 활용하여 라이브러리 만들기-1
date: 2019-02-21 10:37:00
category: "Angular" 
tags: ['Angular','library']
---

# Angular Cli를 기능을 활용하여 라이브러리 만들기-122121s

[https://byeonggi.github.io/blog/angular-cli%EB%A5%BC-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-1](https://byeonggi.github.io/blog/angular-cli%EB%A5%BC-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-1)
ddd

- Angular library Project 를 생성 합니다.
- createApplication flag는 기본적으로 true이며, 일반적인 최초 app 프로젝트 생성시 이 flag가 활성화되어 생성된다.([참고](https://angular.io/cli/new))

    ng new [project Name] --createApplication=false

- src 폴더 안에 새로운 초기화된 app 프로젝트가 생성된다.

![angular-standard-project.png](/assets/2019-02-21-Angular-Cli-Library01/angular-standard-project.png)

- 초기화 안된 app 프로젝트 형태 빈 workspace 생성된다.
- projects 폴더안에서 app들을 생성하기 위해서는 `ng generate application` 명령을 사용 해서 만들수 있다.
- 모든 생성된 app 들을 projects 폴더 아래에서 생성된다.

![augular-muti-apps.png](/assets/2019-02-21-Angular-Cli-Library01/augular-muti-apps.png)

- library 용 project 생성
- ng new [project name] --create-application=false

```bash
ng new bengis-lib --create-application=false

? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ http://sass-lang.com   ]
CREATE bengis-lib/README.md (1026 bytes)
CREATE bengis-lib/.editorconfig (246 bytes)
CREATE bengis-lib/.gitignore (587 bytes)
CREATE bengis-lib/angular.json (135 bytes)
CREATE bengis-lib/package.json (1261 bytes)
CREATE bengis-lib/tsconfig.json (435 bytes)
CREATE bengis-lib/tslint.json (1621 bytes)
```

![angular-project-lib-001.png](/assets/2019-02-21-Angular-Cli-Library01/angular-project-lib-001.png)

```bash
ng generate library bengis-ui --prefix=bengis

CREATE projects/bengis-ui/README.md (1010 bytes)
CREATE projects/bengis-ui/karma.conf.js (1009 bytes)
CREATE projects/bengis-ui/ng-package.json (158 bytes)
CREATE projects/bengis-ui/package.json (139 bytes)
CREATE projects/bengis-ui/tsconfig.lib.json (726 bytes)
CREATE projects/bengis-ui/tsconfig.spec.json (246 bytes)
CREATE projects/bengis-ui/tslint.json (253 bytes)
CREATE projects/bengis-ui/src/public_api.ts (167 bytes)
CREATE projects/bengis-ui/src/test.ts (700 bytes)
CREATE projects/bengis-ui/src/lib/bengis-ui.module.ts (235 bytes)
CREATE projects/bengis-ui/src/lib/bengis-ui.component.spec.ts (643 bytes)
CREATE projects/bengis-ui/src/lib/bengis-ui.component.ts (267 bytes)
CREATE projects/bengis-ui/src/lib/bengis-ui.service.spec.ts (344 bytes)
CREATE projects/bengis-ui/src/lib/bengis-ui.service.ts (137 bytes)
UPDATE angular.json (1269 bytes)
UPDATE package.json (1438 bytes)
UPDATE tsconfig.json (569 bytes)
```

![angular-project-lib-002.png](/assets/2019-02-21-Angular-Cli-Library01/angular-project-lib-002.png)

- `ng generate application`로 프로젝트를 생성하면 app 프로젝트와 e2e 테스트가 자동으로 생성된다.

```bash
ng generate application bengis-ui-tester

CREATE projects/bengis-ui-tester/src/favicon.ico (5430 bytes)
CREATE projects/bengis-ui-tester/src/index.html (301 bytes)
CREATE projects/bengis-ui-tester/src/main.ts (372 bytes)
CREATE projects/bengis-ui-tester/src/polyfills.ts (2841 bytes)
CREATE projects/bengis-ui-tester/src/styles.css (80 bytes)
CREATE projects/bengis-ui-tester/src/test.ts (642 bytes)
CREATE projects/bengis-ui-tester/src/assets/.gitkeep (0 bytes)
CREATE projects/bengis-ui-tester/src/environments/environment.prod.ts (51 bytes)
CREATE projects/bengis-ui-tester/src/environments/environment.ts (662 bytes)
CREATE projects/bengis-ui-tester/browserslist (388 bytes)
CREATE projects/bengis-ui-tester/karma.conf.js (1032 bytes)
CREATE projects/bengis-ui-tester/tsconfig.app.json (172 bytes)
CREATE projects/bengis-ui-tester/tsconfig.spec.json (270 bytes)
CREATE projects/bengis-ui-tester/tslint.json (317 bytes)
CREATE projects/bengis-ui-tester/src/app/app.module.ts (314 bytes)
CREATE projects/bengis-ui-tester/src/app/app.component.css (0 bytes)
CREATE projects/bengis-ui-tester/src/app/app.component.html (1120 bytes)
CREATE projects/bengis-ui-tester/src/app/app.component.spec.ts (1008 bytes)
CREATE projects/bengis-ui-tester/src/app/app.component.ts (220 bytes)
CREATE projects/bengis-ui-tester-e2e/protractor.conf.js (752 bytes)
CREATE projects/bengis-ui-tester-e2e/tsconfig.e2e.json (219 bytes)
CREATE projects/bengis-ui-tester-e2e/src/app.e2e-spec.ts (645 bytes)
CREATE projects/bengis-ui-tester-e2e/src/app.po.ts (251 bytes)
UPDATE angular.json (5567 bytes)
UPDATE package.json (1438 bytes)
```

![angular-project-lib-003.png](/assets/2019-02-21-Angular-Cli-Library01/angular-project-lib-003.png)

> 참고
