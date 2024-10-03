"use client";
import {
  getAllCategories,
  getSingleChapter,
  getSingleCourse,
  updateChapterInCourse,
  updateCourse,
} from "@/Utilities/Course";
import AudioVideoUploader from "@/components/AUdioVideoUploader";
import AddContentToCourseModal from "@/components/AddContentToCourseModal";
import Dropdown from "@/components/Dropdown";
import ImageUploader from "@/components/ImageUploader";
import LoaderLarge from "@/components/LoaderLarge";
import LoaderSmall from "@/components/LoaderSmall";
import SingleContentAdded from "@/components/SingleContentAdded";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Add() {
  const queryRef = useRef(false);
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // mutual data
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [type, setType] = useState("");
  const [contentTab, setContentTab] = useState("single");
  const [accessibilityTab, setAccessibilityTab] = useState("premium");
  const [courseType, setCourseType] = useState("");

  // course related data
  const [contentArray, setContentArray] = useState([]);
  const [addModal, setAddModal] = useState(false);

  // file related data
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const dropdownHandler = (val) => {
    setCategory(val._id);
  };
  console.log(category);
  // mutual related data
  const accessibilityTabHandler = (e) => {
    setAccessibilityTab(e.target.value);
  };
  const thumbnailHandler = (val) => {
    setThumbnail(val);
  };
  const dataSetter = async (val) => {
    const response = await getAllCategories();
    if (response?.status) {
      setCategoryData(response.data.results);
    } else {
      toast.error(response?.message, {
        toastId: "djhgf",
      });
    }
  };

  const validator = () => {
    let res = true;
    if (thumbnail == "") {
      res = false;
      toast.info("Add thumbnail", {
        toastId: "djhdjn",
      });
    } else if (title.trim().length < 1) {
      res = false;
      toast.info("Add title", {
        toastId: "dkjhf",
      });
    } else if (category == "") {
      res = false;
      toast.info("Select category", {
        toastId: "dkjhf",
      });
    } else if (accessibilityTab == "") {
      res = false;
      toast.info("Select Accessibility", {
        toastId: "dkjhf",
      });
    } else if (description.trim().length < 1) {
      res = false;
      toast.info("Add description", {
        toastId: "dkjhf",
      });
    } else if (contentTab == "single" && file == "") {
      res = false;
      toast.info("Upload content", {
        toastId: "dkjhf",
      });
    } else if (contentTab == "course" && contentArray.length == 0) {
      res = false;
      toast.info("Select content", {
        toastId: "dkjhf",
      });
    }
    return res;
  };

  // course related data
  const addModalHandler = () => {
    setAddModal(!addModal);
  };
  const selectHandler = (arr) => {
    setContentArray(arr);
    addModalHandler();
  };

  // files related data
  const audioHandler = (val, duration) => {
    setFile(val);
    setDuration(duration);
  };
  const submitHanlder = async (e) => {
    e.preventDefault();
    const result = validator();
    if (result) {
      if (contentTab == "single") {
        if (file != data.chapter.media.url) {
          updateContent();
        }
        const formdata = new FormData();
        if (thumbnail != data?.thumbnail?.url) {
          formdata.append("thumbnail", thumbnail);
        }
        formdata.append("category", category);
        formdata.append("description", description);
        formdata.append("title", title);
        formdata.append("accessibility", accessibilityTab);
        setLoading(true);
        const response = await updateCourse(formdata, params.id);
        if (response?.status) {
          router.push("/content-management");
        } else {
          setLoading(false);
          toast.error(response?.message, {
            toastId: "jdhg",
          });
        }
      }
    }
  };
  console.log(data,file)
  const updateContent = async () => {
    const formdata = new FormData();
    const temp = file.split("?")
    if (temp[0] != data.chapter.media.url) {
      formdata.append("media", file);
    }
    formdata.append("durationInMinutes", duration);
   

    const response = await updateChapterInCourse(data.chapter._id, formdata);
    if (response?.status) {
    } else {
      setLoading(false);
      toast.error(response?.message, {
        toastId: "jdhg",
      });
    }
  };
  const fetchDetails = async () => {
    const response = await getSingleCourse(params.id);
    if (response?.status) {
      setThumbnail(response.data.thumbnail.url);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setAccessibilityTab(response.data.accessibility);
      setCategory(response.data.category._id);
      setCategoryName(response.data.category.title);
      setData(response.data);
      setDuration(response.data.chapter.durationInMinutes);
      setCourseType(response.data.courseType);
      singleChapterHandler(response.data.chapter._id);
    } else {
    }
  };
  const singleChapterHandler = async (id) => {
    const response = await getSingleChapter(id);
    if (response?.status) {
      setFile(response.data.media.url);
    }
  };
  useEffect(() => {
    if (!queryRef.current) {
      fetchDetails();
      dataSetter();
    }
    queryRef.current = true;
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex items-center gap-3">
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
          Edit Single Content
        </h2>
      </div>
      {data && (
        <div className="w-1/2 success">
          {/* <h6 className='text-[#252322] font-semibold mt-10 text-sm'>Content</h6> */}
          {/* <div  className='grid grid-cols-2 p-1 bg-[#DADDF1] rounded-[80px] mt-12'>
                <h6 onClick={e=>setContentTab("course")} className={`text-sm p-2 text-center rounded-[80px] cursor-pointer ${contentTab == "course" ? "font-semibold text-[#00] bg-white":"font-normal text-[#818181] bg-transparent "} `}>Course</h6>
                <h6  onClick={e=>setContentTab("single")} className={`text-sm p-2 text-center rounded-[80px] cursor-pointer ${contentTab == "single" ? "font-semibold text-[#00] bg-white":"font-normal text-[#818181] bg-transparent "} `}>Single</h6>
            </div> */}
          <h6 className="text-[#252322] font-semibold mt-5 text-sm mb-1">
            Thumbnail
          </h6>
          <ImageUploader
            callback={thumbnailHandler}
            fileAdded={thumbnail}
            uploaded={true}
          />
          <h6 className="text-[#252322] font-semibold mt-5 text-sm mb-1">
            Title
          </h6>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4"
          />

          {categoryName != "" && (
            <div className="grid grid-cols-2 gap-5 mt-5">
              <div>
                <h6 className="text-[#252322] font-semibold text-sm mb-1">
                  Category
                </h6>
                <Dropdown
                  placeholder={categoryName}
                  data={categoryData}
                  callback={dropdownHandler}
                />
              </div>
              <div>
                <h6 className="text-[#252322] font-semibold text-sm mb-1">
                  Type
                </h6>
                <input
                  type="text"
                  value={courseType}
                  onChange={(e) => setCourseType(e.target.value)}
                  placeholder="Ex. Blog"
                  className="bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4"
                />
              </div>
            </div>
          )}
          <h6 className="text-[#252322] font-semibold mt-5 text-sm">
            Accessibility
          </h6>
          <div className="grid grid-cols-2 gap-5 mt-1">
            <label
              htmlFor="free"
              className={`bg-white cursor-pointer flex items-center justify-between border-solid border-2  rounded-xl px-4 py-3 ${
                accessibilityTab != "free"
                  ? "border-[#E7E5E4]"
                  : "border-[#08A03C]"
              }`}
            >
              <h6 className="font-semibold text-sm">Free</h6>
              {accessibilityTab == "free" ? (
                <input
                  type="radio"
                  id="free"
                  name="Accessibility"
                  checked
                  value="free"
                  onChange={accessibilityTabHandler}
                />
              ) : (
                <input
                  type="radio"
                  id="free"
                  name="Accessibility"
                  value="free"
                  onChange={accessibilityTabHandler}
                />
              )}
            </label>
            <label
              htmlFor="premium"
              className={`bg-white cursor-pointer flex items-center justify-between border-2 border-solid  rounded-xl px-4 py-3 ${
                accessibilityTab != "premium"
                  ? "border-[#E7E5E4]"
                  : "border-[#08A03C]"
              }`}
            >
              <h6 className="font-semibold text-sm">Premium</h6>
              {accessibilityTab == "premium" ? (
                <input
                  type="radio"
                  id="premium"
                  name="Accessibility"
                  checked
                  value="premium"
                  onChange={accessibilityTabHandler}
                />
              ) : (
                <input
                  type="radio"
                  id="premium"
                  name="Accessibility"
                  value="premium"
                  onChange={accessibilityTabHandler}
                />
              )}
            </label>
          </div>
          <h6 className="text-[#252322] font-semibold mt-5 text-sm mb-1">
            Description
          </h6>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter title"
            className="bg-white border border-solid border-[#E7E5E4] w-full rounded-xl py-3 px-4 resize-none"
          />

          {contentTab == "single" && (
            <h6 className="text-[#252322] font-semibold mt-5 text-sm mb-1">
              Upload content
            </h6>
          )}
          {/* {data.chapter.type == 'audio' && <ReactAudioPlayer
                src={data.chapter.media.url}
                style={{
                    width:"100%"
                }}
                className='w-full'
                controls
                id="audio"
            />}
            {data.chapter.type == 'video' && <video id="video" width="100%" className='rounded-xl' controls height="200">
                <source src={file}  />
            </video>} */}
          {file != null && (
            <AudioVideoUploader
              callback={audioHandler}
              uploaded={true}
              type={data.chapter.type}
              fileAdded={file}
            />
          )}
          <button
            onClick={submitHanlder}
            className="p-4 text-white font-black mt-5 bg-[#AE445A] rounded-xl w-3/12 flex justify-center"
          >
            {!loading ? "Save" : <LoaderSmall color="#fff" size="20" />}
          </button>
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
