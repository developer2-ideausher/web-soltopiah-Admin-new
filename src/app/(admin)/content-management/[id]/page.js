"use client";
import { getImageCacheRemover } from "@/Services/Api/Badges/BadgesApi";
import { deleteSingleCourse, getSingleCourse } from "@/Utilities/Course";
import DeleteModal from "@/components/DeleteModal";
import LoaderLarge from "@/components/LoaderLarge";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function ViewPage() {
  const queryRef = useRef(false);
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dataSetter = async () => {
    const response = await getSingleCourse(params.id);
    if (response?.status) {
      setData(response.data);
    } else {
    }
  };
  const deleteModalHandler = () => {
    setDeleteModal(!deleteModal);
  };
  const deleteHandler = async () => {
    setLoading(true);
    const response = await deleteSingleCourse(params.id);
    if (response?.status) {
      router.push("/content-management");
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!queryRef.current) {
      dataSetter();
    }
    queryRef.current = true;
  }, []);
  return (
    <div className="w-full">
      {deleteModal && (
        <DeleteModal
          loading={loading}
          onClose={deleteModalHandler}
          onDelete={deleteHandler}
        />
      )}
      <div className="w-full flex flex-wrap items-center justify-between pb-5 border-b border-solid border-[#CDCDCD]">
        <div className=" flex items-center gap-3">
          <Link href="/content-management" className="btn-back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.21894 7.33327H13.3333V8.6666H5.21894L8.79492 12.2425L7.85212 13.1853L2.66666 7.99993L7.85212 2.81445L8.79492 3.75726L5.21894 7.33327Z"
                fill="#252322"
              />
            </svg>
            <h6 className="text-[#252322] font-semibold text-sm">Back</h6>
          </Link>
          <h2 className="text-xl2 font-semibold text-[#17161D]">
            View Content
          </h2>
        </div>
        <div className=" flex items-center gap-3 xs:mt-5">
          <Link
            href={`/content-management/edit/${data?._id}`}
            className="rounded-full bg-[#3090E9] text-base font-normal text-white px-4 py-1"
          >
            Edit Content
          </Link>
          <button
            onClick={deleteModalHandler}
            className="rounded-full bg-[#ff0000] text-base font-normal text-white px-4 py-1"
          >
            Delete
          </button>
        </div>
      </div>
      {data && (
        <div className="w-full">
          <h6 className="text-sm font-semibold text-[#121616] mt-5 mb-1">
            Cover Image
          </h6>
          <img
            src={getImageCacheRemover(data?.thumbnail?.url, "/cm.svg")}
            className="w-2/12 rounded-xl xs:w-full"
          />

          <h6 className="text-sm font-semibold text-[#121616] mt-5">Title</h6>
          <h5 className="text-[#414554] font-normal text-lg">{data.title}</h5>

          <h6 className="text-sm font-semibold text-[#121616] mt-5">
            Description
          </h6>
          <h5 className="text-[#414554] font-normal text-lg">
            {data?.description}
          </h5>

          <h6 className="text-sm font-semibold text-[#121616] mt-5">Type</h6>
          <h5 className="text-[#414554] font-normal text-lg">
            {data?.courseType}
          </h5>

          <h6 className="text-sm font-semibold text-[#121616] mt-5">
            Category
          </h6>
          <h5 className="text-[#414554] font-normal text-lg">
            {data?.category?.title}
          </h5>
          <h6 className="text-sm font-semibold text-[#121616] mt-5">
            Goals
          </h6>
          {data.goals.length===0?"No goals Added":""}
          {data?.goals && data.goals.map((item,index)=>(<h5 key={item._id||index} className="text-[#414554] font-normal text-lg">
            {(index+1)+". "+item?.title}
          </h5>))}

          <h6 className="text-sm font-semibold text-[#121616] mt-5">
            Content Added
          </h6>
          <div className="w-ful grid grid-cols-3 gap-8 mt-5 mb-5">
            {data?.chapters?.map((item, index) => (
              <div key={index} className="w-full">
                <h5 className="text-[#414554] font-semibold text-lg">
                  {item.title}
                </h5>
                {item.media?.url != "" && (
                  <div className="w-full mt-1">
                    {data?.courseContentType != "video" && (
                      <ReactAudioPlayer
                        src={item.media?.url}
                        style={{ width: "100%" }}
                        className="w-full"
                        controls
                        id="single"
                      />
                    )}
                    {data?.courseContentType == "video" && (
                      <video
                        id="video"
                        width="100%"
                        className="rounded-xl xs:w-full"
                        controls
                        height="200"
                      >
                        <source src={item.media?.url} />
                      </video>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {!data && (
        <div className="w-full py-10 flex justify-center">
          <LoaderLarge />
        </div>
      )}
    </div>
  );
}
