import Link from 'next/link';
import { Header } from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <main className='w-full'>
        <div className='flex w-full h-full justify-center items-center'>
          <div className="flex items-center justify-start mt-20">
            <h4 className='text-lg font-medium'>404 - Page Not Found.</h4>    
            <Link href="/" aria-label="Home">
              <p className='text-brandColor underline ml-2 text-lg font-medium'>Home</p>
            </Link>
          </div> 
        </div>
      </main>
    </>
  )
}
