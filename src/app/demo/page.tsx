import { Suspense } from 'react'
import Client from './client'
import DemoProvider from './demo-provider'

export default async function Demo() {
  return (
    <>
      <h1>这是一个 demo 示例页面</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DemoProvider>
          <Client />
        </DemoProvider>
      </Suspense>
    </>
  )
}