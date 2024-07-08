"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function Page() {
    const [tab,setTab] = useState(true)
    const tabHandler = () => {
        setTab(!tab)
    }
    return (
        <div className='w-full'>
            <div className='w-full bg-[#D4D8F0] p-6 flex justify-end gap-6'>
                <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clipPath="url(#clip0_67_1137)">
                            <path d="M16.4521 12.6484V8.84839C16.4521 6.02581 14.6457 3.56453 12.1585 2.64519C12.1876 2.50001 12.2037 2.35165 12.2037 2.20324C12.2037 0.987117 11.2166 0 10.0005 0C8.78437 0 7.79725 0.987117 7.79725 2.20324C7.79725 2.34842 7.81336 2.49354 7.83916 2.63226C6.98435 2.93549 6.19402 3.41612 5.51984 4.06774C4.24888 5.29355 3.54889 6.94193 3.54889 8.70967V12.6484C3.54889 12.7871 3.43598 12.9033 3.29403 12.9033C2.10372 12.9033 1.08756 13.8 0.977883 14.942C0.916579 15.5775 1.1263 16.2097 1.55532 16.6807C1.98111 17.1484 2.59081 17.4194 3.22626 17.4194H7.1166C7.27789 18.8678 8.51017 20.0001 10.0005 20.0001C11.4908 20.0001 12.7231 18.8678 12.8844 17.4194H16.7747C17.4102 17.4194 18.0199 17.1484 18.4457 16.6807C18.8715 16.2097 19.0812 15.5775 19.0231 14.942C18.9134 13.8 17.8941 12.9033 16.7069 12.9033C16.565 12.9032 16.4521 12.7903 16.4521 12.6484ZM10.0005 1.2903C10.5037 1.2903 10.9134 1.69998 10.9134 2.20318C10.9134 2.24509 10.9069 2.28383 10.9004 2.32574C10.6811 2.29347 10.4585 2.2709 10.2359 2.26443C9.85202 2.2515 9.47461 2.27736 9.10043 2.32897C9.09396 2.28706 9.0875 2.24833 9.0875 2.20641C9.08761 1.69998 9.49729 1.2903 10.0005 1.2903ZM10.0005 18.7096C9.22309 18.7096 8.57148 18.1548 8.41983 17.4193H11.5811C11.4296 18.1548 10.7779 18.7096 10.0005 18.7096ZM17.7392 15.0645C17.765 15.342 17.6779 15.6097 17.494 15.8129C17.3037 16.0161 17.0521 16.129 16.7747 16.129H3.22632C2.94889 16.129 2.69731 16.0161 2.51017 15.8129C2.32308 15.6097 2.23597 15.3419 2.26177 15.0645C2.30691 14.5774 2.76179 14.1935 3.29403 14.1935C4.14566 14.1935 4.83919 13.5 4.83919 12.6484V8.70967C4.83919 7.29677 5.40046 5.97743 6.41662 4.99678C7.38757 4.05809 8.65212 3.54837 10.0005 3.54837C10.065 3.54837 10.1263 3.54837 10.1908 3.55161C12.9295 3.64836 15.1618 6.02581 15.1618 8.84839V12.6484C15.1618 13.5 15.8553 14.1935 16.7069 14.1935C17.2392 14.1935 17.6908 14.5774 17.7392 15.0645Z" fill="#65697E"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_67_1137">
                            <rect width="20" height="20" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='size-8 rounded-full	bg-[#AE445A] flex items-center justify-center text-white text-sm font-black'>A</div>
                    <h5 className='text-[#393E59] font-semibold font-sm'>Rahul Admin</h5>
                </div>

            </div>
            <div className='py-5 px-10 w-full'>
                <div className='flex w-full items-center justify-between'>
                    <div className='w-full flex items-center gap-3'>
                        <Link href="/dashboard" className='btn-back'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.21894 7.33327H13.3333V8.6666H5.21894L8.79492 12.2425L7.85212 13.1853L2.66666 7.99993L7.85212 2.81445L8.79492 3.75726L5.21894 7.33327Z" fill="#252322"/>
                            </svg>
                            <h6 className='text-[#252322] font-semibold text-sm'>Back</h6>
                        </Link>
                        <h2 className='text-xl2 font-semibold text-[#17161D]'>{tab ? "My profile" : "Payment Info"}</h2>
                    </div>
                    {tab && <button className='text-base font-black p-3 w-2/12 text-white border bg-[#AE445A] border-solid border-[#AE445A] rounded-lg' onClick={tabHandler}>Add Payment Info</button>}
                </div>
                {tab && <div className='grid grid-cols-2 gap-5 mt-5'>
                    <div>
                        <h6 className='text-[#252322] font-semibold text-sm mb-1'>Name</h6>
                        <input type="text" placeholder='Enter name' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                    </div>
                    <div>
                        <h6 className='text-[#252322] font-semibold text-sm mb-1'>Specialization</h6>
                        <input type="text" placeholder='Enter specialization' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                    </div>
                    <div>
                        <h6 className='text-[#252322] font-semibold text-sm mb-1'>Email</h6>
                        <input type="text" placeholder='Enter email' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                    </div>
                    <div>
                        <h6 className='text-[#252322] font-semibold text-sm mb-1'>Services</h6>
                        <input type="text" placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                    </div>
                    <div>
                        <h6 className='text-[#252322] font-semibold text-sm mb-1'>DOB</h6>
                        <input type="text" placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                    </div>
                    <div>
                        <h6 className='text-[#252322] font-semibold text-sm mb-1'>Charges</h6>
                        <input type="text" placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                    </div>
                    <div>
                        <h6 className='text-[#252322] font-semibold text-sm mb-1'>Bio</h6>
                        <textarea rows="5" placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                    </div>
                    <div>
                        <h6 className='text-[#252322] font-semibold text-sm mb-1'>Education and training</h6>
                        <input type="text" placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                        <h6 className='text-[#252322] font-semibold text-sm mt-4 mb-1'>Experience</h6>
                        <input type="text" placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                    </div>
                </div>}
                {tab && <div className='w-full flex justify-end gap-3 mt-6'>
                    <button className='text-base font-black text-[#AE445A] p-3 border border-solid border-[#AE445A] rounded-lg w-1/12'>Edit</button>
                    <button className='text-base font-black p-3 text-white border bg-[#AE445A] border-solid border-[#AE445A] rounded-lg w-1/12'>Update</button>
                </div>}
                {!tab && <div className='w-1/2 gap-5 mt-5'>
                    <h6 className='text-[#252322] font-semibold text-sm mb-1 mt-5'>Bank Name</h6>
                    <input type="text" placeholder='Enter name' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                
                    <h6 className='text-[#252322] font-semibold text-sm mb-1 mt-5'>Account holder name</h6>
                    <input type="text" placeholder='Enter name' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                
                    <h6 className='text-[#252322] font-semibold text-sm mb-1 mt-5'>Account number</h6>
                    <input type="text" placeholder='Enter email' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                
                    <h6 className='text-[#252322] font-semibold text-sm mb-1 mt-5'>IFSC CODE</h6>
                    <input type="text" placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                   
                    <h6 className='text-[#252322] font-semibold text-sm mb-1 mt-5'>Branch name</h6>
                    <input type="text" placeholder='Enter title' className='bg-white border border-solid border-[#E7E5E4] w-full rounded-lg py-3 px-4'/>    
                
                    <div className='w-full flex justify-end gap-3 mt-6'>
                        <button className='text-base font-black p-3 text-white border bg-[#AE445A] border-solid border-[#AE445A] rounded-lg w-2/12' onClick={tabHandler}>Update</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
