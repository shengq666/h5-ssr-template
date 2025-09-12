// 全局类型定义
export interface IProps {
  [key: string]: any
}

// Next.js 页面组件 Props 类型
export interface PageProps {
  params?: { [key: string]: string | string[] }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// 更具体的搜索参数类型工具
export type SearchParams<T> = {
  [K in keyof T]?: string | string[]
} & { [key: string]: string | string[] | undefined }