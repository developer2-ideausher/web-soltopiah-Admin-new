"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Profile2 from "../../../../../public/Profile2.png";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import GuideCards from "@/components/GuideCards";
import { getSubsData, getUserInfo } from "@/Services/Api/UserManagement/user";
import LoaderLarge from "@/components/LoaderLarge";

function Page({ params }) {
  const [data, setData] = useState(null);
  const [subsdata, setSubsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { users } = params;
  const fetchData = async () => {
    setLoading(true);
    const result = await getUserInfo(users);
    if (result.status) {
      console.log(result.data);
      setData(result.data);
      setLoading(false);
      // testing

      //asdfghjk
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  const fetchSubsData = async () => {
    setLoading(true);
    const result = await getSubsData(users);
    if (result.status) {
      console.log(result.data);
      setSubsData(result.data);
      setLoading(false);
      // testing

      //asdfghjk
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    fetchSubsData()
  }, []);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/user-management">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">Users</p>
      </div>
      {loading && (
        <div className="flex justify-center bg-white items-center p-10 w-full ">
          <LoaderLarge />
        </div>
      )}
      <div className="flex flex-col gap-5">
        {data && <UserDetailsBox user={data} sData={subsdata} />}
        <div className="bg-white  p-5 rounded-xl border flex flex-col gap-10 border-[#E9E9EC]">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-sans font-semibold text-userblack">
              Soul module data
            </p>
            <div className="grid  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
              <Link href={`/user-management/${data?._id}/participated`}>
                <GuideCards Title="Participated challenges" />
              </Link>
              <Link
                href={`/user-management/${data?._id}/community-participated/`}
              >
                <GuideCards Title="Community participation" />
              </Link>
              <Link href={`/user-management/${data?._id}/community-created`}>
                <GuideCards Title="Communities created" />
              </Link>
              <Link href={`/user-management/${data?._id}/challenges-created`}>
                <GuideCards Title="Challenges created" />
              </Link>
              <Link href={`/user-management/${data?._id}/friends`}>
                <GuideCards Title="Friends" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-20">
            <p className="text-xl font-sans font-semibold text-userblack">
              Mindful hub data
            </p>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
              <Link href={`/user-management/${data?._id}/videos-watched`}>
                <GuideCards Title="Video Watched" />
              </Link>
              <Link href={`/user-management/${data?._id}/audio-listened`}>
                <GuideCards Title="Audio Listened" />
              </Link>
              <Link href={`/user-management/${data?._id}/courses`}><GuideCards Title="Course" /></Link>
              <Link href={`/user-management/${data?._id}/user-guide-bookings`}>
                <GuideCards Title="Guide bookings" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
