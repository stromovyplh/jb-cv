import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

interface ProfileWebhookPayload {
  _type?: string
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return Response.json({ message: 'Missing revalidation secret' }, { status: 500 })
  }

  try {
    const { body, isValidSignature } = await parseBody<ProfileWebhookPayload>(request, secret, true)

    if (!isValidSignature) {
      return Response.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (body?._type !== 'profile') {
      return Response.json({ message: 'Unsupported document type' }, { status: 400 })
    }

    revalidateTag('profile', { expire: 0 })

    return Response.json({
      revalidated: true,
      tag: 'profile',
      now: Date.now(),
    })
  } catch (error) {
    console.error('Profile revalidation failed:', error)

    return Response.json({ message: 'Revalidation failed' }, { status: 500 })
  }
}
