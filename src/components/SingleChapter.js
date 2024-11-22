import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'

export default function SingleChapter(props) {
  return (
    <Link href={`/content-management/single/${props.data._id}`} className='w-full flex items-center justify-between py-4 px-5 border-t border-solid border-[#E9E9EC]'>
        <div className='flex items-center gap-2 w-3/12'>
          <img src={props.data?.thumbnail?.url ? props.data?.thumbnail.url : "/cm.svg"} className='w-2/12 rounded-md h-12' />
          <h6 className='text-[#252322] font-semibold text-sm'>{props.data?.title}</h6>
        </div>
        <h6 className='text-[#17161D] font-normal w-2/12 text-base'>{props.data?.description.substring(0, 50)}</h6>
        <h6 className='text-[#17161D] font-normal w-1/12 text-center text-base'>{props.data?.category?.title}</h6>
        <h6 className='text-[#17161D] font-normal w-1/12 text-center text-base capitalize'>{props.data?.courseType}</h6>
        <h6 className='text-[#17161D] font-normal w-1/12 text-center text-base'>{dayjs(props.data?.createdAt).format("DD MMM, YYYY")}</h6>
        {props.data?.accessibility == 'premium' && <h6 className='text-[#B35605] rounded-full py-1 bg-[#F9882436] border border-[#F9882433] font-normal w-24 text-center text-base capitalize'>{props.data?.accessibility}</h6>}
        {props.data?.accessibility == 'free' && <h6 className='text-[#17161D] rounded-full py-1 bg-[#00000014] border border-[#0000001C] font-normal w-24 text-center text-base capitalize'>{props.data?.accessibility}</h6>}
    </Link>
  )
}