"use client";
import React, { useEffect, useRef, useState } from "react";
import SingleContentSelector from "./SingleContentSelector";
import { getAllUnitaryCourses } from "@/Utilities/Course";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AddContentToCourseModal(props) {
  const queryRef = useRef(false);
  const [chaptersData, setChaptersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const getChapters = async () => {
    setLoading(true);
    const response = await getAllUnitaryCourses();
    if (response?.status) {
      setChaptersData(response.data.results);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response?.message, {
        toastId: "djhgf",
      });
    }
  };
  const selectHandler = (val) => {
    if (selected.length == 0) {
      setSelected([val]);
    } else {
      const filter = selected.filter((item) => item._id != val._id);
      if (filter.length == selected.length) {
        setSelected([...selected, val]);
      } else {
        setSelected(filter);
      }
    }
  };
  const saveHandler = () => {
    props.select(selected);
  };
  const resetHandler = () => {
    const temp = chaptersData;
    setChaptersData([]);
    setSelected([]);
    setTimeout(() => {
      setChaptersData(temp);
    }, [100]);
  };
  useEffect(() => {
    if (!queryRef.current) {
      getChapters();
      setSelected(props.data);
    }
    queryRef.current = true;
  }, []);
  return (
    <div className="modal-container">
      <div className="bg-white w-[682px] rounded-lg max-h-[80vh] overflow-y-auto">
        <div className="w-full border-b border-[#E1E4F4] px-4 py-3 flex items-center justify-between">
          <h4 className="text-base font-semibold text-[#252322]">
            Add content to course
          </h4>
          <div className="flex gap-4 items-center">
            <div className="py-1 px-2 border border-[#D6DAF0] bg-[#E9EBF7] rounded-full w-72 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                  stroke="#BCC2E7"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 13.9996L11.1 11.0996"
                  stroke="#BCC2E7"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for audio and video content"
                className="text-sm bg-transparent w-11/12"
              />
            </div>
            <div className="cursor-pointer" onClick={props.handler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="px-5 pb-6 flex flex-wrap justify-center">
          {!loading && chaptersData?.length == 0 && (
            <h5 className="text-black font-medium text-sm p-5">
              No content founded!
            </h5>
          )}
          {!loading &&
            chaptersData?.map((item, index) => (
              <SingleContentSelector
                handler={selectHandler}
                key={index}
                data={item}
                selected={props.data}
              />
            ))}
          {selected.length > 0 && (
            <div className="mt-5 w-full grid grid-cols-2 gap-3">
              <button
                className="p-4 text-black font-black mt-5 bg-[#DBDBDB] rounded-md "
                onClick={resetHandler}
              >
                Reset
              </button>
              <button
                className="p-4 text-white font-black mt-5 bg-[#AE445A] rounded-md "
                onClick={saveHandler}
              >
                Save
              </button>
            </div>
          )}
          {loading && <RingLoader color="#AE445A" />}
        </div>
      </div>
    </div>
  );
}
