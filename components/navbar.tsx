'use client';
import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobile-sidebar';

interface NavbarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Navbar = ({ apiLimitCount, isPro }: NavbarProps) => {
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
