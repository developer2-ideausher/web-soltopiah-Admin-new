"use client";
import BackButton from "@/components/BackButton";
import Dropdown from "@/components/Dropdown";
import ImageUploader from "@/components/ImageUploader";
import Link from "next/link";
import React, { useState } from "react";
import BluePlus from "../../../../../icons/BluePlus";

function Page() {
  const [file,setFile]=useState(true)
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/content-manage">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Create Content
        </p>
      </div>
      <div className="w-2/5">
        <div className="grid grid-cols-2 p-1 bg-[#DADDF1] rounded-[80px] mt-12">
          <h6 onClick={()=>setFile(true)} className={`text-sm p-2 text-center rounded-[80px] cursor-pointer font-semibold font-sans text-black ${file==true?"bg-white":"bg-transparent"}  `}>
            Course
          </h6>
          <h6  onClick={()=>setFile(false)} className={`text-sm p-2 text-center rounded-[80px] cursor-pointer font-semibold font-sans text-black ${file==!true?"bg-white":"bg-transparent"}  `}>
            Single
          </h6>
        </div>
        <h6 className="text-[#252322] font-semibold mt-5 text-sm mb-1">
          Thumbnail
        </h6>
        <ImageUploader />
        <h6 className="text-[#252322] font-semibold mt-5 text-sm mb-1">
          Title
        </h6>
        <input
          type="text"
          placeholder="Enter title"
          className="bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4"
        />
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <h6 className="text-[#252322] font-semibold text-sm mb-1">
              Category
            </h6>
            <Dropdown placeholder="Select" />
          </div>
          <div>
            <h6 className="text-[#252322] font-semibold text-sm mb-1">Type</h6>
            <input
              type="text"
              placeholder="Ex. Blog"
              className="bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4"
            />
          </div>
        </div>
        <h6 className="text-[#252322] font-semibold mt-5 text-sm">
          Accessibility
        </h6>
        <div className="grid grid-cols-2 gap-5 mt-1">
          <label
            htmlFor="free"
            className="bg-white cursor-pointer flex items-center justify-between border-solid border-2 border-[#E7E5E4] rounded-xl px-4 py-3"
          >
            <h6 className="font-semibold text-sm">Free</h6>
            <input type="radio" id="free" name="Accessibility" value="free" />
          </label>
          <label
            htmlFor="premium"
            className="bg-white cursor-pointer flex items-center justify-between border-2 border-solid border-[#E7E5E4] rounded-xl px-4 py-3"
          >
            <h6 className="font-semibold text-sm">Premium</h6>
            <input className=""
              type="radio"
              id="premium"
              name="Accessibility"
              value="premium"
            />
          </label>
        </div>
        <h6 className="text-[#252322] font-semibold mt-5 text-sm mb-1">
          Description
        </h6>
        <textarea
          rows="4"
          placeholder="Enter title"
          className="bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4 resize-none"
        />
        <h6 className="text-[#252322] font-semibold mt-5 text-sm mb-1">
          Add content to course
        </h6>
        <div className="w-full bg-white rounded-xl p-5">
          <div className="flex flex-wrap justify-center py-16">
            <h3 className="text-[24px] text-[#252322] font-semibold w-full text-center">
              No content
            </h3>
            <h6 className="text-xs font-normal text-[#25232270] w-full text-center">
              Please add audio or videos singles to your courses
            </h6>
            <div className="bg-[#3090E920] cursor-pointer mt-5 rounded-3xl px-3 py-2 flex items-center gap-2">
              <BluePlus/>
              <h5 className="text-[#3090E9] text-sm font-normal">Add content</h5>
            </div>
          </div>
        </div>
        
        {/* <AudioVideoUploader /> */}
        <button className="p-4 text-white font-black mt-5 bg-[#AE445A] rounded-xl w-3/12 flex justify-center">
          Save
        </button>
      </div>
    </div>
  );
}

export default Page;
