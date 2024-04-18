'use client';

import { useAuth } from '@clerk/nextjs';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavBar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="p-4 bg-transparent flex items-center justify-between">
      <Link href='/' className='flex items-center'>
        <div className='relative h-8 w-8 mr-4'>
          <Image 
            alt='Logo'
            fill
            src='/logo.jpeg'
          />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', montserrat.className)}>
          Genius
        </h1>
      </Link>
      <div className='flex items-center gap-x-2'>
        <Link href={ isSignedIn ? '/dashboard' : '/sign-up' }>
          <Button variant='outline' className='rounded-full' >Get started</Button>
        </Link>
      </div>
    </div>
  );
};
