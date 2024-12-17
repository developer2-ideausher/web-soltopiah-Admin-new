"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import communityImage from "../../../../../public/communityImage.png";
import Girl from "../../../../../public/Girl.png";
import RedEdit from "../../../../../icons/RedEdit";
import RedRecycle from "../../../../../icons/RedRecycle";
import RedDown from "../../../../../icons/RedDown";
import GreenThumbsUp from "../../../../../icons/GreenThumbsUp";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import RightBlackArrow from "../../../../../icons/RightBlackArrow";
import {
  getChallengeForumPosts,
  getOnceChallengeApi,
} from "@/Services/Api/Challenge/challenge";
import { useRouter, useSearchParams } from "next/navigation";
import { truncateDescription, truncateName } from "@/Utilities/helper";

function Page({ params }) {
  const [challengeData, setChallengeData] = useState(null);
  // const [postData, setPostData] = useState([]);
  // const [postContent, setPostContent] = useState("");
  // const searchParams = useSearchParams();
  // const [repliesVisibility, setRepliesVisibility] = useState({});
  // const reqId = searchParams.get("requestID");
  const [setVideos, setShowVideos] = useState(false);

  const router = useRouter();
  const { chdetails } = params;
  const searchParams = useSearchParams();
  const token = getToken();

  // const createChallengePost = (content) => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + token);
  //   const formdata = new FormData();
  //   formdata.append("content", content);
  //   // formdata.append("media", fileInput.files[0], "[PROXY]");

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,

  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     process.env.NEXT_PUBLIC_URL + "/challenges/" + chdetails + "/posts",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       getChallengesPost();
  //       setPostContent("");
  //     })
  //     .catch((error) => console.error(error));
  // };
  // const getChallengesPost = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + token);
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,

  //     redirect: "follow",
  //   };

  //   fetch(
  //     process.env.NEXT_PUBLIC_URL + "/challenges/" + chdetails + "/posts",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result.data.results);
  //       // console.log("data after sorting")
  //       const sorted = result.data.results.sort((a, b) =>
  //         a.createdAt.localeCompare(b.createdAt)
  //       );
  //       // console.log(sorted)
  //       setPostData(sorted);
  //     })
  //     .catch((error) => console.error(error));
  // };

  const fetchData = async () => {
    const result = await getOnceChallengeApi(chdetails);
    if (result.status) {
      console.log(result.data);
      setChallengeData(result.data);
    } else {
      console.log(result.message);
    }
  };
  // const getOnceChallengeApi = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + token);
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,

  //     redirect: "follow",
  //   };

  //   fetch(
  //     process.env.NEXT_PUBLIC_URL + "/challenges/" + chdetails,
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result.data);
  //       setChallengeData(result.data);
  //     })
  //     .catch((error) => console.error(error));
  // };
  useEffect(() => {
    fetchData();
    const tab = searchParams.get("tab");
    if (tab === "forum") {
      setShowVideos(true); // Show forum by default
    } else {
      setShowVideos(false); // Default to videos or as per your logic
    }
  }, [chdetails, searchParams]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <BackButton />
        </div>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Challenge Details page
        </p>
      </div>
      {challengeData && (
        <div className="bg-white p-5 rounded-xl flex flex-col gap-10 border border-[#E9E9EC]">
          <div className="bg-[#F8F9FD] p-3 rounded-md flex flex-row items-start gap-5">
            <img
              className="w-24 h-24 object-cover rounded-lg"
              src={
                challengeData.thumbnail
                  ? challengeData.thumbnail.url
                  : communityImage.src
              }
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-row items-center justify-between">
                {/* <p className="text-sm font-sans font-normal text-[#71737F]">
                  Challenge Detail
                </p> */}
                <div>
                  {" "}
                  <p className="text-3xl font-sans font-semibold text-black">
                    {truncateName(challengeData.title)}
                  </p>
                  <div>
                    <p className="text-sm font-sans font-semibold text-black">
                      {dayjs(challengeData.startDate).format("MMM DD,YYYY")}
                      {/* + { Meditation }+ {Type} */}
                    </p>
                  </div>
                  <p className="text-[#4F546B] font-sans text-sm font-normal w-[95%]">
                    {truncateDescription(challengeData.description)}
                  </p>
                </div>
                <p className="py-1 px-4 bg-[#08A03C1A] border border-[#08A03C33] rounded-full text-sm font-semibold font-sans text-[#08A03C]">
                  {challengeData.accessibility === "free"
                    ? "Free"
                    : "Subscription Only"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="bg-[#DADDF1] p-2 rounded-full w-1/5 flex flex-row justify-between items-center gap-3">
              <button
                onClick={() => setShowVideos(false)}
                className={` ${
                  setVideos ? "bg-[#DADDF1]" : "bg-white"
                } rounded-full p-2 w-full`}
              >
                Videos
              </button>
              <button
                onClick={() => setShowVideos(true)}
                className={` ${
                  setVideos ? "bg-white" : ""
                } rounded-full p-2 w-full`}
              >
                Forum
              </button>
            </div>
            {!setVideos && (
              <div className="flex flex-col gap-3 max-h-96 overflow-y-scroll">
                {challengeData.chapters.map((chapter, index) => (
                  <div
                    key={chapter._id}
                    className="flex flex-row justify-between items-start border border-[#E7E8EA] p-3 rounded-md"
                  >
                    <div className="flex flex-row items-start gap-3 w-[90%] ">
                      <img
                        className="w-20 h-20 object-cover rounded-lg"
                        src={chapter.thumbnail?.url}
                        alt=""
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-sans font-normal text-[#AE445A]">
                          Chapter {index + 1}
                        </p>
                        <p className="text-base font-sans font-semibold text-userblack ">
                          {truncateName(chapter.title)}
                        </p>
                        <p className="gap-1 flex flex-row items-center text-xs font-sans font-medium text-[#3090E9]">
                          {chapter.type.charAt(0).toUpperCase() +
                            chapter.type.slice(1)}{" "}
                          <span className="bg-[#3090E9] w-1 h-1 rounded-full"></span>{" "}
                          <span>{chapter.durationInMinutes} min </span>
                        </p>
                        <p className="text-[#6D6D6D] text-sm font-sans font-normal">
                          {truncateDescription(chapter.description) ||
                            "No description provided."}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex flex-row items-center gap-3">
                      <RedEdit />
                      <RedRecycle />
                    </div> */}
                  </div>
                ))}
              </div>
            )}

            {setVideos && (
              <div className="flex flex-col gap-3">
                {Array.from(
                  { length: challengeData?.durationInDays },
                  (_, index) => (
                    <Link
                      key={index}
                      href={{
                        pathname: `/challenge-module/${chdetails}/forum`,
                        query: { day: index + 1 },
                      }}
                      className="flex justify-between items-center border border-[#D7A1AC] py-2 px-4 bg-[#FDF8F9] rounded-lg"
                    >
                      <div>
                        <p className="font-sans font-semibold text-xs text-[#AE445A]">
                          Day {index + 1}
                        </p>
                        <p className="text-[#3090E9] font-sans font-medium text-xs mt-3">
                          {dayjs(challengeData?.startDate)
                            .add(index, "day")
                            .format("DD/MM/YYYY")}
                        </p>
                      </div>
                      <RightBlackArrow />
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
