import React from 'react'

export default function CourseFilterModal(props) {
    const handler = (e) => {
        props.handler('courseContentType',e.currentTarget.getAttribute("value"))
    }
    const handler2 = (e) => {
        props.handler('accessibility',e.currentTarget.getAttribute("value"))
    }
    return (
        <div className='w-32 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] left-0'>
            <h5 className='text-black text-sm font-semibold mb-4'>Course type</h5>
            <label htmlFor='approved' className='w-full flex items-center gap-2 cursor-pointer' value="audio" onClick={handler}>
                {props.value == 'audio' ? <input type="radio" name="status" id="approved" value="approved" checked />:<input type="radio" name="status" id="approved" value="approved" />}
                <h6 className='text-xs text-black font-normal'>Audio</h6>
            </label>
            <label htmlFor='pending' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="video" onClick={handler}>
                {props.value == 'video' ? <input type="radio" name="status" id="pending" value="pending" checked />:<input type="radio" name="status" id="pending" value="pending" />}
                <h6 className='text-xs text-black font-normal'>Video</h6>
            </label>
            <h5 className='text-black text-sm font-semibold mt-4'>Access type</h5>
            <label htmlFor='declined' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="free" onClick={handler2}>
                {props.value2 == 'free' ? <input type="radio" name="time" id="declined" value="declined" checked />:<input type="radio" name="time" id="declined" value="declined" />}
                <h6 className='text-xs text-black font-normal'>Free</h6>
            </label>
            <label htmlFor='all' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="premium" onClick={handler2}>
                {props.value2 == 'premium' ? <input type="radio" name="time" id="all" value="all" checked />:<input type="radio" name="time" id="all" value="all" />}
                <h6 className='text-xs text-black font-normal'>Premium</h6>
            </label>
        </div>
    )
}