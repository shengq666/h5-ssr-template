// components/errors/GlobalErrorFallback.tsx
'use client'

interface Props {
  error: Error
  resetErrorBoundary: () => void
}

export default function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: Props) {
  return (
    <div className="global-error-container">
      <h2>出了点问题</h2>
      <p>抱歉，发生了一些意外错误。</p>
      <details>
        <summary>错误详情</summary>
        <pre>{error.message}</pre>
      </details>
      <button onClick={resetErrorBoundary}>重试</button>
      <button onClick={() => window.location.assign('/')}>返回首页</button>
    </div>
  )
}
