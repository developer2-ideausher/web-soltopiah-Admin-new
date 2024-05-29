import BackButton from '@/components/BackButton'
import Link from 'next/link'
import React from 'react'
import Profile2 from '../../../../../public/Profile2.png'
import image01 from '../../../../../public/image01.png'

function page() {
  return (
    <div className="flex flex-col gap-7">
       <div className="flex flex-row gap-5 items-center">
        <Link href="/quickreads/quick-reads-requests">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
        Quick Reads Requests
         
        </p>
      </div>
      <div className='border border-[#CDCDCD]'>
       </div>
       <form className='flex flex-col gap-5 lg:w-4/5 xl:w-3/5 2xl:w-2/5'>
        <div className='flex flex-col gap-2 '>
            <p className='text-sm font-sans font-semibold text-black'>Title</p>
            <input type='text' className='py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white text-sm font-sans font-normal text-userblack' placeholder='An emotional trigger is'/>
        </div>
        <div className='flex flex-col gap-2 '>
            <p className='text-sm font-sans font-semibold text-black'>Published by</p>
            <div className='flex flex-row items-center gap-2'>
                <img src={Profile2.src} alt=""/>
                <p className='text-sm font-sans font-normal text-userblack'>Wade Warren</p>
            </div>
        </div>
        <div className='flex flex-col gap-3'>
            <p className='text-sm font-sans font-semibold text-userblack'>Slides (4)</p>
            <div className='grid grid-cols-3 gap-4'>
                <div className='flex justify-center items-center p-6 bg-[#E5E7F5] border border-[#D3D6EE] rounded-lg'>
                    <img src={image01.src} alt=""/>
                </div>
                <div className='flex justify-center items-center p-6 bg-[#E5E7F5] border border-[#D3D6EE] rounded-lg'>
                    <img src={image01.src} alt=""/>
                </div>
                <div className='flex justify-center items-center p-6 bg-[#E5E7F5] border border-[#D3D6EE] rounded-lg'>
                    <img src={image01.src} alt=""/>
                </div>
                <div className='flex justify-center items-center p-6 bg-[#E5E7F5] border border-[#D3D6EE] rounded-lg'>
                    <img src={image01.src} alt=""/>
                </div>
                
            </div>
        </div>
        <div className='flex flex-row items-center gap-5 mt-3'>
            <button className='w-full bg-[#EE3E3E] border border-[#EE3E3E] p-3 rounded-lg text-white text-sm font-sans font-normal'>Decline</button>
            <button className='w-full bg-[#08A03C] border border-[#08A03C] p-3 rounded-lg text-white text-sm font-sans font-normal'>Approve</button>
            
        </div>
        </form>
    </div>
  )
}

export default page
