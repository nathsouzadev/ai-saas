import { auth } from '@clerk/nextjs';
import Replicate from 'replicate';
import { NextResponse } from 'next/server';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = '512x512' } = body.values;
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!replicate) {
      return new NextResponse('Replicate API Key not configured', {
        status: 500,
      });
    }

    if (!prompt || !amount || !resolution) {
      return new NextResponse('All fields are required', { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }

    await increaseApiLimit();

    const resolutionNumbers = resolution.split('x').map(Number);
    const [width, height] = resolutionNumbers;

    const result = await replicate.run(
      'bytedance/sdxl-lightning-4step:727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a',
      {
        input: {
          width,
          height,
          prompt,
          scheduler: 'K_EULER',
          num_outputs: Number(amount),
          guidance_scale: 0,
          negative_prompt: 'worst quality, low quality',
          num_inference_steps: 4,
        },
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
