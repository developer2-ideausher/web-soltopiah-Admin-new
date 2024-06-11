"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useState } from "react";
import communityImage from "../../../../../public/communityImage.png";
import Girl from "../../../../../public/Girl.png";
import RedEdit from "../../../../../icons/RedEdit";
import RedRecycle from "../../../../../icons/RedRecycle";
import RedDown from "../../../../../icons/RedDown";
import GreenThumbsUp from "../../../../../icons/GreenThumbsUp";

function Page() {
  const [setVideos, setShowVideos] = useState(false);
  const handleClick = () => {
    setShowVideos(!setVideos);
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/challenge-module">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Challenge Details page
        </p>
      </div>
      <div className="bg-white p-5 rounded-xl flex flex-col gap-10 border border-[#E9E9EC]">
        <div className="bg-[#F8F9FD] p-3 rounded-md flex flex-row items-start gap-5">
          <img src={communityImage.src} />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-sans font-normal text-[#71737F]">
                Challnege Detail
              </p>
              <p className="py-1 px-4 bg-[#08A03C1A] border border-[#08A03C33] rounded-full text-sm font-semibold font-sans text-[#08A03C]">
                Subscription only
              </p>
            </div>
            <p className="text-3xl font-sans font-semibold text-black">
              14 days meditation challenge
            </p>
            <div>
              <p className="text-sm font-sans font-semibold text-black">
                Feb 27, 2022, 15:30 mins ( Meditation ) (Type)
              </p>
            </div>
            <p className="text-[#4F546B] font-sans text-sm font-normal w-[95%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              blandit, ipsum id bibendum ultricies, magna felis tincidunt ante,
              a consectetur dolor justo non neque. Morbi tristique congue
              sapien, ac porttitor lorem lobortis sit amet. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              curae; Etiam malesuada eros neque, in ultrices eros rutrum in.
              Nulla blandit nibh nulla, id dictum enim sagittis in. Quisque a
              tellus ac erat tincidunt pharetra vel eget tortor. Nam facilisis
              felis vitae libero elementum, id scelerisque metus fermentum. Sed
              dolor sapien, sodales eu ex eu, tristique molestie libero.
              Phasellus feugiat odio nec diam tristique vehicula. Suspendisse
              lacinia sapien eu ante efficitur, et sceleri
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="bg-[#DADDF1] p-1 rounded-full w-1/5 flex flex-row justify-between items-center gap-3">
            <button
              onClick={handleClick}
              className={` ${
                setVideos ? "bg-[#DADDF1]" : "bg-white"
              } rounded-full p-2 w-full`}
            >
              Videos
            </button>
            <button
              onClick={handleClick}
              className={` ${
                setVideos ? "bg-white" : ""
              } rounded-full p-2 w-full`}
            >
              Forum
            </button>
          </div>
          {!setVideos && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-start border border-[#E7E8EA] p-3 rounded-md">
                <div className="flex flex-row items-start gap-3 w-[90%] ">
                  <img src={Girl.src} alt="" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-sans font-normal text-[#AE445A]">
                      DAY 1
                    </p>
                    <p className="text-base font-sans font-semibold text-userblack ">
                      The Basics
                    </p>
                    <p className="gap-1 flex flex-row items-center text-xs font-sans font-medium text-[#3090E9]">
                      2 Videos{" "}
                      <span className="bg-[#3090E9] w-1 h-1 rounded-full"></span>{" "}
                      <span>5-20 min </span>
                    </p>
                    <p className="text-[#6D6D6D] text-sm font-sans font-normal">
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit. Exercitation veniam consequat sunt nostrud
                      amet. Amet minim mollit non deserunt ullamco est sit
                      aliqua dolor do amet sint. Velit officia consequat duis
                      enim velit mollit. Exercitation veniam consequat sunt
                      nostrud amet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <RedEdit />
                  <RedRecycle />
                </div>
              </div>
              <div className="flex flex-row justify-between items-start border border-[#E7E8EA] p-3 rounded-md">
                <div className="flex flex-row items-start gap-3 w-[90%] ">
                  <img src={Girl.src} alt="" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-sans font-normal text-[#AE445A]">
                      DAY 1
                    </p>
                    <p className="text-base font-sans font-semibold text-userblack ">
                      The Basics
                    </p>
                    <p className="gap-1 flex flex-row items-center text-xs font-sans font-medium text-[#3090E9]">
                      2 Videos
                      <span className="bg-[#3090E9] w-1 h-1 rounded-full"></span>
                      <span>5-20 min </span>
                    </p>
                    <p className="text-[#6D6D6D] text-sm font-sans font-normal">
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit. Exercitation veniam consequat sunt nostrud
                      amet. Amet minim mollit non deserunt ullamco est sit
                      aliqua dolor do amet sint. Velit officia consequat duis
                      enim velit mollit. Exercitation veniam consequat sunt
                      nostrud amet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <RedEdit />
                  <RedRecycle />
                </div>
              </div>
            </div>
          )}
          {setVideos && (
            <div className="flex flex-col gap-3">
              <form className="flex flex-col gap-2">
                <p className="text-sm font-sans font-semibold text-[#71737F]">
                  Add Day 5 Thread
                </p>
                <textarea
                  className="py-3 px-4 border border-[#E7E5E4] rounded-xl text-sm font-sans font-normal text-black"
                  placeholder="Ex . 12 sessions completed"
                ></textarea>
                <button className="p-4 rounded-lg bg-[#AE445A] w-2/12  text-base font-sans font-black text-white">
                  Save
                </button>
              </form>
              <div className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-xl2 font-sans font-semibold text-userblack">
                      Soltopiah
                    </p>
                    <p className="text-xs font-sans font-semibold text-[#888A94]">
                      Day 4
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <RedEdit />
                    <RedRecycle />
                  </div>
                </div>
                <p className="text-base font-sans font-semibold text-userblack">
                  Exited for day four?
                </p>
                <div className="flex flex-row items-center gap-3">
                  <p className="text-[#3090E9] text-sm font-sans font-semibold uppercase">
                    Reply
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    <p className="text-sm font-sans font-semibold text-[#AE445A]">
                      12 replies
                    </p>
                    <RedDown />
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <p className="text-xs font-sans font-normal text-[#08A03C]">
                      32 likes
                    </p>
                    <GreenThumbsUp />
                  </div>
                </div>
              </div>
              <div className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-xl2 font-sans font-semibold text-userblack">
                      Soltopiah
                    </p>
                    <p className="text-xs font-sans font-semibold text-[#888A94]">
                      Day 3
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <RedEdit />
                    <RedRecycle />
                  </div>
                </div>
                <p className="text-base font-sans font-semibold text-userblack">
                  How was it? making a change!
                </p>
                <div className="flex flex-row items-center gap-3">
                  <p className="text-[#3090E9] text-sm font-sans font-semibold uppercase">
                    Reply
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    <p className="text-sm font-sans font-semibold text-[#AE445A]">
                      12 replies
                    </p>
                    <RedDown />
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <p className="text-xs font-sans font-normal text-[#08A03C]">
                      32 likes
                    </p>
                    <GreenThumbsUp />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
