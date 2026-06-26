export const config = { runtime: 'edge' }

interface WebhookPayload {
  secret?: string
  projectId?: string
  project_id?: string
  type?: string
  event?: string
  articleId?: string
  article_id?: string
  slug?: string
  path?: string
}

export default async function handler(request: Request): Promise<Response> {
  const expectedSecret = process.env.IDEAS_STUDIO_REVALIDATE_SECRET

  if (expectedSecret) {
    const incomingSecret =
      request.headers.get('x-revalidate-secret') ??
      request.headers.get('x-ideas-studio-secret') ??
      request.headers.get('authorization')?.replace('Bearer ', '') ??
      new URL(request.url).searchParams.get('secret')

    if (incomingSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  let body: WebhookPayload = {}
  try {
    body = (await request.json()) as WebhookPayload
  } catch {
    // no body or invalid JSON — still process
  }

  const event = body.event ?? body.type ?? 'unknown'
  const slug = body.slug ?? ''
  const projectId = body.projectId ?? body.project_id ?? ''

  console.log(`[Ideas Studio webhook] ${event} — project: ${projectId} — slug: ${slug}`)

  return new Response(
    JSON.stringify({ revalidated: true, event, slug, projectId }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  )
}
