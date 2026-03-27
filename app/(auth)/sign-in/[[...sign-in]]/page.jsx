import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
         {/* RIGHT */}
      <div>
        <Image
          src="/Login.jpg"
          alt="Login"
          width={500}
          height={500}
          className='w-full object-contain'
        />
      </div>

      {/* LEFT */}
      <div className='flex justify-center items-center h-screen'>
        <SignIn afterSignInUrl="/dashboard" />
      </div>

     

    </div>
  )
}
