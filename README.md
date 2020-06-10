# codePlatform

## 个人任务管理平台

个人任务管理平台

[正式环境地址](https://admin.codeyhj.cn)

正式环境账号可自主注册

[测试环境地址](https://pretest.codeyhj.cn)

测试环境 账号：test 密码：123456

主要记录个人日常开发工作安排细分与统计。由 React、React-Router 组成，All In Hook。

从零开始搭建，不借助其他脚手架，由本人编写。

本项目虽然是个人编写，但是里面包含了团队了使用到的测试、自动部署等糅合在一起的个人项目。

## 主要支线

- **master 分支**（ 线上正式环境 ）

- **develop 分支** （ 线上测试环境 ）

多环境发布过程统一由 Jenkins 发布

## 搭建文章

[从零搭建项目 -- 发布项目流程](https://www.yuque.com/u120129/aygter/ox6drs)

[从零搭建项目（1） -- 项目及其技术概括](https://www.yuque.com/u120129/aygter/gdcniz)

[从零搭建项目（2）-- 项目初始化](https://www.yuque.com/u120129/aygter/po32su)

[从零搭建项目（3）-- less 与 Ant Design](https://www.yuque.com/u120129/aygter/tkiiwr)

[从零搭建项目（4）-- 开发体验优化](https://www.yuque.com/u120129/aygter/osyxvv)

[从零搭建项目（5）-- 路由与状态管理](https://www.yuque.com/u120129/aygter/sg1m3b)

[从零搭建项目（6） -- 打包（webpack）](https://www.yuque.com/u120129/aygter/iowaqz)

[从零搭建项目（7）-- 使用 Docker](https://www.yuque.com/u120129/aygter/gliga9)

[从零开始搭建（8）-- 后端](https://www.yuque.com/u120129/aygter/kunw0y)

[从零搭建项目（9）-- Jenkins 部署与发布](https://www.yuque.com/u120129/aygter/gyfmq7)

[从零搭建项目（10） -- Nginx 部署与配置](https://www.yuque.com/u120129/aygter/lf9tdw)

## 技术栈

### 前端 [地址](https://github.com/CodeYHJ/codeplatform-web)

- TypeScript
- React
- React-Router
- Axios
- webpack（自定义配置）
- less

### 后端 [地址](https://github.com/CodeYHJ/codeplatform-api)

## 前端项目结构

```
.
├── Jenkinsfile
├── LICENSE
├── README.md
├── commitlint.config.js
├── config
│   ├── HTML
│   │   ├── favicon.ico
│   │   └── index.html
│   └── webpack
│       ├── moduleConfig.ts
│       ├── tsconfig-for-webpack-config.json
│       ├── utils.ts
│       ├── webpack.config.base.ts
│       ├── webpack.config.dev.ts
│       └── webpack.config.pro.ts
├── package.json
├── postcss.config.js
├── src
│   ├── api
│   │   ├── auth.ts
│   │   ├── char.ts
│   │   ├── index.ts
│   │   ├── task.ts
│   │   ├── test.ts
│   │   └── user.ts
│   ├── app.less
│   ├── app.tsx
│   ├── assets
│   │   └── img
│   ├── helper.less
│   ├── page
│   │   ├── BaseLayout
│   │   ├── Component
│   │   ├── ErrorBoundary
│   │   ├── Home
│   │   ├── Login
│   │   ├── NotFound
│   │   └── Registered
│   ├── store
│   │   ├── index.tsx
│   │   ├── task
│   │   └── user
│   ├── types
│   │   ├── image.d.ts
│   │   └── typings.d.ts
│   └── util
│       └── index.tsx
├── tsconfig.json
├── yarn-error.log
└── yarn.lock

```

## 功能

### 登陆功能

- [x] 登陆
- [x] 注册

### 工作台

- [x] 任务分类记录汇总卡片
- [x] 任务记录趋势图

### 任务记录

- [x] 任务看板

### 用户

- [x] 更改用户头像与密码
- [x] 添加 Token 功能
