"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LiveSessionImage from "../../../../../../public/LiveSessionImage.png";
import Frame1 from "../../../../../../public/Frame1.png";
import { useRouter } from "next/navigation";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import Modal from "@/components/Modal";
import DeclineModal from "@/components/DeclineModal";

dayjs.extend(utc);

function Page({ params }) {
  const [requestData, setRequestData] = useState(null);
  const [modal, setModal] = useState(false);
  const { view } = params;

  const router = useRouter();

  useEffect(() => {
    getAllReqApi();
  }, []);
  const token = getToken();
  const getAllReqApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/live-events/" + view, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setRequestData(result.data);
      })
      .catch((error) => console.error(error));
  };
  const handleApprove = () => {
    const raw = { status: "approved" };
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,

      body: JSON.stringify(raw),
      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL + `/live-events/${view}/status`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        router.push("/live-manage/live-requests");
      })
      .catch((error) => console.error(error));
  };
  const handleDecline = (rejectionReason) => {
    const raw = { status: "declined", rejectionReason };
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,

      body: JSON.stringify(raw),
      redirect: "follow",
    };

    fetch(
      process.env.NEXT_PUBLIC_URL + `/live-events/${view}/status`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        router.push("/live-manage/live-requests");
        toast.success("Request Declined");
      })
      .catch((error) => console.error(error));
  };
  const showModal = () => {
    setModal(!modal);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {modal && (
        <Modal>
          <DeclineModal
            onclose={showModal}
            onSubmitClick={(reason) => handleDecline(reason)}
          />{" "}
        </Modal>
      )}
      <div className="flex flex-col gap-7">
        <div className="flex flex-row items-center gap-5">
          <Link href="/live-manage/live-requests">
            <BackButton />
          </Link>
          <p className="text-userblack font-semibold text-xl2 font-sans">
            View live session
          </p>
        </div>
        {requestData && (
          <div className="flex flex-col gap-5">
            <img
              src={
                requestData.banner
                  ? requestData.banner.url
                  : LiveSessionImage.src
              }
              alt=""
              className="w-[690px] h-[400px] rounded-md "
            />
            <div className="flex flex-col gap-5 w-4/5">
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Title
                </p>
                <p className="text-xl text-[#414554] font-normal font-sans">
                  {requestData.title}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Description
                </p>
                <p className="text-xl text-[#414554] font-normal font-sans">
                  {requestData.description}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Date
                </p>
                <p className="text-xl text-[#414554] font-normal font-sans">
                  {dayjs(requestData.startDate).format("ddd MMM DD,YY")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Time
                </p>
                <p className="text-xl text-[#414554] font-normal font-sans">
                  {dayjs(requestData.startDate).utc().format("hh:mm A")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Hosted by
                </p>
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="h-8 w-8 object-cover rounded-full"
                    src={
                      requestData.guide && requestData.guide.profilePic
                        ? requestData.guide.profilePic.url
                        : Frame1.src
                    }
                    alt=""
                  />
                  <p className="text-xl text-userblack font-semibold font-sans">
                    <p>
                      {requestData.guide === null
                        ? "Removed Guide"
                        : (requestData.guide.firstName
                            ? requestData.guide.firstName
                            : requestData.guide._id.slice(-4)) +
                          " " +
                          (requestData.guide.lastName
                            ? requestData.guide.lastName
                            : "")}
                    </p>
                  </p>
                </div>
              </div>
              <div className="w-3/5 gap-3 flex flex-row justify-between items-center">
                <button
                  onClick={() => showModal()}
                  className="bg-[#EE3E3E] p-3 rounded-md w-full border border-[#EE3E3E] text-base font-sans font-normal text-white"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleApprove()}
                  className="bg-[#08A03C] p-3 rounded-md w-full border border-[#08A03C] text-base font-sans font-normal text-white"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
