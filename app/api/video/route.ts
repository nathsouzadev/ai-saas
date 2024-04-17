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
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351', 
      { 
        input: {
          prompt
        }
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.log('[VIDEO_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
