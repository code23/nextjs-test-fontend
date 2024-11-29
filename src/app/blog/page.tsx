import MarkkoSDK from 'markko-nextjs-sdk'
import Link from 'next/link'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)

const blogs = await sdk.blogs.listPosts({
  sort: 'published_at,desc',
  with: 'images,blog_categories',
  paginate: 10,
  page: 1,
})

const categories = await sdk.blogs.listCategories()

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Blog</h1>
      <h2 className="text-2xl font-bold">Posts</h2>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {blogs.data.map((blog: any, index: number) => (
          <Link
            href={`/vendors/${blogs.slug}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(blog, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {categories.data.map((category: any, index: number) => (
          <Code
            className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900"
            key={index}
          >
            {JSON.stringify(category, null, 2)}
          </Code>
        ))}
      </div>
    </main>
  )
}