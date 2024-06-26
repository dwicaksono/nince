import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeaderLogo = () => {
  return (
    <Link href="#">
      <div className="hidden items-start lg:flex">
        <Image src="/icons/logo-1.svg" alt="logo" height={28} width={28} />
        <p className="text-2xl font-semibold text-white">Mocksya</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
