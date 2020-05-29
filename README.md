# codePlatform

## 个人开发辅助平台

辅助开发工作的工具平台 [地址](https://admin.codeyhj.cn)

本系统主要辅助个人日常开发工作安排细分。合理提醒自身每天、每周学习任务的达成度，根据工作情况或者学习情况产生的数据换为数据图，有效分析自己的不足，持续迭代改进。

本项目虽然是个人编写，但是里面包含了团队了使用到的测试、自动部署等

## 主要支线

- **master 分支**（ 线上正式环境 ）

- **develop 分支** （ 线上测试环境 ）

多环境发布过程统一由 Jenkins 发布

## 搭建文章

[从零搭建项目（1） -- 项目及其技术概括](https://www.yuque.com/u120129/dyqi27/gdcniz)

[从零搭建项目（2）-- 项目初始化](https://www.yuque.com/u120129/dyqi27/po32su)

[从零搭建项目（3）-- less与Ant Design](https://www.yuque.com/u120129/dyqi27/tkiiwr)

[从零搭建项目（4）-- 开发体验优化](https://www.yuque.com/u120129/dyqi27/osyxvv)

[从零搭建项目（5）-- 路由与状态管理](https://www.yuque.com/u120129/dyqi27/sg1m3b)

[从零搭建项目（6） -- 打包（webpack）](https://www.yuque.com/u120129/dyqi27/iowaqz)

[从零搭建项目（7）-- 使用Docker](https://www.yuque.com/u120129/dyqi27/gliga9)

[从零开始搭建（8）-- 后端](https://www.yuque.com/u120129/dyqi27/kunw0y)

[从零搭建项目（9）-- Jenkins部署与发布](https://www.yuque.com/u120129/dyqi27/gyfmq7)

[从零搭建项目（10） -- Nginx部署与配置](https://www.yuque.com/u120129/dyqi27/lf9tdw)


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
│   ├── HTML
│   │   ├── favicon.ico
│   │   └── index.html
│   └── webpack
│       ├── moduleConfig.ts
│       ├── tsconfig-for-webpack-config.json
│       ├── utils.ts
│       ├── webpack.config.base.ts
│       ├── webpack.config.dev.ts
│       ├── webpack.config.dll.ts
│       └── webpack.config.pro.ts
├── dll
│   ├── antd.dll.js
│   ├── antd.manifest.json
│   ├── axios.dll.js
│   ├── axios.manifest.json
│   ├── bizcharts.dll.js
│   ├── bizcharts.manifest.json
│   ├── react.dll.js
│   └── react.manifest.json
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
│   │   ├── image.d.ts
│   │   └── typings.d.ts
│   └── util
│       └── index.tsx
├── tsconfig.json
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
