import BackButton from '@/components/BackButton'
import Link from 'next/link'
import React from 'react'
import UploadImage from '../../../../../icons/UploadImage'

function page() {
  return (
    <div className="flex flex-col gap-7">
       <div className="flex flex-row gap-5 items-center">
        <Link href="/quickreads">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
        Add new quick read
         
        </p>
      </div>
      <form className='flex flex-col gap-5 w-1/3'>
        <div className='flex flex-col gap-2 '>
            <p className='text-sm font-sans font-semibold text-black'>Title</p>
            <input type='text' className='py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white'/>
        </div>
        <div className='flex flex-col gap-2 '>
            <p className='text-sm font-sans font-semibold text-black'>Upload slides</p>
            <div className='py-3 px-4 rounded-lg border border-[#D3D6EE] bg-[#E5E7F5] h-40 relative flex flex-col items-center gap-3 '>
                <div className='bg-[#DADDF1] rounded-full p-3'>
                <UploadImage/>
                </div>
                <p className='text-sm font-sans font-normal text-[#9C9896]'>Drag and drop image(PNG,JPG or JPEG) or</p>
                <p className='text-[#4655B9] text-sm font-sans font-semibold'>Choose File</p>

            <input type='file'  className='absolute opacity-0 inset-0'/>
            </div>
            
        </div>
        <button className='bg-[#AE445A] text-base font-sans rounded-lg font-black p-4 w-2/5 text-white'>Save and publish</button>
        
      </form>
    </div>
  )
}

export default page
