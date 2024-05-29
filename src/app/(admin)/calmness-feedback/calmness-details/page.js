"use client"
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";
import communityImage from "../../../../../public/communityImage.png";
import StarRating from "../../../../../icons/StarRating";
import CalmnessNotif from "../../../../../icons/CalmnessNotif";
import CalmnessChart from '../../../../components/CalmnessChart'
import Recycle from "../../../../../icons/Recycle";

function Page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/calmness-feedback">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Calmness Feedback
        </p>
      </div>
      <div className="bg-white p-5 border border-[#E9E9EC] rounded-xl flex flex-col gap-6">
        <div className="flex flex-row gap-6 p-3 rounded-md bg-[#F8F9FD]">
          <div>
            <img src={communityImage.src} alt="image" />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-row items-center justify-between">
              <p className="text-[#71737F] font-sans font-normal text-sm">
                Course Detail
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[#252322] font-sans font-semibold text-3xl">
                Designed to give you mental peace
              </h2>
              <p className="text-sm font-sans font-semibold text-[#414554]">
                {" "}
                Feb 27, 2024{" "}
                <span className="font-normal">( Mental Health )</span> (1500
                members)
              </p>
              <p className="text-[#4F546B] text-sm font-sans font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas blandit, ipsum id bibendum ultricies, magna felis
                tincidunt ante, a consectetur dolor justo non neque. Morbi
                tristique congue sapien, ac porttitor lorem lobortis sit amet.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Etiam malesuada eros neque, in ultrices
                eros rutrum in. Nulla blandit nibh nulla, id dictum enim
                sagittis in. Quisque a tellus ac erat tincidunt pharetra vel
                eget tortor. Nam facilisis felis vitae libero elementum, id
                scelerisque metus fermentum. Sed dolor sapien, sodales eu ex eu,
                tristique molestie libero. Phasellus feugiat odio nec diam
                tristique vehicula. Suspendisse lacinia sapien eu ante
                efficitur, et sceleri
              </p>
              <p className="text-sm font-sans font-normal text-[#AE445A]">
                View More
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start gap-4">
        <div className="w-3/5 flex flex-col gap-2 bg-white border border-[#F3CFD5] p-3 rounded-md">
          <p className="text-[#71737F] font-sans font-normal text-sm">
            All User Calmness feedbacks
          </p>
          <div className="flex flex-col gap-3">
            <div className="py-5 px-3 flex flex-row justify-between items-center rounded-md border border-[#D3D4DA]">
              <div className="flex flex-row gap-4 items-center">
                <p className="text-userblack font-sans font-semibold text-base">Ricky Fiat</p>

                <div className="flex flex-row gap-1 text-sm font-sans font-semibold text-userblack items-center">
                  <StarRating />
                  4.5
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CalmnessNotif />
                <Recycle />
              </div>
            </div>
            <div className="py-5 px-3 flex flex-row justify-between items-center rounded-md border border-[#D3D4DA]">
              <div className="flex flex-row gap-4 items-center">
                <p className="text-userblack font-sans font-semibold text-base">Ricky Fiat</p>

                <div className="flex flex-row gap-1 text-sm font-sans font-semibold text-userblack items-center">
                  <StarRating />
                  4.5
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CalmnessNotif />
                <Recycle />
              </div>
            </div>
            <div className="py-5 px-3 flex flex-row justify-between items-center rounded-md border border-[#D3D4DA]">
              <div className="flex flex-row gap-4 items-center">
                <p className="text-userblack font-sans font-semibold text-base">Ricky Fiat</p>

                <div className="flex flex-row gap-1 text-sm font-sans font-semibold text-userblack items-center">
                  <StarRating />
                  4.5
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CalmnessNotif />
                <Recycle />
              </div>
            </div>
            <div className="py-5 px-3 flex flex-row justify-between items-center rounded-md border border-[#D3D4DA]">
              <div className="flex flex-row gap-4 items-center">
                <p className="text-userblack font-sans font-semibold text-base">Ricky Fiat</p>

                <div className="flex flex-row gap-1 text-sm font-sans font-semibold text-userblack items-center">
                  <StarRating />
                  4.5
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CalmnessNotif />
                <Recycle />
              </div>
            </div>
            <div className="py-5 px-3 flex flex-row justify-between items-center rounded-md border border-[#D3D4DA]">
              <div className="flex flex-row gap-4 items-center">
                <p className="text-userblack font-sans font-semibold text-base">Ricky Fiat</p>

                <div className="flex flex-row gap-1 text-sm font-sans font-semibold text-userblack items-center">
                  <StarRating />
                  4.5
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CalmnessNotif />
                <Recycle />
              </div>
            </div>
            <div className="py-5 px-3 flex flex-row justify-between items-center rounded-md border border-[#D3D4DA]">
              <div className="flex flex-row gap-4 items-center">
                <p className="text-userblack font-sans font-semibold text-base">Ricky Fiat</p>

                <div className="flex flex-row gap-1 text-sm font-sans font-semibold text-userblack items-center">
                  <StarRating />
                  4.5
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CalmnessNotif />
                <Recycle />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FDF8F9] p-4  border border-[#F3CFD5] rounded-xl">
            <div className="flex flex-row items-center justify-between">
                <p className="atext-userblack font-sans font-bold text-base">Calmness feedback</p>
                <select className="py-2 px-3 rounded-lg border border-[#DCDBE1] focus:outline-none">
                    <option value="1">Weekly</option>
                </select>
            </div>
            <CalmnessChart/>
        </div>
      </div>
    </div>
  );
}

export default Page;
