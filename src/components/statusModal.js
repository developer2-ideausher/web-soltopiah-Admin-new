import React from 'react'

export default function StatusModal(props) {
    const handler = (e) => {
        props.handler('status',e.currentTarget.getAttribute("value"))
    }
  return (
    <div className='w-28 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] left-0'>
        <label htmlFor='approved' className='w-full flex items-center gap-2 cursor-pointer' value="approved" onClick={handler}>
            {props.value == 'approved' ? <input type="radio" name="status" id="approved" value="approved" checked />:<input type="radio" name="status" id="approved" value="approved" />}
            <h6 className='text-xs text-black font-normal'>Approved</h6>
        </label>
        <label htmlFor='pending' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="pending" onClick={handler}>
            {props.value == 'pending' ? <input type="radio" name="status" id="pending" value="pending" checked />:<input type="radio" name="status" id="pending" value="pending" />}
            <h6 className='text-xs text-black font-normal'>Pending</h6>
        </label>
        <label htmlFor='declined' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="declined" onClick={handler}>
            {props.value == 'declined' ? <input type="radio" name="status" id="declined" value="declined" checked />:<input type="radio" name="status" id="declined" value="declined" />}
            <h6 className='text-xs text-black font-normal'>Declined</h6>
        </label>
        <label htmlFor='all' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="" onClick={handler}>
            {props.value == '' ? <input type="radio" name="status" id="all" value="all" checked />:<input type="radio" name="status" id="all" value="all" />}
            <h6 className='text-xs text-black font-normal'>All</h6>
        </label>
    </div>
  )
}