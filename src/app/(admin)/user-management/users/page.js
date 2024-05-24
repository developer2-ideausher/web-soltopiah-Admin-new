import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";
import Profile2 from "../../../../../public/Profile2.png";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import GuideCards from "@/components/GuideCards";

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/user-management">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">Users</p>
      </div>
      <div className="flex flex-col gap-5">
        <UserDetailsBox/>
        <div className="bg-white  p-5 rounded-xl border flex flex-col gap-10 border-[#E9E9EC]">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-sans font-semibold text-userblack">
              Soul module data
            </p>
            <div className="grid  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
              <Link href="/user-management/participated-challenges"><GuideCards Title="Participated challenges" /></Link>
              <Link href="/user-management/community-participated"><GuideCards Title="Community participation" /></Link>
              <Link href="/user-management/community-created"><GuideCards Title="Communities created"/></Link>
              <Link href="/user-management/challenges-created"><GuideCards Title="Challenges created" /></Link>
              <Link href="/user-management/friends"><GuideCards Title="Friends" /></Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-20">
            <p className="text-xl font-sans font-semibold text-userblack">
              Mindful hub data
            </p>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
              <GuideCards Title="15 Video Watched" />
              <GuideCards Title="12 Audio Listened" />
              <GuideCards Title="Course" />
              <Link href="/user-management/user-guide-bookings"><GuideCards Title="Guide bookings" /></Link>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
