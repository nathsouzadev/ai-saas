import { auth } from '@clerk/nextjs';
import Replicate from 'replicate';
import { NextResponse } from 'next/server';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!replicate) {
      return new NextResponse('Replicate API Key not configured', {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }

    if(!isPro) {
      await increaseApiLimit();
    }

    const result = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt
        },
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
