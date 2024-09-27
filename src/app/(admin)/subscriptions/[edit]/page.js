import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/subscriptions">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Add Subscription
        </p>
      </div>
      <form className="flex flex-col gap-5 w-2/5">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Cover Image
          </p>
          <div className="w-[168px] h-[168px] bg-white rounded-xl py-3 px-4 flex justify-center items-center border border-[#E7E5E4] relative">
            <p className="text-[#9C9896] text-sm font-sans font-normal">
              Add Banner
            </p>
            <input type="file" className="inset-0 absolute opacity-0" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
          Subscription Name
          </p>
          <input type="text" className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"/>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
          Type
          </p>
         <select className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4] focus:outline-none text-[#9C9896] font-sans font-normal text-sm">
          <option value="1">Annual</option>
          <option value="2">Monthly</option>
         </select>
        </div>
        <div className="w-1/3">
          <button className="bg-[#AE445A] p-4 rounded-lg border border-[#B7B7B7] w-full text-base font-sans font-bold text-white">Save</button>
        </div>
      </form>
    </div>
  );
}

export default page;