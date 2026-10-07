import { json } from '@sveltejs/kit';
import { Redis } from '@upstash/redis';
import { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } from '$env/static/private';

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN
});

export async function GET() {
  const count = (await redis.get<number>('here-count')) ?? 0;
  return json({ count });
}

export async function POST() {
  const count = await redis.incr('here-count');
  return json({ count });
}