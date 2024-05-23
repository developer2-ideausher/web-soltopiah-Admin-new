import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";
import LiveSessionImage from '../../../../../../public/LiveSessionImage.png'
import Profile2 from '../../../../../../public/Profile2.png'

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-5">
        <Link href="/live-manage/live-requests">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          View live session
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <img src={LiveSessionImage.src} alt="" className="w-[690px] "/>
        <div className="flex flex-col gap-5 w-4/5" >
            <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">Title</p>
                <p className="text-xl text-[#414554] font-normal font-sans">Sunday Reset</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">Description</p>
                <p className="text-xl text-[#414554] font-normal font-sans">Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">Date</p>
                <p className="text-xl text-[#414554] font-normal font-sans">Feb 27, 2022</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">Time</p>
                <p className="text-xl text-[#414554] font-normal font-sans">9:30 AM</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">Hosted by</p>
                <div className="flex flex-row items-center gap-2">
                    <img src={Profile2.src} alt=""/>
                <p className="text-xl text-userblack font-semibold font-sans">Albert Flores</p>
                </div>
                
            </div>
            <div className="w-3/5 gap-3 flex flex-row justify-between items-center">
                <button className="bg-[#EE3E3E] p-3 rounded-md w-full border border-[#EE3E3E] text-base font-sans font-normal text-white">Decline</button>
                <button className="bg-[#08A03C] p-3 rounded-md w-full border border-[#08A03C] text-base font-sans font-normal text-white">Approve</button>
                
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default page;
