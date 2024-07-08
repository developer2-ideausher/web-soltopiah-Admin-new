"use client"
import React, { useEffect, useState } from 'react'

export default function SingleContentSelector(props) {
  const [added,setAdded] = useState(false)
  const handler = () => {
    props.handler(props.data)
    setAdded(!added)
  }
  useEffect(()=>{
    props.selected?.map((item)=>{
      if(item._id == props.data._id) {
        setAdded(true)
      }
    })
  },[])
 
  return (
    <div className='w-full flex flex-wrap justify-center mt-5'>
      <div className='flex flex-wrap w-11/12 gap-3'>
        <img className='w-20 h-14 rounded-md' src={props.data?.thumbnail?.url ? props.data.thumbnail.url : "/hands.png"}  />
        <div>
          <h6 className='text-[#08A03C] text-xs font-normal'>{props.data.type}</h6>
          <h5 className='text-sm font-semibold text-[#393E59]'>{props.data.title}</h5>
          <h6 className='text-[#848bb3] text-xs font-normal'>{props.data.durationInMinutes}m</h6>
        </div>
      </div>
      <div className='w-1/12 checkbox-slector flex items-center justify-center'>
        {added ? <input type="checkbox" className='cursor-pointer' checked onChange={handler} />:<input type="checkbox" className='cursor-pointer' onChange={handler} />}
      </div>
    </div>
  )
}