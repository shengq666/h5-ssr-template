import { Suspense } from 'react';
import { getServerQuery } from '@/utils';
import { PageProps } from '@/types';

export default async function Demo({ searchParams }: PageProps) {
  const query = await getServerQuery(searchParams);
  console.log('query', query);

  return (
    <>
      <h1>这是一个 hello 示例页面</h1>
      <p>查询参数: {JSON.stringify(query)}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <div>hello </div>
      </Suspense>
    </>
  );
}
