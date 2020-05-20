# codePlatform

## 个人开发辅助平台

辅助开发工作的工具平台 [地址](https://admin.codeyhj.cn)

本系统主要辅助个人日常开发工作安排细分。合理提醒自身每天、每周学习任务的达成度，根据工作情况或者学习情况产生的数据换为数据图，有效分析自己的不足，持续迭代改进。

本项目虽然是个人编写，但是里面包含了团队了使用到的测试、自动部署等

## 主要支线

- **master 分支**（ 最终确定版本 ）

- **develop 分支** 开发初步确定版本（ 线上正式环境版本 ）

- **test 分支** 开发者版本（ 线上预发布环境版本，用于测试 ）

多环境发布过程统一由 Jenkins 发布

## 前端搭建文章

[webpack 基建](https://www.yuque.com/u120129/dyqi27/ogcnek)

## 技术栈

### 前端

- TypeScript
- React
- Axios
- webpack（自定义配置）
- less

[地址](https://github.com/CodeYHJ/codeplatform-web)

### 后端

[地址](https://github.com/CodeYHJ/codeplatform-api)

## 前端项目结构

```
.
├── Jenkinsfile
├── LICENSE
├── README.md
├── commitlint.config.js
├── config
│   ├── util
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── injectCDN.js
│   │   └── moduleConfig.js
│   ├── webpack.config.base.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.dll.js
│   ├── webpack.config.pro.js
│   └── webpack.config.test.js
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
│   ├── init.less
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
│   │   └── image.d.ts
│   └── util
│       └── index.tsx
├── tsconfig.json
├── types
│   └── typings.d.ts
└── yarn.lock

```

## 功能

### 登陆功能

- [x] 登陆
- [x] 注册

### 工作台

- [x] 今天完成任务数量
- [x] 一周内完成任务数量
- [x] 一周内任务失败数量
- [x] 一周内任务总数量
- [x] 当月任务完成统计图

### 任务记录

- [x] 任务看板

### 用户

- [x] 更改用户头像与密码
- [x] 添加 Token 功能
