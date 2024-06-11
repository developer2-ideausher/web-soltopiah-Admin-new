"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";
import UploadImage from "../../../../../icons/UploadImage";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/challenge-module/add-content");
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/challenge-module">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Create challenge
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/3">
        <p className="text-userblack text-3xl font-semibold font-sans">
          1. Create Challenge
        </p>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            Challenge cover
          </p>
          <div className="border border-[#D3D6EE] bg-[#E5E7F5] rounded-lg p-4 flex justify-center items-center flex-col gap-3 relative ">
            <UploadImage />
            <p className="text-sm font-sans font-normal text-[#9C9896]">
              Drag and drop image(PNG,JPG or JPEG) or
            </p>
            <p className="text-sm font-sans font-semibold text-[#4655B9]">
              Choose file
            </p>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            Title
          </p>
          <input
            type="text"
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
            placeholder="Enter title"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            Category
          </p>
          <input
            type="text"
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
            placeholder="Enter category"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            Start date
          </p>
          <input
            type="text"
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
            placeholder="Enter Start date"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            End date
          </p>
          <input
            type="text"
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
            placeholder="Enter End date"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            Access
          </p>
          <div className="flex flex-row justify-between items-center gap-3">
            <button className="py-3 px-4 bg-white border border-[#E7E5E4] w-full rounded-xl text-sm font-sans font-semibold text-userblack ">
              Free
            </button>
            <button className="py-3 px-4 bg-white border border-[#E7E5E4] w-full rounded-xl text-sm font-sans font-semibold text-userblack ">
              Premium
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            No. of Days
          </p>
          <input
            type="text"
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
            placeholder="Enter No. of Days"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-sans font-semibold text-userblack">
            Description
          </p>
          <textarea
            type="text"
            className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
            placeholder="Enter Description"
          />
        </div>
        <button
          type="submit"
          className="p-4 rounded-lg bg-[#AE445A] w-2/5 mt-8 text-base font-sans font-black text-white"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default Page;
