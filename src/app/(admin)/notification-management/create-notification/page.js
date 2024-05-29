import BackButton from '@/components/BackButton'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/notification-management">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
        Create Notification
        </p>
      </div>
      <form className='flex flex-col gap-3 w-1/3'>
        <div className='flex flex-col gap-1'>
            <p className='text-sm font-sans font-semibold text-userblack'>Title</p>
            <input type="text" className='py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal placeholder:text-[#9C9896]' placeholder='Enter title'/>
        </div>
        <div className='flex flex-col gap-1'>
            <p className='text-sm font-sans font-semibold text-userblack'>Type</p>
            <input type="text" className='py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal placeholder:text-[#9C9896]' placeholder='Enter type'/>
        </div>
        <div className='flex flex-col gap-1'>
            <p className='text-sm font-sans font-semibold text-userblack'>Message</p>
            <textarea type="text" className='py-3 px-4 rounded-xl bg-white border border-[#E7E5E4] text-sm font-sans font-normal placeholder:text-[#9C9896]' placeholder='Enter Description'/>
        </div>
        <button className='bg-[#AE445A] border border-[#B7B7B7] p-4 rounded-lg w-2/5 mt-10 text-white font-sans font-black text-base'>Send</button>
        
      </form>
    </div>
  )
}

export default page
