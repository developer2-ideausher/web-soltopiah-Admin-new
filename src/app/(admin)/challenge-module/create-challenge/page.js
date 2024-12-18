"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import UploadImage from "../../../../../icons/UploadImage";
import { useRouter } from "next/navigation";
import RedDustbin from "../../../../../icons/RedDustbin";
import BlueAdd from "../../../../../icons/BlueAdd";
import Modal from "@/components/Modal";
import AddContentModal from "@/components/AddContentModal";

import RedRecycle from "../../../../../icons/RedRecycle";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import LoaderSmall from "@/components/LoaderSmall";
import {
  apiError,
  responseValidator,
  tokenValidator,
  truncateName,
} from "@/Utilities/helper";
import ReactPlayer from "react-player";

function Page() {
  const router = useRouter();
  const [dropDownCategory, setDropDownCategory] = useState([]);
  const [newFile, setNewFile] = useState(null);
  const [imageSrc1, setImageSrc1] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [access, setAccess] = useState("");
  const [days, setDays] = useState("");
  const [description, setDescription] = useState("");
  const [isFormValid1, setIsFormValid1] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);
  const [dataIds, setDataIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormValid2, setIsFormValid2] = useState(false);

  const handleModal = (day) => {
    setCurrentDay(day);
    setShowModal(!showModal);
  };
  useEffect(() => {
    getCategoryApi();
  }, []);
  const handleSaveContent = (content) => {
    const updatedContent = [...selectedContent];
    updatedContent[currentDay - 1] = content;
    setSelectedContent(updatedContent);
    setShowModal(false);

    const updatedDataIds = [...dataIds];
    updatedDataIds[currentDay - 1] = content._id;
    setDataIds(updatedDataIds);
  };

  const handleRemoveContent = (day) => {
    const updatedContent = [...selectedContent];
    updatedContent[day - 1] = null;
    setSelectedContent(updatedContent);

    const updatedDataIds = [...dataIds];
    updatedDataIds[day - 1] = null;
    setDataIds(updatedDataIds);
  };

  console.log(dataIds);

  const handleSubmit = (e) => {
    e.preventDefault();
    createChallengeApi();
    // Reset selectedContent and dataIds based on days after submission
    setSelectedContent(Array(days).fill(null));
    setDataIds(Array(days).fill(null));
  };

  useEffect(() => {
    if (startDate && endDate) {
      const calculatedDays = dayjs(endDate).diff(dayjs(startDate), "day");
      setDays(calculatedDays);
    } else {
      setDays("");
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (
      title &&
      category &&
      startDate &&
      endDate &&
      access &&
      days &&
      description &&
      imageSrc1
    ) {
      setIsFormValid1(true);
    } else {
      setIsFormValid1(false);
    }
  }, [
    title,
    category,
    startDate,
    endDate,
    access,
    days,
    description,
    imageSrc1,
  ]);
  const getCategoryApi = async () => {
    const token = getToken();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + (await tokenValidator()));
    const requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.results);
        setDropDownCategory(result.data.results);
      })
      .catch((error) => console.error(error));
  };

  const createChallengeApi = async () => {
    setLoading(true);

    try {
      // Prepare headers
      const myHeaders = new Headers();
      const token = await tokenValidator();
      myHeaders.append("Authorization", `Bearer ${token}`);

      // Prepare form data
      const formData = new FormData();
      formData.append("thumbnail", newFile);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("accessibility", access);
      formData.append("description", description);
      formData.append("durationInDays", days);
      formData.append("type", "public");
      formData.append("startDate", startDate);
      formData.append("chapters", JSON.stringify(dataIds));

      // Define request options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      };

      // Make the API call
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/challenges`,
        requestOptions
      );

      // Validate the response
      const validatedResponse = await responseValidator(
        response,
        true,
        "Challenge Created Successfully"
      );

      if (validatedResponse.status) {
        // If the response is successful
        console.log(validatedResponse.data);
        // toast.success("Challenge Created Successfully");
        router.push("/challenge-module");
      } else {
        // Handle specific error codes if needed
        if (validatedResponse.code === 401) {
          // For example, redirect to login if session expired
          router.push("/login");
        }
        // Additional error handling can be done here based on `validatedResponse.code` or `validatedResponse.message`
      }
    } catch (error) {
      // Handle network or unexpected errors
      const errorResponse = apiError(error);
      console.error(errorResponse.message);
      // Optionally, you can perform additional actions based on the error
    } finally {
      setLoading(false);
    }
  };

  console.log(selectedContent);
  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (isFormValid1) {
      const formData = {
        title,
        category,
        startDate,
        endDate,
        access,
        days,
        description,
        imageSrc1,
      };
      setSelectedContent(Array(days).fill(null));
      setDataIds(Array(days).fill(null));
      setShowPage(true);
    }
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    setNewFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

  const minEndDate = startDate
    ? dayjs(startDate).add(1, "day").format("YYYY-MM-DD")
    : tomorrow;
  const maxEndDate = startDate
    ? dayjs(startDate).add(10, "day").format("YYYY-MM-DD")
    : "";

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setEndDate("");
  };
  useEffect(() => {
    // Check if all days have content
    const allContentAdded =
      selectedContent.length === days &&
      selectedContent.every((content) => content !== null);
    setIsFormValid2(allContentAdded);
  }, [selectedContent, days]);

  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex flex-row gap-5 items-center">
        {!showPage ? (
          <Link href="/challenge-module">
            <BackButton />
          </Link>
        ) : (
          <div onClick={() => setShowPage(false)}>
            <BackButton />
          </div>
        )}
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Create challenge
        </p>
      </div>
      {!showPage ? (
        <form onSubmit={handleSubmit1} className="flex flex-col gap-5 w-1/3">
          <p className="text-userblack text-3xl font-semibold font-sans">
            1. Create Challenge
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-sans font-semibold text-userblack">
              Challenge cover
            </p>
            <div className="border border-[#D3D6EE] bg-[#E5E7F5] rounded-lg p-2 flex justify-center items-center flex-col gap-3 relative w-[400px] h-[300px] object-cover ">
              {imageSrc1 ? (
                <>
                  {" "}
                  <img
                    src={imageSrc1}
                    alt="Challenge cover"
                    className="rounded-lg max-h-60"
                  />
                  <div className="bg-white w-full rounded-lg z-50">
                    <div
                      type="button"
                      onClick={() => setImageSrc1(null)}
                      className=" py-2 bg-[#EE3E3E1A]  rounded-lg  w-full text-black text-sm font-sans font-semibold flex flex-row items-center justify-center gap-2 cursor-pointer"
                    >
                      <RedDustbin />
                      Remove
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <UploadImage />
                  <p className="text-sm font-sans font-normal text-[#9C9896]">
                    Drag and drop image (PNG, JPG, or JPEG) or
                  </p>
                  <p className="text-sm font-sans font-semibold text-[#4655B9]">
                    Choose file
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="absolute inset-0 opacity-0 cursor-pointer "
                onChange={handleImageChange1}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-sans font-semibold text-userblack">
              Title
            </p>
            <input
              type="text"
              className="bg-white py-3 px-4 rounded-xl border font-sans border-[#E7E5E4]"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-sans font-semibold text-userblack">
              Category
            </p>
            <select
              className="bg-white py-3 px-4 rounded-xl focus:outline-none border border-[#E7E5E4]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled value="">
                Select Category
              </option>
              {dropDownCategory.map((item) => (
                <option key={item._id} value={item._id}>
                  {truncateName(item.title)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-sans font-semibold text-userblack">
              Start date
            </p>
            <input
              type="date"
              className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
              placeholder="Enter Start date"
              value={startDate}
              onChange={handleStartDateChange}
              min={tomorrow} // Start date should be tomorrow or later
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-sans font-semibold text-userblack">
              End date
            </p>
            <input
              type="date"
              className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
              placeholder="Enter End date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={minEndDate} // End date should be at least one day after start date
              max={maxEndDate} // End date can be up to 10 days from start date
              disabled={!startDate} // Disable until start date is selected
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-sans font-semibold text-userblack">
              Access
            </p>
            <div className="flex flex-row justify-between items-center gap-3">
              <button
                type="button"
                className={`py-3 px-4 border w-full rounded-xl text-sm font-sans font-semibold ${
                  access === "free"
                    ? "bg-white border-2 border-green-500 "
                    : "bg-white border-[#E7E5E4] text-userblack"
                }`}
                onClick={() => setAccess("free")}
              >
                Free
              </button>
              <button
                type="button"
                className={`py-3 px-4 border w-full rounded-xl text-sm font-sans font-semibold ${
                  access === "premium"
                    ? "bg-white border-2 border-green-500 "
                    : "bg-white border-[#E7E5E4] text-userblack"
                }`}
                onClick={() => setAccess("premium")}
              >
                Premium
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-sans font-semibold text-userblack">
              No. of Days
            </p>
            <input
              className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
              placeholder="Enter No. of Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-sans font-semibold text-userblack">
              Description
            </p>
            <textarea
              type="text"
              className="bg-white py-3 px-4 rounded-xl border border-[#E7E5E4]"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`p-4 rounded-lg w-2/5 mt-8 text-base font-sans font-black text-white ${
              isFormValid1
                ? "bg-[#AE445A] cursor-pointer"
                : "bg-[#AE445A] opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid1}
          >
            Next
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:w-2/5 xl:w-2/5 2xl:w-1/3">
          <p className="text-userblack text-3xl font-semibold font-sans">
            2. Add Content
          </p>
          {Array.from({ length: days }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-sm font-sans font-semibold text-userblack">
                Day {i + 1}
              </p>
              <div className="bg-white p-4 rounded-xl flex flex-col justify-center items-center gap-5 relative">
                {selectedContent[i] ? (
                  <>
                    {/* Conditional Rendering of Media Player */}
                    {selectedContent[i].type === "video" ? (
                      <ReactPlayer
                        url={selectedContent[i].media.url}
                        controls
                        width="100%"
                        height="auto"
                        className="rounded-lg"
                      />
                    ) : selectedContent[i].type === "audio" ? (
                      <ReactPlayer
                        url={selectedContent[i].media.url}
                        controls
                        height="50px"
                        width="100%"
                        className="rounded-lg"
                      />
                    ) : (
                      <p className="text-red-500">Unsupported media type.</p>
                    )}

                    <button
                      onClick={() => handleRemoveContent(i + 1)}
                      className="flex flex-row justify-center items-center text-[#000000] gap-2 bg-[#EE3E3E1A] py-2 px-3 w-full rounded-full"
                    >
                      <RedRecycle />
                      <p className="text-sm font-sans font-semibold">
                        Remove content
                      </p>
                    </button>
                  </>
                ) : (
                  <div
                    onClick={() => handleModal(i + 1)}
                    className="flex flex-col gap-2 items-center text-center cursor-pointer"
                  >
                    <p className="text-2xl font-sans font-semibold text-userblack">
                      No content
                    </p>
                    <p className="text-[#25232270] text-sm font-sans font-normal">
                      Please add audio or video content to your challenge
                    </p>
                    <p className="flex flex-row items-center gap-2 bg-[#3090E933] py-2 px-3 rounded-full">
                      <BlueAdd />
                      <p className="text-[#3090E9] text-sm font-sans font-semibold">
                        Add content
                      </p>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className={`p-4 md:w-3/5 lg:w-3/5 2xl:w-2/5 mt-5 rounded-lg font-sans text-base font-black flex justify-center items-center ${
              isFormValid2
                ? "bg-[#AE445A] text-white cursor-pointer"
                : "bg-[#AE445A] text-white opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid2 || loading}
          >
            {!loading ? "Save & Finish" : <LoaderSmall />}
          </button>
        </form>
      )}
      {showModal && (
        <Modal>
          <AddContentModal
            onclose={() => setShowModal(false)}
            onSave={handleSaveContent}
          />
        </Modal>
      )}
    </div>
  );
}

export default Page;
