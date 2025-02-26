import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { NextResponse } from 'next/server'

const sdk = new MarkkoSDK(markkoConfig)

export async function POST(request: Request) {
  try {
    const { postcode } = await request.json()
    const results = await sdk.addresses.findByPostcode(postcode)
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching addresses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch addresses' },
      { status: 500 }
    )
  }
}
