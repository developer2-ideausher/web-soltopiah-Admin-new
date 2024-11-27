import React from 'react'

export default function DateModal(props) {
    const handler = (e) => {
        props.handler('sortBy',e.currentTarget.getAttribute("value"))
    }
    const handler2 = (e) => {
        props.handler('sortOrder',e.currentTarget.getAttribute("value"))
    }
    return (
        <div className='w-32 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] left-0'>
            {/* <h5 className='text-black text-sm font-semibold mb-4'>Date</h5>
            <label htmlFor='approved' className='w-full flex items-center gap-2 cursor-pointer' value="createdAt" onClick={handler}>
                {props.value == 'createdAt' ? <input type="radio" name="status" id="approved" value="approved" checked />:<input type="radio" name="status" id="approved" value="approved" />}
                <h6 className='text-xs text-black font-normal'>Old to new</h6>
            </label>
            <label htmlFor='pending' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="" onClick={handler}>
                {props.value == '' ? <input type="radio" name="status" id="pending" value="pending" checked />:<input type="radio" name="status" id="pending" value="pending" />}
                <h6 className='text-xs text-black font-normal'>New to old</h6>
            </label> */}
            <h5 className='text-black text-sm font-semibold'>Date</h5>
            <label htmlFor='declined' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="asc" onClick={handler2}>
                {props.value2 == 'asc' ? <input type="radio" name="time" id="declined" value="asc" checked />:<input type="radio" name="time" id="declined" value="asc" />}
                <h6 className='text-xs text-black font-normal'>Old to new</h6>
            </label>
            <label htmlFor='all' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="desc" onClick={handler2}>
                {props.value2 == 'desc' ? <input type="radio" name="time" id="all" value="desc" checked />:<input type="radio" name="time" id="all" value="desc" />}
                <h6 className='text-xs text-black font-normal'>New to old</h6>
            </label>
        </div>
    )
}