/**
 * 构建带查询参数的完整 URL
 * @param path - 基础路径
 * @param query - 查询参数对象
 * @returns 完整的 URL 字符串
 */
export const buildUrl = (
  path: string,
  query?: Record<string, string | number | boolean>
): string => {
  if (!query) {
    return path
  }

  // 过滤掉 undefined 和 null 值
  const filteredQuery: Record<string, string> = {}
  Object.keys(query).forEach((key) => {
    if (query[key] !== undefined && query[key] !== null) {
      filteredQuery[key] = String(query[key])
    }
  })

  if (Object.keys(filteredQuery).length === 0) {
    return path
  }

  const queryString = new URLSearchParams(filteredQuery).toString()
  return `${path}?${queryString}`
}

/**
 * 获取当前路径的查询参数
 * @returns 查询参数对象
 */
export const getQuery = (): Record<string, string> => {
  if (typeof window === 'undefined') {
    return {}
  }

  const searchParams = new URLSearchParams(window.location.search)
  const query: Record<string, string> = {}

  for (const [key, value] of searchParams) {
    query[key] = value
  }

  return query
}

/**
 * 工具函数：将对象转换为查询参数字符串
 * @param params - 参数对象
 * @returns 查询参数字符串
 */
export function buildQueryString(params: Record<string, any>): string {
  const filteredParams: Record<string, string> = {}

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      filteredParams[key] = String(params[key])
    }
  })

  return new URLSearchParams(filteredParams).toString()
}

/**
 * 工具函数：解析查询参数字符串为对象
 * @param queryString - 查询参数字符串
 * @returns 参数对象
 */
export function parseQueryString(queryString: string): Record<string, string> {
  if (!queryString) return {}

  // 移除开头的 '?' 字符
  const search = queryString.startsWith('?')
    ? queryString.substring(1)
    : queryString
  const params = new URLSearchParams(search)
  const result: Record<string, string> = {}

  for (const [key, value] of params) {
    result[key] = value
  }

  return result
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * 在服务端获取当前请求的查询参数
 * @param searchParams Next.js 页面组件接收的 searchParams 参数
 * @returns 查询参数对象
 */
export const getServerQuery = async (
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined }
    | undefined
): Promise<Record<string, string>> => {
  // 确保 searchParams 已经 resolve
  const params = await searchParams

  if (!params) {
    return {}
  }

  const query: Record<string, string> = {}

  for (const [key, value] of Object.entries(params)) {
    // 处理数组值，取第一个元素
    if (Array.isArray(value)) {
      if (value.length > 0) {
        query[key] = value[0]
      }
    }
    // 处理字符串值
    else if (typeof value === 'string') {
      query[key] = value
    }
  }

  return query
}

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (
    process.env.VERCEL_ENV === 'production' &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}

export const isServer = () => {
  return typeof window === 'undefined'
}
