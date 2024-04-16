import { auth } from '@clerk/nextjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { message } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!genAI) {
      return new NextResponse('GeminiAI API Key not configured', {
        status: 500,
      });
    }

    if (!message) {
      return new NextResponse('Message is required', { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      // systemInstruction: {
      //   role: 'user',
      //   parts: [
      //     { text: 'You are a code generator. You must answer only in a markdown code snippets. Use code comments for explanations' },
      //   ],
      // },
    })
    const result = await model.generateContent(`You are a code generator. You must answer only in a markdown code snippets and code comments for explanations. ${message}. Explique o código gerado.`)

    return NextResponse.json(result.response.text());
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
