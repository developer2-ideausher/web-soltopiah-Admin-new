"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Frame1 from "../../../../../public/Frame1.png";
import LoginImage from "../../../../../public/LoginImage.png";
import image01 from "../../../../../public/image01.png";
import { useRouter } from "next/navigation";
import { getToken } from "@/Services/Cookie/userCookie";
import LeftBlackarrow from "../../../../../icons/LeftBlackarrow";
import RightBlackArrow from "../../../../../icons/RightBlackArrow";
import { toast } from "react-toastify";

function Page({ params }) {
  const { id } = params;
  const [requestData, setRequestData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    getAllReqDataApi();
  }, []);

  const getAllReqDataApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL + "/quick-reads/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setRequestData(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

//   const handleDecline = (e) => {
//     e.preventDefault();
//     const raw = { status: "declined" };
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + token);
//     myHeaders.append("Content-Type", "application/json");

//     const requestOptions = {
//       method: "PATCH",
//       headers: myHeaders,
//       body: JSON.stringify(raw),
//       redirect: "follow",
//     };

//     fetch(
//       process.env.NEXT_PUBLIC_URL + `/quick-reads/${id}/status`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         toast.error("Request Declined")
//         router.push("/quickreads/quick-reads-requests");
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleApprove = (e) => {
//     e.preventDefault();
//     const raw = { status: "approved" };
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + token);
//     myHeaders.append("Content-Type", "application/json");
//     const requestOptions = {
//       method: "PATCH",
//       headers: myHeaders,
//       body: JSON.stringify(raw),
//       redirect: "follow",
//     };

//     fetch(
//       process.env.NEXT_PUBLIC_URL + `/quick-reads/${id}/status`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         toast.success("Request Accepted")
//         router.push("/quickreads/quick-reads-requests");
//       })
//       .catch((error) => console.error(error));
//   };
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? requestData.pictures.length - 1 : prevIndex - 1
    );
  };
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === requestData.pictures.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/quickreads">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Quick Reads Requests
        </p>
      </div>
      <div className="border border-[#CDCDCD]"></div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        requestData && (
          <div className="flex justify-between w-full  ">
            <form className="flex flex-col w-3/5 gap-5 lg:w-4/5 xl:w-3/5 2xl:w-2/5">
              <div className="flex flex-col gap-2 ">
                <p className="text-sm font-sans font-semibold text-black">
                  Title
                </p>
                <input
                  type="text"
                  value={requestData.title}
                  className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white text-sm font-sans font-normal text-userblack"
                  placeholder="An emotional trigger is"
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="text-sm font-sans font-semibold text-black">
                  Published by
                </p>
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="w-8 h-8 object-cover rounded-full"
                    src={
                      requestData.creatorRole === "Guide"
                        ? requestData.creator?.profilePic
                          ? requestData.creator.profilePic?.url
                          : Frame1.src
                        : LoginImage.src
                    }
                    alt=""
                  />
                  <p className="text-sm font-sans font-normal text-userblack">
                    {requestData.creatorRole == "Guide"
                      ? requestData?.creator?.firstName
                      : "Soltopiah"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-sans font-semibold text-userblack">
                  Slides ({requestData.pictures.length})
                </p>
                <div className="grid grid-cols-3 gap-8">
                  {requestData.pictures?.map((picture) => (
                    <div
                      key={picture._id}
                      className="flex justify-center items-center p-6 bg-[#E5E7F5] border border-[#D3D6EE] rounded-lg max-h-40 overflow-hidden"
                    >
                      <img src={picture.url || image01.src} alt="" />
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="flex flex-row items-center gap-5 mt-3">
                <button
                  onClick={(e) => handleDecline(e)}
                  className="w-full bg-[#EE3E3E] border border-[#EE3E3E] p-3 rounded-lg text-white text-sm font-sans font-normal"
                >
                  Decline
                </button>
                <button
                  onClick={(e) => handleApprove(e)}
                  className="w-full bg-[#08A03C] border border-[#08A03C] p-3 rounded-lg text-white text-sm font-sans font-normal"
                >
                  Approve
                </button>
              </div> */}
            </form>
            <div className="bg-[#F4F5FB] flex  flex-col justify-center mt-20 w-2/5 mr-20 rounded-[32px] relative">
              <div className="flex flex-row justify-between items-center w-full p-8">
                <button
                  onClick={handlePrevImage}
                  className="bg-white rounded-full p-4"
                >
                  <LeftBlackarrow />
                </button>
                <img
                className="max-w-[327px] max-h-[409px] rounded-md"
                  src={
                    requestData.pictures[currentImageIndex]?.url || image01.src
                  }
                  alt=""
                />{" "}
                <button
                  onClick={handleNextImage}
                  className="bg-white rounded-full  p-4"
                >
                  <RightBlackArrow />
                </button>
              </div>
              <div className=" flex justify-center items-center absolute bottom-0 left-0 right-0">
                <p className="bg-white p-3 mt-10 font-normal rounded-md font-sans text-sm ">
                  <span className="font-bold font-sans text-sm">{currentImageIndex + 1}</span>/{requestData.pictures.length}
                </p>{" "}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Page;
