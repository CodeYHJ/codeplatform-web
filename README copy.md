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

[webpack基建](https://www.yuque.com/u120129/dyqi27/ogcnek)

## 技术栈

### 前端

- TypeScript
- React
- Axios
- webpack（自定义配置）
- less

[地址](https://gitee.com/colgateyhj/codePlatform)

### 后端

[地址](https://gitee.com/colgateyhj/codePlatform-Api)

## 前端项目结构

```
.
├── Jenkinsfile                 // Jenkins多通道配置
├── README.md
├── config                      // webpack 配置
│   ├── util                    // webpack打包用到工具函数
│   ├── webpack.config.base.js  // webpack基础配置
│   ├── webpack.config.dev.js   // dev环境
│   ├── webpack.config.dll.js   // dll配置
│   ├── webpack.config.pro.js   // 生产环境配置
│   └── webpack.config.test.js  // 测试环境配置
├── package.json                // 依赖文件
├── postcss.config.js           // postcss 配置
├── src
│   ├── api                     // api统一存放
│   ├── app.tsx                 // 主入口
│   ├── assets                  // 静态文件
│   ├── less                    // css文件
│   ├── page                    // 页面
│   ├── store                   // 状态管理
│   ├── types                   // TypeScript 定义
│   └── util                    // 页面工具函数
└── tsconfig.json
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

- [x] 任务记录
- 两种模式：循环模式、时间段模式
  - [x] 循环模式
  - [x] 时间段模式
  - [x] 每天凌晨 🕛，后台根据模式，自动更新任务状态

### 用户

- [x] 更改用户头像与密码
- [x] 添加 Token 功能

### Token 的使用

- [ ] 雨雀平台作为网上编辑平台，个人博客站点作为展示平台
- [ ] 平台订阅信息功能
