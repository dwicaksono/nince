import React from 'react';
import Navigation from './navigation';
import HeaderLogo from './header-logo';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { WelcomeMessage } from './welcome-message';

const Header = () => {
  return (
    // <div className="from-bule-700 bg-gradient-to-b to-blue-500 px-4 py-8 pb-36 lg:px-14">
    <div className="bg-fuchsia-700 bg-gradient-to-t from-blue-500 px-4 py-8 pb-36 lg:px-14">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-14 flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-white/20" />
          </ClerkLoading>
        </div>
        <WelcomeMessage />
      </div>
    </div>
  );
};

export default Header;
