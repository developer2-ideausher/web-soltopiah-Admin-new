"use client";
import BackButton from "@/components/BackButton";
import Modal from "@/components/Modal";
import RejectGuideModal from "@/components/RejectGuideModal";
import { getApprovalGuideById } from "@/Services/Api/Guide/GuideApi";
import { Download, Eye, Mail, PhoneCall } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LeftBlackarrow from "../../../../../../icons/LeftBlackarrow";
import LoaderLarge from "@/components/LoaderLarge";
import dayjs from "dayjs";

const Page = () => {
  const params = useParams();
  const id = params.view;
  const [loading, setLoading] = useState(false);
  const [eduData, setEduData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [guideData, setGuideData] = useState(null);
  const [purpose, setPurpose] = useState("");
  const router = useRouter();
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getApprovalGuideById(id);
      if (result.data) {
        setGuideData(result.data);
        setEduData(result.data?.qualifications);
      }
    } catch (error) {
      toast.error(error.message || "Error occured, please try again");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between gap-5">
        <div className="flex flex-row items-center gap-5 w-4/5">
          <button
            className="flex flex-row items-center gap-1 py-[6px] px-3 rounded-[45px] border border-[#A0A2A9] cursor-pointer"
            onClick={() => router.back()}
          >
            <LeftBlackarrow />
            <p className="text-sm font-sans font-semibold text-[#252322]">
              Back
            </p>
          </button>

          <p className="text-[#17161D] font-semibold text-xl font-sans">
            Approval Request
          </p>
        </div>
        {guideData?.onboarding?.status === "rejected" ? (
          ""
        ) : (
          <div className="flex flex-row items-center gap-5 w-1/5">
            <button
              type="button"
              onClick={() => {
                setPurpose(true);
                setShowModal(true);
              }}
              className="bg-[#AE445A] py-3 px-5 rounded-lg text-white font-semibold text-base w-full  transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              Approve
            </button>
            <button
              onClick={() => {
                setPurpose(false);
                setShowModal(true);
              }}
              type="button"
              className="bg-[#F7ECEE] py-3 px-5 rounded-lg text-[#AE445A] font-semibold text-base  w-full border border-[#AE445A]  transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              Reject
            </button>
          </div>
        )}
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <LoaderLarge />
        </div>
      )}
      {!loading && guideData && (
        <div className="flex flex-col items-start gap-8 w-full">
          <div className="w-2/5 flex flex-col gap-2 border border-[#CE8F9C] rounded-lg bg-[#FFFFFF] p-4 hover:shadow">
            <div className="flex flex-row items-start gap-2">
              <img
                src={guideData?.profilePic?.url}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-[#17161D]">
                  {guideData?.firstName ?? "--"} {guideData?.lastName ?? "--"}
                </p>
                <p
                  title={guideData?.specializedCategories
                    ?.map((item) => item.title)
                    .join(", ")}
                  className="text-sm font-normal text-[#AE445A] truncate w-[300px]"
                >
                  {guideData?.specializedCategories
                    ?.map((item) => item.title)
                    .join(", ")}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span>
                <PhoneCall color="gray" size={16} />
              </span>
              <p className="text-[#71737F] font-normal text-sm">
                {"+ " + guideData?.phone ?? "--"}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span>
                <Mail color="gray" size={16} />
              </span>
              <p className="text-[#71737F] font-normal text-sm">
                {guideData?.email ?? "--"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start w-2/5">
            <p className="text-xl font-semibold text-[#17161D]">Bio</p>
            <p className="border bg-[#F8F9FD] w-full px-4 py-3 rounded-lg text-[#13171EB2] font-normal hover:shadow-lg">
              {guideData?.bio ?? "--"}
            </p>
          </div>
          {(guideData?.onboarding?.status === "rejected" ||
            guideData?.onboarding?.status === "re-verify") && (
              <div className="flex flex-col gap-2 items-start w-2/5">
                <p className="text-xl font-semibold text-[#17161D]">
                  Rejection History
                </p>
                <div className="border bg-[#F8F9FD] w-full px-4 py-3 rounded-lg hover:shadow-lg flex flex-col gap-3 overflow-y-auto max-h-[400px]">
                  {guideData?.onboarding?.rejection?.length > 0 ? (
                    guideData.onboarding.rejection.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-1 pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
                      >
                        <p className="text-xs text-gray-500 font-medium">
                          {dayjs(item.date).format('MMM D, YYYY, hh:mm A')}
                        </p>
                        <p className="text-[#13171EB2] font-normal">
                          {item.reason}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#13171EB2] font-normal">--</p>
                  )}
                </div>
              </div>
            )}
          <div className="flex flex-col gap-2">
            <p className="text-xl font-sans font-semibold text-userblack">
              Academic Journey
            </p>

            {!loading &&
              eduData &&
              eduData?.degrees &&
              eduData.degrees?.length > 0 && (
                <div className="flex flex-col gap-2 mb-4">
                  <p className="text-base font-sans font-semibold text-userblack">
                    Education
                  </p>
                  <div
                    className={`flex flex-row items-start ${
                      eduData?.degrees?.length > 2
                        ? "overflow-x-scroll booking-table-wrapper  w-[98%]"
                        : ""
                    } gap-3  pb-1`}
                  >
                    {eduData?.degrees.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="border-[#CE8F9C] border max-w-96 rounded-lg min-w-96"
                      >
                        <div className="flex flex-col items-center justify-center p-2 bg-[#ACADDB] rounded-t-md">
                          {item.file?.type === "pdf" ? (
                            <a
                              href={item?.file?.url}
                              target="_blank"
                              className="text-xl font-semibold  font-sans px-4  hover:cursor-pointer flex items-center min-h-40 "
                            >
                              Pdf
                            </a>
                          ) : (
                            <a
                              href={item?.file?.url || "/image01.png"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="object-contain max-h-40 min-h-40"
                                src={item?.file?.url || "/image01.png"}
                                alt=""
                              />
                            </a>
                          )}
                        </div>
                        <div className="flex flex-row justify-between items-center w-full py-2 px-3">
                          <p title={item.name} className="truncate w-[80%]">
                            {item.name}
                          </p>
                          {/* <div className="flex gap-2">
                        <a
                          className="hover:cursor-pointer"
                          href={item?.file?.url}
                          target="_blank"
                        >
                          <Download />
                        </a>

                        <button
                          onClick={() =>
                            handleDownload(
                              item?.file?.url,
                              item?.name || "Guide-Education",
                              item?.file?.type
                            )
                          }
                        >
                          <Eye />
                        </button>
                      </div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {!loading &&
              eduData &&
              eduData.certifications &&
              eduData.certifications?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-base font-sans font-semibold text-userblack">
                    Certifications
                  </p>
                  <div
                    className={`flex flex-row items-start ${
                      eduData.certifications?.length > 2
                        ? "overflow-x-scroll booking-table-wrapper  w-[98%]"
                        : ""
                    } gap-3  pb-1`}
                  >
                    {eduData?.certifications.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="border-[#CE8F9C] border max-w-96 rounded-lg min-w-96"
                      >
                        <div className="flex flex-col items-center justify-center p-2 bg-[#ACADDB] rounded-t-md">
                          {item.file?.type === "pdf" ? (
                            <a
                              href={item?.file?.url}
                              target="_blank"
                              className="text-xl font-semibold font-sans px-4  hover:cursor-pointer flex items-center min-h-40 "
                            >
                              Pdf
                            </a>
                          ) : (
                            <a
                              href={item?.file?.url}
                              target="_blank"
                              className="text-xl font-semibold font-sans px-4  hover:cursor-pointer flex items-center min-h-40 "
                            >
                              <img
                                className="object-contain  max-h-40  min-h-40"
                                src={item?.file?.url || "/image01.png"}
                                alt=""
                              />
                            </a>
                          )}
                        </div>
                        <div className="flex flex-row justify-between items-center w-full py-2 px-3">
                          <p title={item?.name} className="truncate w-[80%]">
                            {item.name}
                          </p>
                          {/* <div className="flex gap-2">
                        <a
                          className="hover:cursor-pointer"
                          href={item?.file?.url}
                          target="_blank"
                        >
                          <Download />
                        </a>

                        <button
                          onClick={() =>
                            handleDownload(
                              item?.file?.url,
                              item?.name || "Guide-Certification",
                              item?.file?.type
                            )
                          }
                        >
                          <Eye />
                        </button>
                      </div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {!loading && eduData && eduData.degrees?.length === 0 && (
              <p>No Education data added</p>
            )}
            {!loading && eduData && eduData.certifications?.length === 0 && (
              <p>No Certification data added</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xl font-sans font-semibold mb-3 text-[#17161D]">
              Onboarding Questions
            </p>
            {guideData?.onboarding?.questionnaire?.map((ques, idxx) => (
              <div key={ques._id || idxx} className="flex flex-col gap-2">
                <p className="text-[#13171E] font-semibold text-[18px] break-words max-w-[600px] ">
                  {idxx + 1 + ". " + ques?.question ?? "--"}
                </p>
                <p className="border bg-[#F8F9FD] w-2/5 px-4 py-3 rounded-lg text-[#13171EB2] font-normal hover:shadow-lg">
                  {ques?.answer ?? "--"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <Modal>
          <RejectGuideModal
            onClose={() => setShowModal(false)}
            purpose={purpose}
            id={id}
          />
        </Modal>
      )}
    </div>
  );
};

export default Page;
