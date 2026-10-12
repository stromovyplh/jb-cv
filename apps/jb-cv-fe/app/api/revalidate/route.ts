import { revalidateTag } from 'next/cache'
import { after, NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

import { siteUrl } from '@/app/constants'

const WARM_UP_TIMEOUT_MS = 15_000

interface ProfileWebhookPayload {
  _type?: string
}

/**
 * Tag invalidations live in the memory of the process that handled the webhook,
 * and the file system cache is only rewritten while a page renders. On shared
 * hosting that process can be recycled before any visitor arrives, which would
 * silently drop the invalidation. Requesting the page ourselves forces the
 * re-render that persists the fresh output to disk.
 */
async function warmHomePage(): Promise<void> {
  try {
    const response = await fetch(new URL('/', siteUrl), {
      cache: 'no-store',
      signal: AbortSignal.timeout(WARM_UP_TIMEOUT_MS),
    })

    // Drain the body so the render and its cache write run to completion.
    await response.arrayBuffer()

    if (!response.ok) {
      console.error(`Profile cache warm-up responded with ${response.status}`)
    }
  } catch (error) {
    console.error('Profile cache warm-up failed:', error)
  }
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
    // `revalidateTag` only queues the invalidation; Next applies it once this
    // response is finished, so the warm-up has to run after that.
    after(warmHomePage)

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
