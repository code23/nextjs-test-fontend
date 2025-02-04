import MarkkoSDK from "@meetmarkko/markko-nextjs-sdk"
import { getSession } from "../../actions"
import markkoConfig from "@/src/config/markko"
import { Code } from "@heroui/react"
import Link from "next/link"
import Image from "next/image"


const sdk = new MarkkoSDK(markkoConfig)


export default async function ProductPage({ params,
}: {
  params: Promise<{ slug: string }>
}) {
  const session = await getSession()
  const oauth = session.oauth
  const product = await sdk.products.getBySlug((await params).slug, { with: 'images', }, oauth)
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Product: {product.data.name}</h1>
      {product?.data.images[0]?.image_paths.original && (
        <div className="w-full h-80 relative">
          <Image
            src={product?.data.images[0]?.image_paths.original}
            alt={product?.data.name}
            fill={true}
            className="rounded-lg object-cover object-top"
          />
        </div>
      )}
      <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
        {JSON.stringify(product, null, 2)}
      </Code>
      <Link
        href="/products"
        className="hover:underline hover:underline-offset-4"
      >
        ← Back to Products
      </Link>
    </main>
  )
}                                   