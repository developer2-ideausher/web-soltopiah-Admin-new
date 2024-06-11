"use client"
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useState } from "react";
import BlueAdd from "../../../../../icons/BlueAdd";
import Modal from "@/components/Modal";
import AddContentModal from "@/components/AddContentModal";
import { useRouter } from "next/navigation";

function Page() {
  const [showModal,setShowModal]=useState(false)
  const router = useRouter();
  const handleModal=()=>{
    setShowModal(!showModal)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    router.push("/challenge-module")
  }
  return (

    <div>
      {showModal && <Modal>
        <AddContentModal onclose={handleModal}/>
        </Modal>}
    
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/challenge-module/create-challenge">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Create challenge
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/3">
        <p className="text-userblack text-3xl font-semibold font-sans">
          2. Add Content
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Day 1
          </p>
          <div onClick={handleModal} className="bg-white py-20 px-12 rounded-xl flex flex-col justify-center items-center gap-5 relative">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-sans font-semibold text-userblack">No content</p>
              <p className="text-[#25232270] text-sm font-sans font-normal">Please add audio or videos singles to your challenges</p>
            </div>
            {/* <input type="file" className="opacity-0 inset-0 absolute cursor-pointer"/> */}
            <button className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full"><BlueAdd/><p className="text-[#3090E9] text-sm font-sans font-semibold">Add content</p></button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Day 2 
          </p>
          <div onClick={handleModal} className="bg-white py-20 px-12 rounded-xl flex flex-col justify-center items-center gap-5 relative">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-sans font-semibold text-userblack">No content</p>
              <p className="text-[#25232270] text-sm font-sans font-normal">Please add audio or videos singles to your challenges</p>
            </div>
            {/* <input type="file" className="opacity-0 inset-0 absolute cursor-pointer"/> */}
            <button className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full"><BlueAdd/><p className="text-[#3090E9] text-sm font-sans font-semibold">Add content</p></button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Day 3
          </p>
          <div onClick={handleModal} className="bg-white py-20 px-12 rounded-xl flex flex-col justify-center items-center gap-5 relative">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-sans font-semibold text-userblack">No content</p>
              <p className="text-[#25232270] text-sm font-sans font-normal">Please add audio or videos singles to your challenges</p>
            </div>
            {/* <input type="file" className="opacity-0 inset-0 absolute cursor-pointer"/> */}
            <button className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full"><BlueAdd/><p className="text-[#3090E9] text-sm font-sans font-semibold">Add content</p></button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Day 4
          </p>
          <div onClick={handleModal} className="bg-white py-20 px-12 rounded-xl flex flex-col justify-center items-center gap-5 relative">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-sans font-semibold text-userblack">No content</p>
              <p className="text-[#25232270] text-sm font-sans font-normal">Please add audio or videos singles to your challenges</p>
            </div>
            {/* <input type="file" className="opacity-0 inset-0 absolute cursor-pointer"/> */}
            <button className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full"><BlueAdd/><p className="text-[#3090E9] text-sm font-sans font-semibold">Add content</p></button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Day 5
          </p>
          <div onClick={handleModal} className="bg-white py-20 px-12 rounded-xl flex flex-col justify-center items-center gap-5 relative">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-sans font-semibold text-userblack">No content</p>
              <p className="text-[#25232270] text-sm font-sans font-normal">Please add audio or videos singles to your challenges</p>
            </div>
            {/* <input type="file" className="opacity-0 inset-0 absolute cursor-pointer"/> */}
            <button className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full"><BlueAdd/><p className="text-[#3090E9] text-sm font-sans font-semibold">Add content</p></button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Day 6
          </p>
          <div onClick={handleModal} className="bg-white py-20 px-12 rounded-xl flex flex-col justify-center items-center gap-5 relative">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-sans font-semibold text-userblack">No content</p>
              <p className="text-[#25232270] text-sm font-sans font-normal">Please add audio or videos singles to your challenges</p>
            </div>
            {/* <input type="file" className="opacity-0 inset-0 absolute cursor-pointer"/> */}
            <button className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full"><BlueAdd/><p className="text-[#3090E9] text-sm font-sans font-semibold">Add content</p></button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-sans font-semibold text-userblack">
            Day 7
          </p>
          <div onClick={handleModal} className="bg-white py-20 px-12 rounded-xl flex flex-col justify-center items-center gap-5 relative">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-sans font-semibold text-userblack">No content</p>
              <p className="text-[#25232270] text-sm font-sans font-normal">Please add audio or videos singles to your challenges</p>
            </div>
            {/* <input type="file" className="opacity-0 inset-0 absolute cursor-pointer"/> */}
            <button className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full"><BlueAdd/><p className="text-[#3090E9] text-sm font-sans font-semibold">Add content</p></button>
          </div>
        </div>
        <button type="submit" className="p-4 w-2/5 mt-5 bg-[#AE445A] text-white rounded-lg font-sans text-base font-black">Save & Finish</button>
      </form>
    
    </div>
    </div>
  );
}

export default Page;
