# H5 SSR Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## 代码规范化配置

本项目配置了代码规范化工具链，实现团队成员可以按个人习惯编写代码，但在提交时会自动进行规范化：

### 核心工具

- **Prettier** - 代码格式化工具
- **ESLint** - 代码质量检查工具
- **Husky** - Git 钩子工具
- **lint-staged** - 对暂存区文件进行检查和格式化

### 工作流程

团队成员可以按照各自的开发习惯进行编码，但在提交时都会自动进行代码格式化和检查，确保最终提交的代码符合统一标准。

### TypeScript 配置

- 允许使用 `any` 类型，不强制要求严格的类型检查
- 允许隐式 any 类型 (`noImplicitAny: false`)

### Prettier 配置

- 使用标准的 Prettier 格式化规则
- 行末分号：添加分号
- 尾随逗号：ES5 标准
- 单引号：使用单引号
- 行宽：80 字符
- 箭头函数参数：尽可能省略括号

### 可用命令

```bash
# 检查代码格式
pnpm format:check

# 格式化所有代码
pnpm format

# 修复 ESLint 问题
pnpm lint:fix
```

### 注意事项

1. 所有团队成员都可以继续使用他们习惯的任何开发方式
2. 配置了 VS Code 的格式化设置和推荐扩展
3. 添加了相关的 npm 脚本用于格式化和检查代码
4. 团队成员应理解并接受统一的代码规范，而不是追求个人偏好

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
