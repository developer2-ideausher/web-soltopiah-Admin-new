import Link from 'next/link'
import React from 'react'
import BackButton from '@/components/BackButton'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import Profile2 from '../../../../../public/Profile2.png'

function page() {
  return (
    <div className="flex flex-col gap-7">
     <div className="flex flex-row gap-5 items-center">
        <Link href="/quickreads">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
        Quick reads
         
        </p>
      </div>
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-quickReadsRequestTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
              Title
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Published by
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Date
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
              Category
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Time
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Slides
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full">
           <Link href="/quickreads/quick-reads-request"> <div className=" grid grid-cols-quickReadsRequestTable justify-between border-b border-[#E9E9EC] items-center p-4">
            <span className="text-userblack  font-sans font-semibold text-base">
              14 days meditation challenge
              </span>
              <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                <img src={Profile2.src} alt="" />
                <p>Wade Warren</p>
              </div>
              
              <span className="text-userblack font-sans font-semibold text-base">
              Mon, Feb 16, 24
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              Mental Health
              </span>

              <div className="text-userblack  font-sans font-semibold text-base">3:30 PM</div>
              <div className="text-userblack  font-sans font-semibold text-base">3</div>
            </div></Link>
            <div className=" grid grid-cols-quickReadsRequestTable justify-between border-b border-[#E9E9EC] items-center p-4">
            <span className="text-userblack  font-sans font-semibold text-base">
              14 days meditation challenge
              </span>
              <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                <img src={Profile2.src} alt="" />
                <p>Wade Warren</p>
              </div>
              
              <span className="text-userblack font-sans font-semibold text-base">
              Mon, Feb 16, 24
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              Mental Health
              </span>

              <div className="text-userblack  font-sans font-semibold text-base">3:30 PM</div>
              <div className="text-userblack  font-sans font-semibold text-base">3</div>
            </div>
            <div className=" grid grid-cols-quickReadsRequestTable justify-between border-b border-[#E9E9EC] items-center p-4">
            <span className="text-userblack  font-sans font-semibold text-base">
              14 days meditation challenge
              </span>
              <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                <img src={Profile2.src} alt="" />
                <p>Wade Warren</p>
              </div>
              
              <span className="text-userblack font-sans font-semibold text-base">
              Mon, Feb 16, 24
              </span>
              <span className="text-userblack font-sans font-semibold text-base">
              Mental Health
              </span>

              <div className="text-userblack  font-sans font-semibold text-base">3:30 PM</div>
              <div className="text-userblack  font-sans font-semibold text-base">3</div>
            </div>
            
            
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  )
}

export default page
