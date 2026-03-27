import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image
          src="/logo.jpg"
          width={30}
          height={30}
          alt="Logo"
          
        />

        <h2 className="text-xl font-bold">
  Ai Short Vid
</h2>

      </div>
      <div className='flex gap-3 items-center'>
        <Button>Dashboard</Button>
        <UserButton/>
      </div>
    </div>
  );
}

